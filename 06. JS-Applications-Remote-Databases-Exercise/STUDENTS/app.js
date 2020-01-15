import {
    get,
    post
} from "./requester.js";

import {
    html
} from "./html-const.js";

import {
    isFormValid
} from "./validation.js";

const actions = {
    "load-students": async function () {
        try {
            const students = await get("appdata", "students");
            processHTML(students);
        } catch (e) {
            console.error(e)
        }
    },
    "create-student": function () {
        const $firstName = html.getFirstName();
        const $lastName = html.getLastName();
        const $facultyNumber = html.getFacultyNumber();
        const $grade = html.getGrade();

        if (isFormValid()) {
            const data = {
                id: html.getStudentId(),
                firstName: $firstName.value,
                lastName: $lastName.value,
                facultyNumber: $facultyNumber.value,
                grade: $grade.value
            }

            post("appdata", "students", data)
                .then(() => {
                    $firstName.value = "";
                    $lastName.value = "";
                    $facultyNumber.value = "";
                    $grade.value = "";

                })
                .then(() => {
                    actions["load-students"]();
                })
                .catch(e => {
                    console.error(e)
                })
        }

    }
}

function processHTML(students) {

    const studentsContainer = html.getAllStudents();
    const fragment = document.createDocumentFragment();
    students
        .sort((a, b) => a.id - b.id)
        .forEach(s => {
            const tr = document.createElement("tr");
            const idTd = document.createElement("td");
            const firstNameTd = document.createElement("td");
            const lastNameTd = document.createElement("td");
            const fNumberTd = document.createElement("td");
            const gradeTd = document.createElement("td");

            idTd.textContent = s.id;
            firstNameTd.textContent = s.firstName;
            lastNameTd.textContent = s.lastName;
            fNumberTd.textContent = s.facultyNumber;
            gradeTd.textContent = Number(s.grade).toFixed(2);

            tr.append(idTd, firstNameTd, lastNameTd, fNumberTd, gradeTd);
            fragment.appendChild(tr);
        });

    studentsContainer.innerHTML = "";
    studentsContainer.appendChild(fragment);
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

window.onload = function() {
    actions["load-students"]();
}