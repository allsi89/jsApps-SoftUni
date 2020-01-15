function getElems() {
    return {
        $submit: () => document.getElementById("submit"),
        $location: () => document.getElementById("location"),
        $divCurrent: () => document.getElementById("current"),
        $divForecast: () => document.getElementById("forecast"),
        $divUpcoming: () => document.getElementById("upcoming")
    }
}

function appendElems(parent, children){
    parent.appendChild(children);
}

function removeElem (element){
    element.removeChild(element.lastChild)
}

function createElement(type, text, ...classNames) {
    const element = document.createElement(type);
    if(text) element.textContent = text;
    element.classList.add(...classNames);
    return element;
}


export { getElems, appendElems, removeElem, createElement}