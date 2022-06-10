let finishButton = document.querySelector(".footer button");
let notFinishedButton = document.querySelector(".footer button p").cloneNode(true);
let finalPage = document.querySelector(".final-page");
let finalPageCopy = document.querySelector(".final-page > div").cloneNode(true);
let totalPriceSum;
let selectedMainCourse;
let selectedDrink;
let selectedDessert;

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

    return true;
}

function setIconToOption(item) {
    let icon = document.createElement(
        "ion-icon"
    );
    icon.setAttribute("name", "checkmark-circle");
    item.classList.add("selected");
    item.appendChild(icon);
}

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
        let itemsFinalPage = document.querySelectorAll(".final-page span");
        let totalPrice = document.querySelectorAll(".final-page p")[1];
        itemsFinalPage[0].innerText = document.querySelector(".main-course .selected h3").innerText;
        itemsFinalPage[2].innerText = document.querySelector(".drink .selected h3").innerText;
        itemsFinalPage[4].innerText = document.querySelector(".dessert .selected h3").innerText;
        itemsFinalPage[1].innerText = document.querySelector(".main-course .selected span").innerText.slice(3);
        itemsFinalPage[3].innerText = document.querySelector(".drink .selected span").innerText.slice(3);
        itemsFinalPage[5].innerText = document.querySelector(".dessert .selected span").innerText.slice(3);

        totalPriceSum = Number(itemsFinalPage[1].innerText.replace(",", ".")) + Number(itemsFinalPage[3].innerText.replace(",", ".")) + Number(itemsFinalPage[5].innerText.replace(",", "."));
        totalPriceSum = totalPriceSum.toFixed(2);
        totalPriceSum = String(totalPriceSum).replace(".", ",");

        totalPrice.innerText = "R$ " + totalPriceSum;
        totalPrice.innerText;
        finalPage.classList.toggle("display-none");
    }
}

function sendToWhatsapp() {
    let name = prompt("Por favor, informe seu nome");
    let address = prompt("Por favor, informe seu endereço");
    selectedMainCourse = document.querySelector(".main-course .selected h3").innerText;
    selectedDrink = document.querySelector(".drink .selected h3").innerHTML;
    selectedDessert = document.querySelector(".dessert .selected h3").innerText;
    

    let message = `Olá, gostaria de fazer o pedido:\n- Prato: ${selectedMainCourse}\n- Bebida: ${selectedDrink}\n- Sobremesa: ${selectedDessert}\nTotal: R$ ${totalPriceSum}\n\nNome: ${name}\nEndereço: ${address}`;

    window.open(`https://wa.me/5511994107417?text=${encodeURIComponent(message)}`, '_blank');

    orderSentToWhatsapp();
}

function orderSentToWhatsapp() {
    document.querySelector(".final-page > div").innerHTML = "<h4 style='text-align: center;'>Finalize seu pedido pelo Whatsapp</h4><button class='confirm-order' onclick='resetFinalPage();'>Fechar</button>";
}

function resetFinalPage() {
    document.querySelector(".final-page > div").innerHTML = finalPageCopy.innerHTML;
    hideFinalPage();
}

function hideFinalPage() {
    finalPage.classList.toggle("display-none");
}