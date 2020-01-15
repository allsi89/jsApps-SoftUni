$(async function () {
    const monkeysSrc = await fetch("./template.hbs")
        .then(res => res.text());

    const template = Handlebars.compile(monkeysSrc);

    const context = {monkeys};

    const monkeysHtml = template(context);

    document.getElementsByClassName("monkeys")[0].innerHTML = monkeysHtml;
}())

document.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
        const pInfo = document.getElementById(e.target.dataset.id);
        pInfo.style.display = pInfo.style.display === "none" ? "block" : "none";
    }
})