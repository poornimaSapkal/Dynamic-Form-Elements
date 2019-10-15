let http = new XMLHttpRequest();
let info;

function fetchData(){   
    http.open("GET", "data2.json", true);
    http.setRequestHeader('Accept', 'application/json');
    http.onreadystatechange = handleHttpResponse;
    http.send(null);
}

function handleHttpResponse(){
    if (http.readyState === 4 && http.status === 200) {
        info = JSON.parse(http.response);
    }
}

function processChoice(id){   
    deleteDivs(info[id].choice_number);
    let which_choice = id // first_choice, second_choice, third_choice
    let select = document.getElementById(id);
    let selectedOption = select.value;
    localStorage.setItem("choice", selectedOption);
    //console.log("id:", id)
    if(id == "result"){
        showAnswers();
    } else {
        createSelect(which_choice);
    }
    
}

function createSelect(id){
    let which_choice = id; // first_choice, second_choice, third_choice
    
    let optionDiv = document.getElementById("options_div"); //the child will be appended to this div
    // set the div id to the choice number 
    let divEle = document.createElement("div");
    divEle.setAttribute("id", info[id].choice_number);

    let selectEle = document.createElement("select");
    selectEle.setAttribute("name", info[id].next_div);
    selectEle.setAttribute("id", info[id].next_div);

    let choice = localStorage.getItem("choice");
    let options = info[id]["options"][choice];

    options.forEach(function(value){
        let optionEle = document.createElement("option")
        let optionTextNode = document.createTextNode(value);
        optionEle.setAttribute("value", value);
        optionEle.append(optionTextNode);
        selectEle.appendChild(optionEle);
    });

    let optionEle = document.createElement("option")
    let optionTextNode = document.createTextNode("Make a choice");
    optionEle.setAttribute("selected", "selected");
    optionEle.setAttribute("disabled", "disabled");
    optionEle.append(optionTextNode);
    selectEle.appendChild(optionEle);
    selectEle.addEventListener("change", function(){
        processChoice(info[id].next_div);
    
    })
    divEle.append(selectEle);
    optionDiv.appendChild(divEle);

}

function showAnswers(){
    let choice = localStorage.getItem("choice");
    let answer = info["result"]["answers"][choice];
    console.log(answer); 
}

function deleteDivs(current_id){
    //if id is greater than id that is passed delete it 
    let allDivs = document.querySelectorAll("div");
    allDivs.forEach(function(div){
        let id = div.getAttribute("id")
        console.log("current_id", current_id,"id of div:", parseInt(id));
        if(parseInt(id) >= current_id){
            console.log("Removing this div with id:", id)
            div.remove();
        }
    })
}

