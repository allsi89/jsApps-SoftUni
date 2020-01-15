import {
    get,
    post
} from "./requester.js";

import {
    buildHtml,
    buildPurchaseHtml,
    showTicket
} from "./dom-mod.js";

const actions = {
    "getVenues": async function () {
        let ids;
        const date = document.getElementById("venueDate");
        try {
            ids = await post("rpc", `custom/calendar?query=${date.value}`);
            actions.getVenue(ids);
        } catch (e) {
            console.error(e);
        }

    },
    "confirm": async function (id, qty) {
        try {
            const data = await post("rpc", `custom/purchase?venue=${id}&qty=${qty}`);
            showTicket(data);

        } catch (e) {
            console.error(e);
        }

    },
    "getVenue": function (ids) {
        const container = document.getElementById("venue-info");
        container.innerHTML = "";
        const div = document.createElement("div");
        ids
            .forEach(id => {
                get("appdata", `venues/${id}`)
                    .then(v => {
                        const wrapper = buildHtml(v);
                        div.appendChild(wrapper)
                        wrapper.getElementsByClassName("info")[0].addEventListener("click", actions.showInfo);
                        wrapper.getElementsByClassName("purchase")[0].addEventListener("click", actions.purchase);
                    })
                    .catch(e => console.error(e));

            });
        container.appendChild(div)
    },
    "showInfo": function (e) {
        e.target.parentNode.parentNode.children[1]
            .setAttribute("style", "display:block;");
    },
    "purchase": function (e) {
        const id = e.target.nextSibling.value;
        const qty = Number(document.getElementById(id).getElementsByClassName("quantity")[0].value);
        const purchaseDiv = buildPurchaseHtml(id, qty);
        purchaseDiv.getElementsByClassName("confirm-btn")[0].addEventListener("click", actions.confirm(id, qty));
    }

}

function handleEvent(e) {
    if (typeof actions[e.target.id] === "function") {
        e.preventDefault();
        actions[e.target.id]();
    }
}

(function attacheEvents() {
    document.addEventListener("click", handleEvent)
}())