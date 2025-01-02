const { getTicketService, updateActive, getAllTicketService, checkinService } = require("../services/ticketService");

const getTicket = async(req, res) =>{
    const {idBill} = req.query;
    try {
        const responce = await getTicketService(idBill);
        res.json(responce);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateStatus = async(req, res) =>{
    const idTicket = req.body._id;
    const mave = req.body.mave;
    try {
        const responce = await updateActive(idTicket, mave);
        res.json(responce);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getAllTicket = async(req, res) => {
    try {
        const responce = await getAllTicketService();
        res.json(responce);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const checkin = async(req, res) =>{
    const {id} = req.query;
    try {
        const responce = await checkinService(id);
        res.json(responce);
    } catch (error) {
        console.log(error);
        return null;
    }
}  

module.exports = {
    getTicket, updateStatus, getAllTicket, checkin
}