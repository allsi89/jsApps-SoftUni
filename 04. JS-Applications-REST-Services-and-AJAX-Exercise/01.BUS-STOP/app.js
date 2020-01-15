function getInfo() {
    const stopIdInput = document.getElementById("stopId");
    const stopNameDiv = document.getElementById("stopName");
    const busContainer = document.getElementById("buses");

    const busesUrl = `https://judgetests.firebaseio.com/businfo/${stopIdInput.value}.json`;

    stopNameDiv.textContent = "";
    busContainer.innerHTML = "";

    fetch(busesUrl)
    .then(checkForErrors)
    .then(res => res.json())
    .then(processData)
    .catch(handleErrors);

    function checkForErrors(res) {
        if (!res.ok) {
            throw new Error(`Something went wrong!\n%c${res.status} - ${res.statusText}`);
        }
        return res;
    }

    function processData(data) {
        const {
            name,
            buses
        } = data;

        stopNameDiv.textContent = name;

        Object.entries(buses)
            .forEach(
                ([busId, busTime]) => {
                    const li = document.createElement("li");
                    li.textContent = `Bus ${busId} arrives in ${busTime} minutes`;
                    busContainer.appendChild(li);
                });
    }

    function handleErrors(e) {
        stopNameDiv.textContent = "Error";
        console.log(e.message, "color:red")
    }
}