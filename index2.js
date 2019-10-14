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

function processFirstChoice(id){
    let select = document.getElementById(id);
    let selectedOption = select.value;
    localStorage.setItem(id, selectedOption);
    localStorage.setItem("current_choice", selectedOption);
    let nextValue = select.getAttribute("next_choice");
    Choice("second_div",id, nextValue);
    let selectEle = document.getElementById(nextValue);
    selectEle.addEventListener("change", processSecondChoice);
    selectEle.setAttribute("next_choice", "third_choice");
}

function Choice(divName, optionId, nextDiv){
    let optionsDiv = document.getElementById("options_div");
    let divEle = document.createElement("div");
    let labelEle = document.createElement("label");
    let selectEle = document.createElement("select");
    console.log("From Choice:");
    console.log("option ID:", optionId);
    console.log(info[optionId]);
    let value = localStorage.getItem("current_choice")
    let optionValues = info[optionId]["options"][value];
    optionValues.forEach(function(value){
        let optionEle = document.createElement("option")
        let optionTextNode = document.createTextNode(value);
        optionEle.setAttribute("value", value);
        optionEle.append(optionTextNode);
        selectEle.appendChild(optionEle);
    });


    divEle.setAttribute("id", divName);
    selectEle.setAttribute("name", nextDiv);
    selectEle.setAttribute("id", nextDiv);

    labelEle.appendChild(selectEle);
    divEle.appendChild(labelEle);
    optionsDiv.appendChild(divEle);
    
}

function processSecondChoice(){
    let id = this.name;
    let select = document.getElementById(id);
    let selectedOption = select.value;
    localStorage.setItem(id, selectedOption);
    localStorage.setItem("current_choice", selectedOption);
    let nextValue = select.getAttribute("next_choice");
    Choice("second_div",id, nextValue);
    let selectEle = document.getElementById(nextValue);
    selectEle.addEventListener("change", processThirdChoice);
    selectEle.setAttribute("next_choice", "fourth_choice");
}

function processThirdChoice(){
    console.log("victory 3");
}
