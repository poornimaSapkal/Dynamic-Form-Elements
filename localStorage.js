console.log("linked"); 

function setChoice(id){
    let select = document.getElementById("first_choice");
    let selectedOption = select.options[select.selectedIndex].value;
    createSecondMenu(selectedOption);
}

function createSecondMenu(option){
    if(option == "nature"){
        let optionOneValue = "Mountains";
        let optionTwoValue = "Islands";
        let values = [optionOneValue, optionTwoValue];
        createOptionNode(values)
    }
    else if (option == "cities"){
        console.log("You picked cities");
    }
}

function createOptionNode(values){
    console.log("The next option is:", option);
  
    let optionsDiv = document.getElementById("options_div");
    let divEle = document.createElement("div");
    let labelEle = document.createElement("label");
    let selectEle = document.createElement("select");

    values.forEach(function(value){
        let optionEle = document.createElement("option")
    })

    let optionOneEle = document.createElement("option");
    let optionTwoEle = document.createElement("option");
    let optionOneTextEle = document.createTextNode("Arabic");
    let optionTwoTextEle = document.createTextNode("Spanish");
    optionOneEle.setAttribute("value", "arabic");
    optionTwoEle.setAttribute("value", "spanish");
    optionOneEle.append(optionOneTextEle);
    optionTwoEle.append(optionTwoTextEle);

    divEle.setAttribute("id", "second_div");
    labelEle.setAttribute("for", "language");
    selectEle.setAttribute("name", "second_choice");
    selectEle.setAttribute("id", "second_choice");
    

    selectEle.appendChild(optionOneEle);
    selectEle.appendChild(optionTwoEle);
    labelEle.appendChild(selectEle);
    divEle.appendChild(labelEle);
    optionsDiv.appendChild(divEle);
    
    console.log("function over");
}