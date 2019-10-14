let http = new XMLHttpRequest();
let number_of_choices_made = 0;
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
    deleteDivs();
    number_of_choices_made = number_of_choices_made + 1;
    let which_choice = id // first_choice, second_choice, third_choice
    let select = document.getElementById(id);
    let selectedOption = select.value;
    localStorage.setItem("choice", selectedOption);
    
    console.log("number_of_choices_made:", number_of_choices_made, "Object.keys:", Object.keys(info).length);
    if(number_of_choices_made == Object.keys(info).length){
        console.log("equal")
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
    let answer = info["result"][choice];
    console.log(answer); 
}

function deleteDivs(){
    // if 1, delete 1:
    // if 2 delete 2:
    console.log("in delete function");
    console.log("current_choice:", current_choice_number);
        for(i=(current_choice_number+1); i<=Object.keys(info).length; i++){
            try{
                let divEle = document.getElementById(i);
                console.log("divEle:", divEle, "i:", i);
                divEle.remove();
            } catch(e){
                console.log("Divs don't exist");
            }
    }
}


