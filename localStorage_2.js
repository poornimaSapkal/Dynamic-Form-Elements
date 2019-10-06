console.log("linked"); 

function setChoice(id){
    removeOtherDivs();
    let select = document.getElementById("first_choice");
    let selectedOption = select.options[select.selectedIndex].value;
    localStorage.setItem("two_choice", selectedOption);
    createSecondMenu();
}

function createSecondMenu(){
    let option = localStorage.getItem("two_choice");
    if(option == "nature"){
        let optionOneValue = "Mountains";
        let optionTwoValue = "Islands";
        let values = [optionOneValue, optionTwoValue];
        createOptionNode(option, values)
    }
    else if (option == "cities"){
        let optionOneValue = "Arabic";
        let optionTwoValue = "Spanish";
        let values = [optionOneValue, optionTwoValue];
        createOptionNode(option, values)
    }
}

function createThirdMenu(){
    let select = document.getElementById("second_choice");
    let selectedOption = select.options[select.selectedIndex].value;
    console.log("You had selected:", selectedOption);

    if (selectedOption=="Islands") {
        let optionOneValue = "Carribbean";
        let optionTwoValue = "South Pacafic";
        let values = [optionOneValue, optionTwoValue];
        createOptionNode(option, values)
    } else if (selectedOption == "Mountains"){
        let optionOneValue = "South America";
        let optionTwoValue = "Asia";
        let values = [optionOneValue, optionTwoValue];
        createOptionNode(option, values)
    } else if (selectedOption == "Arabic"){
        let optionOneValue = "Ancient Cities";
        let optionTwoValue = "New Cities";
        let values = [optionOneValue, optionTwoValue];
        createOptionNode(option, values)
    } else if (selectedOption == "Spanish"){
        let optionOneValue = "Humanities";
        let optionTwoValue = "Science";
        let values = [optionOneValue, optionTwoValue];
        createOptionNode(option, values)
    }
}

function createOptionNode(option, values){
    console.log("The next option is:", option);
  
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

    divEle.setAttribute("id", "second_div");
    labelEle.setAttribute("for", "language");
    selectEle.setAttribute("name", "second_choice");
    selectEle.setAttribute("id", "second_choice");
    selectEle.addEventListener("change", createThirdMenu);
    labelEle.appendChild(selectEle);
    divEle.appendChild(labelEle);
    optionsDiv.appendChild(divEle);
    
    console.log("function over");
}

function removeOtherDivs(){
    console.log("trying to remove other divs");
    try{
        let allSecondDivs = document.querySelectorAll("#second_div");
        console.log("in try")
        console.log("All second divs:", allSecondDivs);
        allSecondDivs.forEach(function(secondDiv){
            secondDiv.parentNode.removeChild(secondDiv);
            console.log("secondDiv", secondDiv);
        })
    }
    catch (e){
        console.log("Elements not present!");
    }
}
