const express = require('express');
const { getAllBill } = require('../controllers/billController');
const { handleLogin, getProfile, createUser } = require('../controllers/accountController');
const auth = require('../middleware/auth');
const { getAllStatus, updateTicket } = require('../controllers/statusController');
const { setActivity } = require('../controllers/activityController');
const routerAPI = express.Router();

routerAPI.get('/', (req, res) => {
    return res.status(200).json("hello would api");
})

routerAPI.all("*", auth);

routerAPI.get('/getAllBill', getAllBill);

routerAPI.post('/login', handleLogin);
routerAPI.get("/profile", getProfile);
routerAPI.post('/signup', createUser);

routerAPI.get('/getAllStatus', getAllStatus);
routerAPI.post('/updateStatus', updateTicket);

routerAPI.post("/setActivity", setActivity);

module.exports = routerAPI;