const ticketModel = require("../models/Tickets");

const getTicketService = async (idBill)=>{
    try {
        const res = await ticketModel.find({idBill: idBill});
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateActive = async (idTicket, mave)=>{
    try {
        const res = await ticketModel.updateOne(
            {_id: idTicket},
            { $set: {isActive: mave}}
        );
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getAllTicketService = async ()=>{
    try {
        const res = await ticketModel.find();
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const checkinService = async (id)=>{
    try {
        const res = await ticketModel.updateOne(
            {_id: id},
            { $set: {status: "CHECKED"}}
        )
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    getTicketService, updateActive, getAllTicketService, checkinService
}