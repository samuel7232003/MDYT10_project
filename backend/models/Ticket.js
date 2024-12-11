const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    idBill: String,
    seat: String,
    status: String,
    isActive: String
})

const ticketModel = mongoose.model("Ticket", ticketSchema)
module.exports = ticketModel