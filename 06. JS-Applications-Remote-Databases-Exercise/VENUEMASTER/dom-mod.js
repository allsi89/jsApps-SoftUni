
function buildHtml(venue) {
    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "venue");
    wrapper.setAttribute("id", venue._id);

    const span = document.createElement("span");
    span.setAttribute("class", "venue-name");
    span.textContent = venue.name;

    const input = document.createElement("input");
    input.setAttribute("class", "info");
    input.setAttribute("type", "button");
    input.value = "More info";
    // input.addEventListener("click", showInfo);

    const div = document.createElement("div");
    div.setAttribute("class", "venue-details");
    div.setAttribute("style", "display: none;");

    const table = document.createElement("table");

    const tr1 = document.createElement("tr");
    const thPrice = document.createElement("th");
    thPrice.textContent = "Ticket Price";
    const thQuantity = document.createElement("th");
    thQuantity.textContent = "Quantity";
    const emptyTh = document.createElement("th");

    const tr2 = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.setAttribute("class", "venue-price");
    td1.textContent = venue.price;

    const td2 = document.createElement("td");
    const select = document.createElement("select");
    select.setAttribute("class", "quantity");


    const option1 = document.createElement("option");
    option1.setAttribute("value", "1");
    option1.textContent = "1";

    const option2 = document.createElement("option");
    option2.setAttribute("value", "2");
    option2.textContent = "2";

    const option3 = document.createElement("option");
    option3.setAttribute("value", "3");
    option3.textContent = "3";

    const option4 = document.createElement("option");
    option4.setAttribute("value", "4");
    option4.textContent = "4";

    const option5 = document.createElement("option");
    option5.setAttribute("value", "5");
    option5.textContent = "5";

    const td3 = document.createElement("td");

    const purchaseInput = document.createElement("input");
    purchaseInput.setAttribute("class", "purchase");
    purchaseInput.setAttribute("type", "button");
    purchaseInput.setAttribute("value", "Purchase");
    // purchaseInput.addEventListener("click", purchase);

    const hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("type", "hidden");
    hiddenInput.setAttribute("value", `${venue._id}`);

    const headSpan = document.createElement("span");
    headSpan.setAttribute("class", "head");
    headSpan.textContent = "Venue description:";

    const p1 = document.createElement("p");
    p1.setAttribute("class", "description");
    p1.textContent = venue.description;

    const p2 = document.createElement("p");
    p2.setAttribute("class", "description");
    p2.textContent = `Starting time: ${venue.startingHour}`;

    select.append(option1, option2, option3, option4, option5);

    td2.appendChild(select);
    td3.append(purchaseInput, hiddenInput);

    tr1.append(thPrice, thQuantity, emptyTh);
    tr2.append(td1, td2, td3);

    table.append(tr1, tr2);
    div.append(table, headSpan, p1, p2);

    span.appendChild(input);
    wrapper.append(span, div);
    return wrapper;
}


function buildPurchaseHtml(id, qty) {
    const name = document.getElementById(id).firstChild.textContent;
    const price = Number(document.getElementById(id).getElementsByClassName("venue-price")[0].textContent);

    const purchaseSpan = document.createElement("span");
    purchaseSpan.setAttribute("class", "head");
    purchaseSpan.textContent = "Confirm purchase";
    const purchaseDiv = document.createElement("div");
    purchaseDiv.setAttribute("class", "purchase-info");
    const firstSpan = document.createElement("span");
    firstSpan.textContent = name;
    const secondSpan = document.createElement("span");
    secondSpan.textContent = `${qty} x ${price}`;
    const thirdSpan = document.createElement("span");
    thirdSpan.textContent = `Total: ${qty * price} lv`;
    const confirmButton = document.createElement("input");
    confirmButton.setAttribute("type", "button");
    confirmButton.setAttribute("value", "Confirm");
    confirmButton.setAttribute("class", "confirm-btn");
    purchaseDiv.append(firstSpan, secondSpan, thirdSpan, confirmButton);
    document.getElementById("venue-info").innerHTML = "";
    document.getElementById("venue-info").appendChild(purchaseSpan);
    document.getElementById("venue-info").appendChild(purchaseDiv);
    return purchaseDiv;
}

function showTicket(data){
    document.getElementById("venue-info").innerHTML = "";
    const p = document.createElement("p");
    const div = document.createElement("div");
    p.textContent = "You may print this page as your ticket";
    div.innerHTML = data.html;
    document.getElementById("venue-info").append(p, div)
}

export {buildHtml, buildPurchaseHtml, showTicket}