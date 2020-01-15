export function getElems() {
    return {
        $catches: () => document.getElementById("catches"),
        $addForm: () => document.getElementById("addForm"),
        $addBtn: () => document.getElementById("addBtn"),
        $loadBtn: () => document.getElementById("loadBtn"),
        $exampleCatch: () => document.querySelector("div.catch")
    }
}