function selectItem(item) {
    if (item.classList.contains("selected")) {
        item.classList.remove("selected");
        return item.removeChild(item.querySelector("ion-icon"));
    }

    let carousel = item.parentElement.querySelectorAll(".option");
    let child;

    for (let i=0; i < carousel.length; i++) {
        child = carousel[i];

        if (child.classList.contains("selected")) {
            child.classList.remove("selected");
            child.removeChild(child.querySelector("ion-icon"));
        }
    }
    let icon = document.createElement(
        "ion-icon"
    )
    icon.setAttribute("name", "checkmark-circle");
    item.classList.add("selected");
    item.appendChild(icon);
}