const statusModel = require("../models/Status");

const getAllStatusService = async ()=>{
    try {
        const res = await statusModel.find();
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateTicketService = async (idBill, ticket)=>{
    try {
        const res = await statusModel.updateOne(
            {idBill: idBill},
            { $set: {tickets: ticket}}
        )
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const setStatusService = async (status)=>{
    try {
        const res = await statusModel.create(status);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    getAllStatusService, updateTicketService, setStatusService
}