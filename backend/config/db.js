const mongoose = require('mongoose');

require('dotenv').config();
let Url = process.env.Url

const dbConnect = () => {
    mongoose.connect(Url)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log("Eroor in Connecting to DB"))
}

module.exports = dbConnect;