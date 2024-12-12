const billModel = require("../models/Bill");

const setBillService = async (bill)=>{
    try {
        const res = await billModel.create(bill);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const setDoneBillService = async (idBill)=>{
    try {
        const responce = await billModel.updateOne(
            {idBill: idBill},
            { $set: {status: "DONE"}}
        )
        return responce;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deletePendingBillService = async (idBill) =>{
    try {
        const res_ = await billModel.deleteOne({idBill: idBill, status: "PENDING"});
        return res_;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    setBillService, setDoneBillService, deletePendingBillService
}