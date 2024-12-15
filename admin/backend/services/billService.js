const billModel = require("../models/Bill");

const getAllBillService = async ()=>{
    try {
        const res = await billModel.find({status: "DONE"});
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getBill = async (idBill) =>{
    try {
        const res = await billModel.findOne({idBill: idBill});
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    getAllBillService, getBill
}