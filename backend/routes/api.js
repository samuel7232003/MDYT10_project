const express = require('express');
const { create_payment_url, vnpay_ipn } = require('../controllers/PaymentController');

const routerAPI = express.Router();


routerAPI.get('/', (req, res) => {
    return res.status(200).json("hello would api");
})


module.exports = routerAPI;