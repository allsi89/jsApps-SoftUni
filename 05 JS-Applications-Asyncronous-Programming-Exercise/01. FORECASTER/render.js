import {
    getElems,
    appendElems,
    createElement,
    removeElem
} from "./dom-mod.js";

const symbols = {
    Sunny: "☀",
    "Partly sunny": "⛅",
    Overcast: "☁",
    Rain: "☂",
    Degrees: "°"
}

function renderInfo(current, upcoming) {
    getElems().$divForecast().style.display = "block";

    const todayForecast = todayInfo(current);
    removeElem(getElems().$divCurrent());
    appendElems(getElems().$divCurrent(), todayForecast);

    const upcomingForecast = upcomingInfo(upcoming);
    removeElem(getElems().$divUpcoming());
    appendElems(getElems().$divUpcoming(), upcomingForecast);
}

function renderError() {
    getElems().$divForecast().style.display = "block";
    const error = createElement("div", "Error!", "forecasts");
    const errorMsg = createElement("div", "Invalid input!", "forecasts");
    removeElem(getElems().$divCurrent());
    removeElem(getElems().$divUpcoming());
    appendElems(getElems().$divCurrent(), error);
    appendElems(getElems().$divUpcoming(), errorMsg);
}

function todayInfo(day) {
    const deg = degreesTemplate(day.forecast);
    const sym = symbols[day.forecast.condition];

    const divWrapper = createElement("div", "", "forecasts");

    const spanSym = createElement("span", sym, "condition", "symbol");

    const span = createElement("span", "", "condition");
    const spanName = createElement("span", day.name, "forecast-data");
    const spanTemp = createElement("span", deg, "forecast-data");
    const spanWeather = createElement("span", day.forecast.condition, "forecast-data");

    span.append(spanName, spanTemp, spanWeather);
    divWrapper.append(spanSym, span);

    return divWrapper;
}

function upcomingInfo(nextDays) {
    const divWrapper = createElement("div", "", "forecast-info");

    nextDays.forecast.forEach(day => {
        const deg = degreesTemplate(day);
        const sym = symbols[day.condition];

        const span = createElement("span", "", "upcoming");
        const spanSym = createElement("span", sym, "symbol");
        const spanDeg = createElement("span", deg, "forecast-data");
        const spanWeather = createElement("span", day.condition, "forecast-data");

        span.append(spanSym, spanDeg, spanWeather);
        divWrapper.appendChild(span);
    });
    return divWrapper;
}

function degreesTemplate(obj) {
    return `${obj.low}${symbols.Degrees}/${obj.high}${symbols.Degrees}`;
}


export {
    renderInfo,
    renderError
};