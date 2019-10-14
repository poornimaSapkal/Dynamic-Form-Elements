let http = new XMLHttpRequest();
let info;
function fetchData(){   
    http.open("GET", "data.json", true);
    http.setRequestHeader('Accept', 'application/json');
    http.onreadystatechange = handleHttpResponse;
    http.send(null);
}

function handleHttpResponse(){
    if (http.readyState === 4 && http.status === 200) {
        info = JSON.parse(http.response);
    }
}
function processFirstChoice(id) {
    console.log("info::",info)
    //clear all divs that are below this div 
    let select = document.getElementById("first_choice");
    let selectedOption = select.value;
    localStorage.setItem("first_choice", selectedOption);
    localStorage.setItem("current_choice", selectedOption);
    deleteFollowingDivs();
    Choice("second_div", "second_choice", "first_choice_made");

    let selectEle = document.getElementById("second_choice");
    selectEle.addEventListener("change", processSecondChoice);
}

function Choice(divName, choiceNumber, whichChoice){
    localStorage.setItem("current_choice_number", whichChoice);
    deleteFollowingDivs();
    let values = info[localStorage.getItem("current_choice")]
    let optionsDiv = document.getElementById("options_div");
    let divEle = document.createElement("div");
    let labelEle = document.createElement("label");
    let selectEle = document.createElement("select");

    values.forEach(function(value){
        let optionEle = document.createElement("option")
        let optionTextNode = document.createTextNode(value);
        optionEle.setAttribute("value", value);
        optionEle.append(optionTextNode);
        selectEle.appendChild(optionEle);
    })

    divEle.setAttribute("id", divName);
    labelEle.setAttribute("for", "language");
    selectEle.setAttribute("name", choiceNumber);
    selectEle.setAttribute("id", choiceNumber);
    labelEle.appendChild(selectEle);
    divEle.appendChild(labelEle);
    optionsDiv.appendChild(divEle);
}

function processSecondChoice(){
    let select = document.getElementById("second_choice");
    let selectedOption = select.value;
    localStorage.setItem("current_choice", selectedOption);
    localStorage.setItem("second_choice", selectedOption);
    localStorage.setItem("current_choice", selectedOption);
    Choice("third_div", "third_choice", "second_choice_made");
}

function deleteFollowingDivs(){
    let currentNumberOfChoices = localStorage.getItem("current_choice_number");
    if (currentNumberOfChoices == "first_choice_made"){
        try{
            let secondDiv = document.getElementById("second_div");
            secondDiv.parentNode.removeChild(secondDiv);
            let thirdDiv = document.getElementById("third_div");
            thirdDiv.parentNode.removeChild(thirdDiv);
        } catch(e) {
            console.log("Div does not exist!");
        }
    } else if (currentNumberOfChoices == "second_choice_made"){
        try{
            let thirdDiv = document.getElementById("third_div");
            thirdDiv.parentNode.removeChild(thirdDiv);
        } catch(e) {
            console.log("Div does not exist!");
        }
    }
}
