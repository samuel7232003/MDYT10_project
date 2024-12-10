const { createPaymentUrl, vnpayIpn } = require("../services/PaymentService");

const create_payment_url = async(req, res) => {

    const ipAddr =
      req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress ||
      req.socket?.remoteAddress;

    console.log(ipAddr);

    const res_ =  await createPaymentUrl(
      req.body.amount,
      req.body.orderId,
      req.body.orderDescription,
      req.body.orderType,
      req.body.language,
      ipAddr,
    );
    res.json({payment_url: res_});
  }
  
  const vnpay_ipn = async( req,body)=>{
    const reqQuery = req.query;
    const res = await vnpayIpn(reqQuery)
    console.log(res);
    return res;
  }

  module.exports = {
    create_payment_url, vnpay_ipn
  }