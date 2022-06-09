function selectItem(item) {
    let checkedItem = checkItemSelection(item);
    if (checkedItem) {
        return true
    }
    
    cleanCarouselSelection(item.parentElement.querySelectorAll(".option"));
    
    setIconToOption(item);

    return true
}

function checkItemSelection(item) {
    if (item.classList.contains("selected")) {
        item.classList.remove("selected");
        item.removeChild(item.querySelector("ion-icon"));
        return true
    }

    return false
}

function cleanCarouselSelection(carousel) {
    let child;

    for (let i=0; i < carousel.length; i++) {
        child = carousel[i];
        if (child.classList.contains("selected")) {
            child.classList.remove("selected");
            child.removeChild(child.querySelector("ion-icon"));
        }
    }
}

function setIconToOption(item) {
    let icon = document.createElement(
        "ion-icon"
    );
    icon.setAttribute("name", "checkmark-circle");
    item.classList.add("selected");
    item.appendChild(icon);
}

let finishButton = document.querySelector(".footer button");
let notFinishedButton = document.querySelector(".footer button p").cloneNode(true);
let finalPage = document.querySelector(".final-page");

document.addEventListener("click", () => {
    if (document.querySelectorAll(".selected").length == 3) {
        finishButton.style.backgroundColor = "#32B72F";
        finishButton.textContent = "Fechar pedido"
    }
    else {
        finishButton.style.backgroundColor = "#CBCBCB";
        finishButton.replaceChildren(notFinishedButton);
    }
})

function showFinalPage() {
    if (document.querySelectorAll(".selected").length == 3) {
        finalPage.classList.toggle("display-none");
    }
}

function hideFinalPage() {
    finalPage.classList.toggle("display-none");
}