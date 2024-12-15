const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
    username: String,
    password: String,
    role: String,
})

const accountModel = mongoose.model("Account", accountSchema)
module.exports = accountModel