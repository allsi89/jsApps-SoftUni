(function () {
    document.getElementById("btnLoadTowns")
        .addEventListener("click", async function () {
            const towns = document
                .getElementById("towns")
                .value
                .split(", ");

            const source = await fetch("./towns.hbs")
            .then(res => res.text());
            const template = Handlebars.compile(source);
            const context = {towns};
            const townsHtml = template(context);

            document.getElementById("root").innerHTML = townsHtml;
        })

}())