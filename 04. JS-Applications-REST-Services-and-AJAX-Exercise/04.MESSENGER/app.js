function attachEvents() {
    const sendBtn = document.getElementById("submit");
    const refreshBtn = document.getElementById("refresh");
    const inputName = document.getElementById("author");
    const inputMessage = document.getElementById("content");
    const msgContainer = document.getElementById("messages");

    sendBtn.addEventListener("click", sendMessage);
    refreshBtn.addEventListener("click", showMessages);

    function sendMessage() {
        const headers = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                author: inputName.value,
                content: inputMessage.value
            })
        }

        fetch("https://rest-messanger.firebaseio.com/messanger.json", headers)
            .then(() => {
                inputName.value = "";
                inputMessage.value = "";
                msgContainer.value = "";
                showMessages();
            })
            .catch(handleErrors);
    }

    function showMessages() {
        fetch("https://rest-messanger.firebaseio.com/messanger.json")
            .then(checkForErrors)
            .then(res => res.json())
            .then(data => {
                msgContainer.value = Object.values(data)
                    .map(d => `${d.author}: ${d.content}`)
                    .join("\n");
            })
            .catch(handleErrors);
    }

    function checkForErrors(res) {
        if (!res.ok) {
            throw new Error(`Something went wrong!\n${res.status} - ${res.statusText}`);
        }
        return res;
    }

    function handleErrors(e) {
        console.log(e.message);
    }
}

attachEvents();