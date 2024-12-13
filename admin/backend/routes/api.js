const express = require('express');
const { getAllBillService } = require('../services/billService');
const routerAPI = express.Router();


routerAPI.get('/', (req, res) => {
    return res.status(200).json("hello would api");
})

routerAPI.get('/getAllBill', getAllBillService);

module.exports = routerAPI;