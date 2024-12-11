const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const PayOS = require("@payos/node");
const billModel = require("./models/Bill");
const connectDB = require('./config/database');
const ticketModel = require("./models/Ticket");

const app = express();

dotenv.config();
const payOS = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);

const port = process.env.PORT

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/create-embedded-payment-link", async (req, res) => {

  const YOUR_DOMAIN = process.env.DOMAIN;
  const body = {
    orderCode: Number(String(Date.now()).slice(-6)),
    amount: req.body.amount,
    description: "Thanh toan don hang",
    infor: {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        listSeat: req.body.listSeat,
    },
    returnUrl: `${YOUR_DOMAIN}`,
    cancelUrl: `${YOUR_DOMAIN}`,
  };

  try {
    const paymentLinkResponse = await payOS.createPaymentLink(body);
    res.send(paymentLinkResponse)
  } catch (error) {
    console.error(error);
    res.send("Something went error");
  }
})

app.get("/check-payment-status", async (req, res) => {
    const orderCode = req.query.orderCode;
  
    try {
      const paymentStatus = await payOS.checkPaymentStatus(orderCode);
  
      if (paymentStatus.status === 'SUCCESS') {
        res.send("Giao dịch thành công");
      } else {
        res.send("Giao dịch thất bại");
      }
    } catch (error) {
      console.error(error);
      res.send("Không thể kiểm tra trạng thái giao dịch");
    }
});

app.post("/setBill", async (req, res) =>{
    try {
        const res = await billModel.create({
            idBill:req.body.idBill,
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            amount: req.body.amount,
            address: req.body.address
        })
        return res;
    } catch (error) {
        return null;
    }
})

app.post("/setTiket", async (req, res) => { 
    try{
        const list= req.body.listSeat;
        const tickets = list.map(seat => ({
          name: req.body.name,
          phone: req.body.phone,
          email: req.body.email,
          idBill: req.body.idBill,
          seat: seat,
          status: "PENDING",
          isActive: "NONE"
      }));
      
      await ticketModel.insertMany(tickets);

        return res;
    } catch(error){
        return null;
    }
})

app.get("/getSeat", async(req, res) => {
    try {
        const responce = await ticketModel.find();
        res.json({data: responce});
    } catch (error) {
      return null;
    }
})

app.get("/doneBill", async (req, res) => {
    const {idBill} = req.query;
    try {
        const responce = await ticketModel.updateMany(
            {idBill: idBill},
            { $set: {status: "DONE"}}
        )
        return responce;
    } catch (error) {
        return null
    }
})

app.get("/deleteBill", async(req, res) => {
    const {idBill} = req.query;
    try {
        const res_ = await ticketModel.deleteMany({idBill: idBill, status: "PENDING"});
        return res_;
    } catch (error) {
        return null;
    }
})


app.post("/payment-status", (req, res) => {
    const webhookData = req.body;  // Dữ liệu webhook gửi đến từ PayOS
    const orderCode = webhookData.orderCode;  // Mã đơn hàng
    const status = webhookData.status;  // Trạng thái thanh toán (thành công, thất bại, v.v...)
    const signature = webhookData.signature;  // Chữ ký dùng để xác thực thông báo
  
    // Kiểm tra chữ ký để xác thực nguồn gốc của thông báo (thông thường sẽ dùng một thuật toán mã hóa như HMAC SHA256)
    const isValid = verifyWebhookSignature(webhookData, signature);
  
    if (!isValid) {
      console.log("Webhook signature verification failed");
      return res.status(400).send("Invalid signature");
    }
  
    // Kiểm tra trạng thái giao dịch
    if (status === "SUCCESS") {
      console.log(`Giao dịch ${orderCode} thành công`);
      // Cập nhật trạng thái giao dịch vào cơ sở dữ liệu
    } else {
      console.log(`Giao dịch ${orderCode} thất bại`);
      // Cập nhật trạng thái giao dịch vào cơ sở dữ liệu
    }
  
    res.status(200).send("Received successfully");
  });
  
  // Hàm xác thực chữ ký của Webhook
  function verifyWebhookSignature(data, receivedSignature) {
    const dataToVerify = JSON.stringify(data);
    const expectedSignature = generateSignature(dataToVerify);
  
    return receivedSignature === expectedSignature;
  }
  
  // Hàm tạo chữ ký từ dữ liệu
  function generateSignature(data) {
    const crypto = require("crypto");
    const hmac = crypto.createHmac("sha256", process.env.PAYOS_CHECKSUM_KEY);
    hmac.update(data);
    return hmac.digest("hex");
}

const startServer = async () => {
    try {
        await connectDB();

        app.listen(port, () => {
            console.log(`Backend Nodejs App listening on port ${port}`);
        });

    } catch (error) {
        console.log(">>> Error connecting to DB:", error);
    }
};

startServer();