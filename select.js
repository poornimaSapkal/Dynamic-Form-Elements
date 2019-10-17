let http = new XMLHttpRequest();
let userChoices = [];
let info;

function fetchData(){   
    http.open("GET", "data2.json", true);
    http.setRequestHeader('Accept', 'application/json');
    http.onreadystatechange = handleHttpResponse;
    http.send(null);
    createFirstDiv();
}

function handleHttpResponse(){
    if (http.readyState === 4 && http.status === 200) {
        info = JSON.parse(http.response);
    }
}

function createFirstDiv(){
    setTimeout(function(){
        processChoice("initial_choice")
    },100);
    
}

function processChoice(id){   
    deleteDivs(info[id].choice_number);
    let which_choice = id // first_choice, second_choice, third_choice
    let select = document.getElementById(id);
    let selectedOption;
    if(select){
        selectedOption = select.value;
        localStorage.setItem("choice", selectedOption);
    } else {
        localStorage.setItem("choice", "nothing");
    }

    if(id == "result"){
        showAnswers();
    } else if (id == "initial_choice"){
        createSelect(which_choice, info[id]["options"]);
    } else {
        createSelect(which_choice, info[id]["options"][selectedOption])
    }
    
}

function createSelect(id, options){
    formHide();
    let which_choice = id; // first_choice, second_choice, third_choice
    
    let optionDiv = document.getElementById("options_div"); //the child will be appended to this div
    // set the div id to the choice number 
    let divEle = document.createElement("div");
    divEle.setAttribute("id", info[id].choice_number);

    let selectEle = document.createElement("select");
    selectEle.setAttribute("name", info[id].next_div);
    selectEle.setAttribute("id", info[id].next_div);
    selectEle.setAttribute("class", "changeColor");

    let choice = localStorage.getItem("choice");
    userChoices[info[id].choice_number]=(choice);

    let question = "Do you prefer ";
    options.forEach(function(value){
        let optionEle = document.createElement("option")
        let optionTextNode = document.createTextNode(value);
        optionEle.setAttribute("value", value);
        optionEle.append(optionTextNode);
        selectEle.appendChild(optionEle);
        question = question + value + " or ";

    });
    // create a label and append the text node

    let label = document.createElement("label");
    label.setAttribute("for", info[id].next_div);
    
    let questionNode = document.createTextNode((question.slice(0, question.length-4) + "?"));
    label.append(questionNode);


    let optionEle = document.createElement("option")
    let optionTextNode = document.createTextNode("Make a choice");
    optionEle.setAttribute("selected", "selected");
    optionEle.setAttribute("disabled", "disabled");
    optionEle.append(optionTextNode);
    selectEle.appendChild(optionEle);
    selectEle.addEventListener("change", function(){
        processChoice(info[id].next_div, );  
    })
    divEle.append(label);

    let dotsHeader = document.createElement("h2");
    let dots = document.createTextNode("...");
    dotsHeader.append(dots);

    //add br 
    let breakEle = document.createElement("br");
    divEle.append(breakEle);
    
    divEle.append(selectEle);
    divEle.append(dotsHeader);
    optionDiv.appendChild(divEle);

}

function showAnswers(){
    createAllOptionsNode()
    let choice = localStorage.getItem("choice");
    let answer = info["result"]["answers"][choice][0];
    let mainDiv = document.getElementById(info["result"].choice_number);
    let linkEle = document.createElement("a");
    let text = document.createTextNode(`Perfect! You're going to love ${answer}!`);
    linkEle.append(text);
    linkEle.setAttribute("href",info["result"]["answers"][choice][1])
    //linkEle.title = `Perfect! You're going to love ${answer}!`;
    //linkEle.href = info["result"]["answers"][choice][1];
    mainDiv.append(linkEle);
    console.log(answer); 
}

function createAllOptionsNode(){
    console.log("From function create all options node")
    let mainDiv = document.getElementById("options_div");
    let choice = localStorage.getItem("choice");
    let hEle = document.createElement("h3");
    let text = document.createTextNode(`Your choices are: `);
    hEle.append(text);
    
    let divEle = document.createElement("div");
    divEle.setAttribute("id", info["result"].choice_number);
    divEle.append(hEle)
    for (i=2; i<userChoices.length; i++){
        let hEle = document.createElement("h3");
        let text = document.createTextNode(userChoices[i]);
        hEle.append(text);
        divEle.append(hEle)
        console.log("The user has chosen:", userChoices[i])
    }
    let lastChoice = document.createElement("h3");
    let textChoice = document.createTextNode(choice);
    lastChoice.append(textChoice);
    divEle.append(lastChoice)
    mainDiv.append(divEle)
    formShow();
}

function deleteDivs(current_id){
    //if id is greater than id that is passed delete it 
    let allDivs = document.querySelectorAll("div");
    allDivs.forEach(function(div){
        let id = div.getAttribute("id")
        if(parseInt(id) >= current_id){
            div.remove();
        }
    })
}

function formHide(){
    let form = document.getElementById("newsletter");
    form.style.display = "none"; 
}

function formShow(){
    let form = document.getElementById("newsletter");
    form.style.display = "block";
}