const ticketModel = require("../models/Ticket");

const setTicketService = async (tickets)=>{
    try {
        const res = await ticketModel.insertMany(tickets);
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

const setDoneTicketService = async (idBill)=>{
    try {
        const responce = await ticketModel.updateMany(
            {idBill: idBill},
            { $set: {status: "DONE"}}
        )
        return responce;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const detelePendingTicketService = async (idBill) => {
    try {
        const res_ = await ticketModel.deleteMany({idBill: idBill, status: "PENDING"});
        return res_;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteOutTimeTicketService = async (time) => {
    try {
        const res_ = await ticketModel.deleteMany({status: "PENDING", createAt: {$lt: time} });
        return res_;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    setTicketService, getAllTicketService, setDoneTicketService, detelePendingTicketService, deleteOutTimeTicketService
}