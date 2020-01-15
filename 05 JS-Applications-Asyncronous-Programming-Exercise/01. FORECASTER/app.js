import {
    getElems
} from "./dom-mod.js";

import {
    myFetch
} from "./fetch.js";

import {
    renderInfo,
    renderError
} from "./render.js";

function attachEvents() {

    getElems().$submit().addEventListener("click", getWeatherInfo);

    function getWeatherInfo() {
        const locName = getElems().$location().value;
        
        myFetch().locations()
            .then(locations => {
                const {code} = findLocation(locations, locName);
                return getForecast(code);
            })
            .then(([current, upcoming]) => renderInfo(current, upcoming))
            .catch(handleError)
    }

    function findLocation(locations, locName) {
        return locations.find((o) => o.name === locName);
    }

    function getForecast(code) {
        return Promise.all([
            myFetch().current(code),
            myFetch().upcoming(code)
        ]);
    }

    function handleError() {
        console.error("Invalid input");
        renderError();
    }
}
attachEvents();


