function solve() {
    const infoSpan = document.getElementsByClassName("info")[0];
    const departBtn = document.getElementById("depart");
    const arriveBtn = document.getElementById("arrive");

    let currentId = "depot";
    let currentName = "";

    function depart() {
        fetch(`https://judgetests.firebaseio.com/schedule/${currentId}.json`)
            .then(checkForErrors)
            .then(res => res.json())
            .then(departSuccess)
            .catch(handleErrors);
    }

    function checkForErrors(res) {
        if (!res.ok) {
            throw new Error(`Something went wrong!\n%c${res.status} - ${res.statusText}`);
        }
        return res;
    }

    function handleErrors(e) {
        infoSpan.textContent = "Error";
        console.log(e.message, "color:red")
    }

    function departSuccess(data) {
        const {
            name,
            next
        } = data;

        currentId = next;
        currentName = name;

        departBtn.disabled = true;
        arriveBtn.disabled = false;
        infoSpan.textContent = `Next stop ${currentName}`;
    }

    function arrive() {
        infoSpan.textContent = `Arriving at ${currentName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();