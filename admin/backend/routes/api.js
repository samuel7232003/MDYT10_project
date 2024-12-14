const express = require('express');
const { getAllBill } = require('../controllers/billController');
const { sendemail } = require('../controllers/sendEmailController');
const routerAPI = express.Router();


routerAPI.get('/', (req, res) => {
    return res.status(200).json("hello would api");
})

routerAPI.get('/getAllBill', getAllBill);

routerAPI.post("/sendemail", sendemail);

module.exports = routerAPI;