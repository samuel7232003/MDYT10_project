const { setBillService, deletePendingBillService } = require("../services/billService");
const { setTicketService, detelePendingTicketService } = require("../services/ticketService");

const setPending = async (req, res)=>{
    const data = req.body;
    const bill = {idBill: data.idBill, name: data.name, 
        phone: data.phone, email: data.email, 
        amount: data.amount, address: data.address,
        status: "PENDING",createAt: Date.now(),
    };
    const list= data.listSeat;
    const tickets = list.map(seat => ({
        name: data.name, phone: data.phone,
        email: data.email, idBill: data.idBill,
        seat: seat, status: "PENDING",
        isActive: "NONE", createAt: Date.now(),
    }));

    try {
        const responce = await setBillService(bill);
        const res_ = await setTicketService(tickets);
        res.json(responce);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteBill = async(req, res) =>{
    const {idBill} = req.query;
    try {
        const responce = await detelePendingTicketService(idBill);
        await deletePendingBillService(idBill);
        res.json(responce);
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    setPending, deleteBill
}