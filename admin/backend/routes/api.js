const express = require('express');
const { getAllBill } = require('../controllers/billController');
const routerAPI = express.Router();


routerAPI.get('/', (req, res) => {
    return res.status(200).json("hello would api");
})

routerAPI.get('/getAllBill', getAllBill);

module.exports = routerAPI;