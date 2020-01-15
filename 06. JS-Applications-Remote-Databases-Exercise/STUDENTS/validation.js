import {
    html
} from "./html-const.js";

export function isFormValid() {
    const firstName = html.getFirstName();
    const lastName = html.getLastName();
    const facultyNumber = html.getFacultyNumber();
    const grade = html.getGrade();

    const firstNameErr = html.getFirstNameErr();
    const lastNameErr = html.getLastNameErr();
    const facNumErr = html.getFacNumErr();
    const gradeErr = html.getGradeErr();

    firstNameErr.textContent = "";
    lastNameErr.textContent = "";
    facNumErr.textContent = "";
    gradeErr.textContent = "";

    let errors = getErrMsg(firstName.value, lastName.value, facultyNumber.value, grade.value);

    if (Object.values(errors).find(el => el !== "")) {
        firstNameErr.textContent = errors.firstErr;
        lastNameErr.textContent = errors.lastErr;
        facNumErr.textContent = errors.fNumErr
        gradeErr.textContent = errors.gradeErr;
        return false;
    }

    return true;
}

function getErrMsg(first, last, fNum, grade) {
    let res = {
        firstErr: "",
        lastErr:"", 
        fNumErr:"",
        gradeErr:""
    };

    if (isNotValidName(first))  res.firstErr = "Invalid First Name!";

    if (isNotValidName(last)) res.lastErr = "Invalid Last Name!";

    if (fNum === null || fNum.trim() === "" || fNum.match(/\D/gm))  res.fNumErr= "Invalid faculty number!";

    if (grade === null || grade.trim() === "" || isNaN(grade)) res.gradeErr = "Invalid grade!";

    return res;
}

function isNotValidName(name) {
    if (name === null || name.trim() === "" || typeof name !== "string") {
        return true;
    }
    return false;
}