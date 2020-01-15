let arr = [{id: 15}, {id: 28}, {id: 97}, {id:4}];

let getId = (function () {
    let count = 0;
    return function () {
        return ++count;
    }
}());

console.log(getId());
console.log(getId());
console.log(getId());
console.log(getId());
console.log(getId());
arr.sort((a,b) => a.id - b.id);
console.log(arr)

// let getId = (function () {
//     let count = 0;
//     return function () {
//         return ++count;
//     }
// }());

