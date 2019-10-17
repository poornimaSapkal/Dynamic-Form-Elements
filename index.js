let incrementNumber = 1;
function increaseSize(){
    let heart = document.getElementById("heart_div");
    let size = heart.style.getPropertyValue("font-size")
    let stopSize = 2 * parseInt(size) + 'px';
    console.log("Stop size:", stopSize);
    recursivelyIncreaseSize(stopSize)
}

function recursivelyIncreaseSize(stopSize){
    console.log("increasing")
    let heart = document.getElementById("heart_div");
    let size = heart.style.getPropertyValue("font-size");
    heart.style["font-size"] = 5 + parseInt(size) + "px";
    console.log("Now size:", size)
    if(parseInt(size)<parseInt(stopSize)){
        console.log("size<stopSize")
        setTimeout(recursivelyIncreaseSize,40, stopSize);
    }
}

function decreaseSize() {
    console.log("decrease")
    let heart = document.getElementById("heart_div");
    let size = heart.style.getPropertyValue("font-size")
    let stopSize = (parseInt(size)/2) + 'px';
    console.log("Stop size:", stopSize);
    recursivelyDecreaseSize(stopSize)
}

function recursivelyDecreaseSize(stopSize){
    console.log("Decreasing")
    let heart = document.getElementById("heart_div");
    let size = heart.style.getPropertyValue("font-size");
    heart.style["font-size"] = parseInt(size) - 5 + "px";
    console.log("Now size:", size)
    if(parseInt(size)>parseInt(stopSize)){
        console.log("size>stopSize")
        setTimeout(recursivelyDecreaseSize,40, stopSize);
    }
}

function modifySize(){
    console.log("modifying size")
    incrementNumber = incrementNumber + 1;
    if(incrementNumber%2 == 0){
        increaseSize();
    } else {
        decreaseSize();
    }
}