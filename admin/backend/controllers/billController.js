const { getAllBillService } = require("../services/billService");


const getAllBill = async(req, res) =>{
    try {
        const responce = await getAllBillService();
        res.json(responce);
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    getAllBill
}