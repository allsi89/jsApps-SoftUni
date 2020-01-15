(() => {
    renderCatTemplate();

    async function renderCatTemplate() {
        const catSrc = await fetch("./templates/cat.hbs")
            .then(res => res.text());

        Handlebars.registerPartial("cat", catSrc);

        const allCatsSrc = await fetch("./templates/all-cats.hbs")
            .then(res => res.text());

        const template = Handlebars.compile(allCatsSrc);

        const context = {
            cats: window.cats
        };

        const catsHtml = template(context);

        document.getElementById("allCats").innerHTML = catsHtml;
    }

})()

function toggle(btn) {
    const div = document.getElementById(btn.dataset.id);

    if (div.style.display === "none") {
        btn.textContent = "Hide status code";
        div.style.display = "inline";
    } else {
        btn.textContent = "Show status code";
        div.style.display = "none";
    }
}