const express = require('express');

const routerAPI = express.Router();


routerAPI.get('/', (req, res) => {
    return res.status(200).json("hello would api");
})


module.exports = routerAPI;