require('dotenv').config();
const crypto = require("crypto");
const { createLinkService } = require('../services/payosService');
const { setDoneTicketService } = require('../services/ticketService');
const { setDoneBillService, getBill } = require('../services/billService');
const { createOverTimeService } = require('../services/overTimeService');
const { sendemail } = require('./sendEmailController');

const createPaymaentUrl = async(req, res)=>{
    const YOUR_DOMAIN = process.env.DOMAIN;
    const body = {
        orderCode: Number(String(Date.now()).slice(-6)),
        amount: req.body.amount,
        description: req.body.phone+" thanh toan",
        infor: {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            listSeat: req.body.listSeat,
        },
        returnUrl: `${YOUR_DOMAIN}`,
        cancelUrl: `${YOUR_DOMAIN}`,
        expiredAt: Math.floor((Date.now() + 300000)/1000)
    };

    try {
        const url = await createLinkService(body);
        res.send(url);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const onStatusPayment = async (req, res) =>{
    const webhookData = req.body; 
    const orderCode = webhookData.data.orderCode; 
    const status = webhookData.desc;  

    console.log(webhookData);
    const isValid = isValidData(webhookData.data, webhookData.signature, process.env.PAYOS_CHECKSUM_KEY);
  
    if (!isValid) {
        console.log("Webhook signature verification failed");
        return res.status(400).send("Invalid signature");
    }

    if (status === "success") {
        const res = await setDoneTicketService(orderCode);
        await setDoneBillService(orderCode);

        const data = {
            name: webhookData.data.counterAccountName,
            numAccount: webhookData.data.counterAccountNumber,
            infor: webhookData.data.description,
            time: webhookData.data.transactionDateTime,
            amount: webhookData.data.amoun,
        }
        if(res.modifiedCount === 0) await createOverTimeService(data);
        else{
            const bill = await getBill(orderCode);
            console.log(bill);
            await sendemail(bill);
        }

    } else {
        console.log(`Giao dịch ${orderCode} thất bại`);
    }
  
    res.status(200).send("Received successfully");
}

module.exports ={
    createPaymaentUrl, onStatusPayment
}

function sortObjDataByKey(object) {
    const orderedObject = Object.keys(object)
        .sort()
        .reduce((obj, key) => {
            obj[key] = object[key];
            return obj;
        }, {});
    return orderedObject;
}

function convertObjToQueryStr(object) {
    return Object.keys(object)
        .filter((key) => object[key] !== undefined)
        .map((key) => {
            let value = object[key];
            // Sort nested object
            if (value && Array.isArray(value)) {
                value = JSON.stringify(value.map((val) => sortObjDataByKey(val)));
            }
            // Set empty string if null
            if ([null, undefined, "undefined", "null"].includes(value)) {
                value = "";
            }
            return `${key}=${value}`;
        })
        .join("&");
}

function isValidData(data, currentSignature, checksumKey) {
    const sortedDataByKey = sortObjDataByKey(data);
    const dataQueryStr = convertObjToQueryStr(sortedDataByKey);
    const dataToSignature = crypto.createHmac("sha256", checksumKey)
        .update(dataQueryStr)
        .digest("hex");
    return dataToSignature == currentSignature;
}

