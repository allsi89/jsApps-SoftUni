function attachEvents() {
    const btnLoad = document.getElementById("btnLoad");
    const btnCreate = document.getElementById("btnCreate");
    const phonebookContainer = document.getElementById("phonebook");
    const inputPerson = document.getElementById("person");
    const inputPhone = document.getElementById("phone");

    btnLoad.addEventListener("click", loadPhonebook);
    btnCreate.addEventListener("click", addContact);

    function loadPhonebook() {
        fetch("https://phonebook-nakov.firebaseio.com/phonebook.json")
            .then(checkForErrors)
            .then(res => res.json())
            .then(processData)
            .catch(handleErrors)

    }

    function processData(data) {
        phonebookContainer.innerHTML = "";

        Object.entries(data)
            .forEach(([id, {
                person,
                phone
            }]) => {
                const li = document.createElement("li");
                li.textContent = `${person}: ${phone}`;

                const btn = document.createElement("button");
                btn.textContent = "Delete";
                btn.setAttribute("data-target", id);
                btn.addEventListener("click", deleteItem)

                li.appendChild(btn);
                phonebookContainer.appendChild(li);
            })
    }

    function addContact() {
        let headers = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                person: inputPerson.value,
                phone: inputPhone.value
            })
        }

        fetch("https://phonebook-nakov.firebaseio.com/phonebook.json", headers)
            .then(() => {
                inputPerson.value = "";
                inputPhone.value = "";
                phonebookContainer.innerHTML = "";
                loadPhonebook();
            })
            .catch(handleErrors)
    }

    function deleteItem() {

        const phonebookId = this.getAttribute("data-target");

        const headers = {
            method: "DELETE"
        };

        fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${phonebookId}.json`, headers)
            .then(() => {
                phonebookContainer.innerHTML = "";
                loadPhonebook();
            })
            .catch(handleErrors)
    }

    function checkForErrors(res) {
        if (!res.ok) {
            throw new Error(`Something went wrong!\n%c${res.status} - ${res.statusText}`);
        }
        return res;
    }

    function handleErrors(err) {
        console.error(err.message, "color:red");
   }

}

attachEvents();