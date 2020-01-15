export const html = {
    "getFirstName": () => document.getElementById("first-name"),
    "getLastName": () => document.getElementById("last-name"),
    "getFacultyNumber": () => document.getElementById("faculty-number"),
    "getGrade": () => document.getElementById("grade"),
    "getFirstNameErr": () => document.getElementById("first-name-err"),
    "getLastNameErr": () => document.getElementById("last-name-err"),
    "getFacNumErr": () => document.getElementById("faculty-number-err"),
    "getGradeErr": () => document.getElementById("grade-err"),
    "getAllStudents": () => document.getElementById("all-students"),
    "getStudentId": () => document.getElementsByTagName("tr").length
}