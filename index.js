let http = new XMLHttpRequest();
let userChoices = [];
let info;

/**
 * This is a function which fetches the json data and calls the http response handler
 */
function fetchData() {
    let url = "http://serenity.ist.rit.edu/~ps5067/dynamicform/"
    let dataset = localStorage.getItem("dataset");
    if (dataset) {
        http.open("GET", dataset, true);
    } else {
        http.open("GET", url + "data1.json", true);
        localStorage.getItem("dataset", url + "data1.json");
    }

    http.setRequestHeader('Accept', 'application/json');
    http.onreadystatechange = handleHttpResponse;
    http.send(null);
    createFirstDiv();
}
/**
 * This function handles the http response and stores the json data in the variable info
 */

function handleHttpResponse() {
    if (http.readyState === 4 && http.status === 200) {
        info = JSON.parse(http.response);
    }
}

/**
 * This function lets us toggle between the two datasets. It looks into the local storage to see what the 
 * value of the dataset is. It toggles that value and sets the dataset value accrordingly in the local storage.
 */

function toggle() {
    if (localStorage.getItem("dataset") == "data1.json") {
        localStorage.setItem("dataset", "data2.json");
    } else {
        localStorage.setItem("dataset", "data1.json");
    }
    fetchData();
}

/**
 * This is a function which calls the process choice function and it takes the choice number as 
 * a parameter. In my dataset, the choices are named as follows: initial choice, first_choice, second_choice
 */

function createFirstDiv() {
    setTimeout(function () {
        processChoice("initial_choice")
    }, 200);

}

/**
 * This is a function which processes the choice that the user makes based on the parameter that is passed. 
 * The local storage keeps track of the most recent choice that the user makes. For initial choice, the choice 
 * is stored as "nothing" as the user has not made any choice yet. From there on it takes the values from the 
 * select field and updates the choice in the local storage. 
 * 
 */

function processChoice(id) {
    //ids can be initial_choice, first_choice, second_choice or result 
    deleteDivs(info[id].choice_number);
    let which_choice = id // first_choice, second_choice, third_choice
    let select = document.getElementById(id);
    let selectedOption;
    if (select) {
        selectedOption = select.value;
        localStorage.setItem("choice", selectedOption);
    } else {
        localStorage.setItem("choice", "nothing");
    }

    // If the id is result then we call the showAnswers function 

    if (id == "result") {
        showAnswers();
    // If its the first choice that the user will be making 
    } else if (id == "initial_choice") {
        createSelect(which_choice, info[id]["options"]);
    // If its the 2nd or 3rd choice that the user is making 
    } else {
        createSelect(which_choice, info[id]["options"][selectedOption])
    }

}

/**
 * This function is used to create the select div. It takes the id and options as arguments. 
 * The options hold values that the select needs to be populated with. 
 */

function createSelect(id, options) {
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
    // gets the choice from the local storage 
    let choice = localStorage.getItem("choice");
    userChoices[info[id].choice_number] = (choice);

    let question = "Do you prefer ";

    for(i=0; i<options.length; i++){
        let optionEle = document.createElement("option")
        let optionTextNode = document.createTextNode(options[i]);
        optionEle.setAttribute("value", options[i]);
        optionEle.appendChild(optionTextNode);
        selectEle.appendChild(optionEle);
        question = question + options[i] + " or ";
    }


    let label = document.createElement("label");
    label.setAttribute("for", info[id].next_div);

    let questionNode = document.createTextNode((question.slice(0, question.length - 4) + "?"));
    label.appendChild(questionNode);


    let optionEle = document.createElement("option")
    let optionTextNode = document.createTextNode("Make a choice");
    optionEle.setAttribute("selected", "selected");
    optionEle.setAttribute("disabled", "disabled");
    optionEle.appendChild(optionTextNode);
    selectEle.appendChild(optionEle);
    selectEle.addEventListener("change", function () {
        processChoice(info[id].next_div);
    })
    divEle.appendChild(label);

    let dotsHeader = document.createElement("h2");
    let dots = document.createTextNode("...");
    dotsHeader.appendChild(dots);

    //add br 
    let breakEle = document.createElement("br");
    divEle.appendChild(breakEle);

    divEle.appendChild(selectEle);
    divEle.appendChild(dotsHeader);
    optionDiv.appendChild(divEle);

}

/**
 * The showAnswers function shows the user the answer when he has finished making all his choices. 
 * It calls the createAllOptionsNode which shows all the choices that the user had made to get to 
 * that result. 
 */

function showAnswers() {
    createAllOptionsNode()
    let choice = localStorage.getItem("choice");
    let answer = info["result"]["answers"][choice][0];
    let mainDiv = document.getElementById(info["result"].choice_number);
    let linkEle = document.createElement("a");
    let hEle = document.createElement("h2");
    let headerText = document.createTextNode("You're going to love");
    hEle.appendChild(headerText);

    let text = document.createTextNode(answer);
    linkEle.appendChild(text);
    linkEle.setAttribute("href", info["result"]["answers"][choice][1])
    linkEle.href = info["result"]["answers"][choice][1];
    mainDiv.appendChild(hEle);
    mainDiv.appendChild(linkEle);
}
/**
 * This function displays all the choices that the user had made to get to a particular answer. 
 */

function createAllOptionsNode() {
    console.log("From function create all options node")
    let mainDiv = document.getElementById("options_div");
    let choice = localStorage.getItem("choice");
    let hEle = document.createElement("h3");
    
    let answerText = "";
    let divEle = document.createElement("div");
    divEle.setAttribute("id", info["result"].choice_number);
    
    for (i = 2; i < userChoices.length; i++) {
        answerText = answerText + userChoices[i] + " ";
    }
    answerText = answerText + "and " + choice + ", eh?";
    let answerTextNode = document.createTextNode(answerText);
    hEle.setAttribute("id", "choices");
    hEle.appendChild(answerTextNode);
    divEle.appendChild(hEle)
    mainDiv.appendChild(divEle)
    formShow();
}
/**
 * This is a funct ion that is used to delete divs from the page depending on what the current_id is. 
 * This function is called everytime the user makes a choice and it deletes teh divs depending on which 
 * choice the user is making. For example: If the user is changing his first option after making all 3 choices, 
 * the 2nd and 3rd div will be removed. 
 */

function deleteDivs(current_id) {
    //if id is greater than id that is passed delete it 
    let allDivs = document.querySelectorAll("div");

    for(i=0; i< allDivs.length; i++){
       let id = allDivs[i].getAttribute("id")
       if(parseInt(id) >= current_id){
           allDivs[i].parentNode.removeChild(allDivs[i])
       } 
    }

}

/**
 * This is a function which is used to hide the form
 */

function formHide() {
    let form = document.getElementById("newsletter");
    form.style.display = "none";
}

/**
 * This is a function which is used to show the form
 */

function formShow() {
    let form = document.getElementById("newsletter");
    form.style.display = "block";
}