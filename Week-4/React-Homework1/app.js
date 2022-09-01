const axios = require("axios")

async function getData(user_id) {
    const getUser = await axios.get('https://jsonplaceholder.typicode.com/users/' + user_id)

    const postUser = await axios.get('https://jsonplaceholder.typicode.com/posts/' + user_id)

    console.log(getUser)
    console.log(postUser)

}

module.exports = getData