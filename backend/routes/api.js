const express = require('express');
const { createPaymaentUrl, onStatusPayment } = require('../controllers/payosController');
const { setPending, deleteBill, deleteOutTime } = require('../controllers/billController');
const { getAllTicket } = require('../controllers/ticketController');
const routerAPI = express.Router();


routerAPI.get('/', (req, res) => {
    return res.status(200).json("hello would api");
})

routerAPI.post("/create-embedded-payment-link", createPaymaentUrl);
routerAPI.post("/payment-status", onStatusPayment);

routerAPI.post("/setPending", setPending);
routerAPI.get("/deleteBill", deleteBill);
routerAPI.get("/deleteOutTime", deleteOutTime);

routerAPI.get("/getSeat", getAllTicket);

module.exports = routerAPI;