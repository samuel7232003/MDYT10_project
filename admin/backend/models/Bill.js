const mongoose = require('mongoose')

const billSchema = mongoose.Schema({
    idBill: String,
    name: String,
    phone: String,
    email: String,
    amount: Number,
    address: String,
    status: String,
    createAt: Number
})

const billModel = mongoose.model("Bill", billSchema)
module.exports = billModel