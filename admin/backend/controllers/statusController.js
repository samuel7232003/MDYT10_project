const { getBill } = require("../services/billService");
const { getAllStatusService, updateTicketService, setStatusService } = require("../services/statusService");


const getAllStatus = async(req, res) =>{
    try {
        const responce = await getAllStatusService();
        res.json(responce);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateTicket = async(req, res)=>{
    try {
        const responce = await updateTicketService(req.body.idBill, req.body.ticket);
        if(responce.modifiedCount === 0) {
            const responce = await getBill(req.body.idBill);
            const data = {
                idBill: responce.idBill,
                numSeat: responce.amount / 50000,
                doneTicket: 0,
                tickets: req.body.ticket,
            }
            await setStatusService(data);
        }
        return responce;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    getAllStatus, updateTicket
}