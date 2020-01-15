import {
    fetchData
} from "./fetch.js";

import {
    Catch
} from "./catch.js";

import {
    getElems
} from "./dom-mod.js";

function attachEvents() {

    const fnty = {
        Update: (btn) => updateCatch(btn),
        Delete: (btn) => deleteCatch(btn)
    }

    getElems().$loadBtn().addEventListener("click", loadCatches);
    getElems().$addBtn().addEventListener("click", createCatch);

    getElems().$catches().addEventListener("click", function (e) {
        if (typeof fnty[e.target.textContent] === "function") {
            fnty[e.target.textContent](e.target);
        }
    });

    function createCatch() {
        const values = getUserInput(getElems().$addForm());
        const data = new Catch(...values);

        async function addEl() {
            await fetchData()
                .post(data)
                .catch(console.error);
            loadCatches();
        }

        addEl();
    }

    function loadCatches() {
        fetchData()
            .get()
            .then(handleErrors)
            .then(processData)
            .catch(console.error);
    }

    function updateCatch(btn) {
        const code = btn.parentNode.getAttribute("data-id");
        const values = getUserInput(btn.parentNode);
        const body = new Catch(...values);

        async function updateEl() {
            await fetchData()
                .put(body, code)
                .catch(console.error);
            loadCatches();
        }

        updateEl();
    }

    function deleteCatch(btn) {
        const code = btn.parentNode.getAttribute("data-id");

        async function deleteEl() {
            await fetchData()
                .del(code)
                .catch(console.error);
            loadCatches();
        }

        deleteEl();
    }

    function processData(data) {
        const arr = [];
        Object.keys(data).forEach(id => {

            const copy = getElems().$exampleCatch().cloneNode(true);
            copy.setAttribute("data-id", id);
            getElems().$catches().appendChild(copy);

            Array.from(copy.children).map(el => {
                if (el.tagName === "INPUT") {
                    el.value = data[id][el.className];
                }
            })
            arr.push(copy);
        });

        getElems().$catches().innerHTML = "";
        arr.forEach(e => getElems().$catches().appendChild(e));
    }

    function getUserInput(form) {
        const elems = form.getElementsByTagName("input");
        return Array
            .from(elems)
            .map(i => i.value);
    }

    function handleErrors(res) {
        if (typeof res !== "object") {
            throw new Error("Error!");
        }
        return res;
    }
}
attachEvents();