const { setTicketService, getAllTicketService } = require("../services/ticketService");

const setTicket = async (req, res)=>{
    const list= req.body.listSeat;
    const tickets = list.map(seat => ({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        idBill: req.body.idBill,
        seat: seat,
        status: "PENDING",
        isActive: "NONE",
        createAt: Date.now(),
    }));

    try {
        const responce = await setTicketService(tickets);
        res.json(responce);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getAllTicket = async(req, res) =>{
    try {
        const responce = await getAllTicketService();
        res.json(responce);
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    setTicket, getAllTicket
}