const mongoose = require('mongoose')

const statusSchema = mongoose.Schema({
    idBill: String,
    numSeat: Number,
    doneTicket: Number,
    tickets: String,
})

const statusModel = mongoose.model("Status", statusSchema)
module.exports = statusModel