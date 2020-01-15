import {
    get,
    post,
    put,
    del
} from "./requester.js";

const htlm = {
    "getAllBooks": () => document.getElementById("all-books"),
    "getTitle": () => document.getElementById("title"),
    "getAuthor": () => document.getElementById("author"),
    "getIsbn": () => document.getElementById("isbn"),
    "getEditTitle": () => document.getElementById("edit-title"),
    "getEditAuthor": () => document.getElementById("edit-author"),
    "getEditIsbn": () => document.getElementById("edit-isbn"),
    "getEditId": () => document.getElementById("edit-id")
};

const actions = {
    "load-books": async function () {
        try {
            const books = await get("appdata", "books");
            const booksContainer = htlm.getAllBooks();
            const fragment = document.createDocumentFragment();

            books
                .forEach(b => {
                    const tr = document.createElement("tr");
                    const titleTd = document.createElement("td");
                    const authorTd = document.createElement("td");
                    const isbnTd = document.createElement("td");
                    const actionsTd = document.createElement("td");
                    const editBtn = document.createElement("button");
                    const deleteBtn = document.createElement("button");

                    titleTd.textContent = b.title;
                    authorTd.textContent = b.author;
                    isbnTd.textContent = b.isbn;

                    editBtn.textContent = "Edit";
                    deleteBtn.textContent = "Delete";

                    editBtn.setAttribute("id", b._id);
                    deleteBtn.setAttribute("id", b._id);

                    editBtn.addEventListener("click", this["edit-book-get"]);
                    deleteBtn.addEventListener("click", this["delete-book"]);

                    actionsTd.append(editBtn, deleteBtn);

                    tr.append(titleTd, authorTd, isbnTd, actionsTd);
                    fragment.appendChild(tr);
                });

            booksContainer.innerHTML = "";
            booksContainer.appendChild(fragment);

        } catch (e) {
            console.error(e);
        }
    },
    "create-book": async function () {
        const $title = htlm.getTitle();
        const $author = htlm.getAuthor();
        const $isbn = htlm.getIsbn();

        if ($title !== null && $author !== null && $isbn !== null) {
            const data = {
                title: $title.value,
                author: $author.value,
                isbn: $isbn.value
            }
            try {
                await post("appdata", "books", data);

                $title.value = "";
                $author.value = "";
                $isbn.value = "";

                this["load-books"]();
            } catch (e) {
                console.error(e);
            }
        }

    },
    "delete-book": async function () {
        if (confirm("Are you sure you want to delete this book?")) {
            const id = this.id;
            try {
                await del("appdata", `books/${id}`);
                actions["load-books"]();
            } catch (e) {
                console.error(e);
            }
        }
        actions["load-books"]();
    },
    "edit-book-get": async function () {
        const id = this.id;
        try {
            const singleBook = await get("appdata", `books/${id}`);
            const $id = htlm.getEditId();
            const $title = htlm.getEditTitle();
            const $author = htlm.getEditAuthor();
            const $isbn = htlm.getEditIsbn();

            $title.value = singleBook.title;
            $author.value = singleBook.author;
            $isbn.value = singleBook.isbn;
            $id.value = singleBook._id;

        } catch (e) {
            console.error(e);
        }

    },
    "edit-book-post": async function () {
        const $id = htlm.getEditId();
        const $title = htlm.getEditTitle();
        const $author = htlm.getEditAuthor();
        const $isbn = htlm.getEditIsbn();

        if ($title !== null && $author !== null && $isbn !== null) {
            const data = {
                title: $title.value,
                author: $author.value,
                isbn: $isbn.value
            };

            try {
                const modifiedB = await put("appdata", `books/${$id.value}`, data);

                $title.value = "";
                $author.value = "";
                $isbn.value = "";

                actions["load-books"]();
            } catch (e) {
                console.error(e);
            }
        }
    },
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