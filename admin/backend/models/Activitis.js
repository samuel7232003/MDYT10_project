const mongoose = require('mongoose')

const activitySchema = mongoose.Schema({
    username: String,
    type: String,
    time: String,
    idBill: String
})

const activityModel = mongoose.model("Activity", activitySchema)
module.exports = activityModel