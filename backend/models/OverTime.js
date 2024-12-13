const mongoose = require('mongoose')

const overTimeSchema = mongoose.Schema({
    name: String,
    numAccount: String,
    infor: String,
    time: String,
    amount: Number
})

const overTimeModel = mongoose.model("OverTime", overTimeSchema)
module.exports = overTimeModel