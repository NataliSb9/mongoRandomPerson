
const fetch = require("node-fetch");
let User = require('./usersSchema');


async function getUsers() {
    await fetch("https://randomuser.me/api/?results=1")
      .then((results) => {
        return results.text();
    })
      .then((data) => {
        data = JSON.parse(data)
        console.log(data.results[0])
        // Access your data here
    });
}

 
console.log(getUsers())

// const apiData = () => {
//     fetch(url)
//       .then((res) => {
//         return res.json()
//     }).then((data) => {
//         fetchedData(data)
//     })
// }

// fetchedData = (apiData) => {
//   console.log(apiData)
// }