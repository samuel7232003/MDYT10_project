require('dotenv').config();
const ConfigService = require('@nestjs/config').ConfigService;
const querystring = require('qs');
const crypto = require('crypto');

function VnpCardType(num){
    if(num === "None") return 0
    else if(num === "ATM") return 1
    else return 2
}

function formatDate(date, format){
  const yyyymmdd = date.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
  const hhmmss = date.toTimeString().slice(0, 8).replace(/:/g, ''); // HHMMSS
  return format === 'yyyymmddHHmmss' ? yyyymmdd + hhmmss : hhmmss;
}

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
}
const createPaymentUrl = async(
  amount,
  orderId,
  orderDescription,
  orderType,
  language,
  ipAddr
)=> {
  const tmnCode = process.env.VNP_TMNCODE;
  const secretKey = process.env.VNP_HASHSECRET;
  const vnpUrl = process.env.VNP_URL;
  let returnUrl = process.env.VNP_RETURNURL;

  const date = new Date();
  const createDate = formatDate(date, 'yyyymmddHHmmss');
  const locale = language || 'vn';
  const currCode = 'VND';

  const vnp_Params={
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: currCode,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderDescription,
    vnp_OrderType: orderType,
    vnp_Amount: (amount * 100).toString(),
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };
  console.log('3');

  const sortedParams = sortObject(vnp_Params);

  // Sign the data
  const signData = querystring.stringify(sortedParams, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
  sortedParams['vnp_SecureHash'] = signed;

  // Create the URL
  const res = `${vnpUrl}?${querystring.stringify(sortedParams, { encode: false })}`;

  return res;
}

const vnpayIpn = async (reqQuery) => {
    console.log('helloooo');
    let vnp_Params = reqQuery;
    let secureHash = vnp_Params['vnp_SecureHash'];

    let orderId = vnp_Params['vnp_TxnRef'];
    let rspCode = vnp_Params['vnp_ResponseCode'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    let secretKey = configService.get('vnp_HashSecret');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    let paymentStatus = '0'; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
    //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
    //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó
    //Kiểm tra có đúng order id không
    // let checkOrderId = true;
    // let order;
    // try {
    //   order = await this.orderService.findOne(orderId);
    // } catch (error) {
    //   return {
    //     statusCode: HttpStatus.OK,
    //     message: 'Order not found',
    //   };
    // }
    // console.log('order = ', order);
    // console.log('order total value ', order.total_value);
    // // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
    // let checkAmount =
    //   order.total_value == parseFloat(vnp_Params['vnp_Amount']) / 100;
    if (secureHash === signed) {
      //kiểm tra checksum
      // if (checkOrderId) {
      //   if (checkAmount) {
          if (paymentStatus == '0') {
            //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
            if (rspCode == '00') {
              //thanh cong
              //paymentStatus = '1'
              // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
              const payment = await this.create({
                payment_method: 2,
                vnp_amount: parseFloat(vnp_Params['vnp_Amount']) / 100,
                vnp_bank_code: vnp_Params['vnp_BankCode'],
                vnp_bank_tran_no: vnp_Params['vnp_BankTranNo'],
                vnp_card_type:VnpCardType(vnp_Params['vnp_CardType']),
                vnp_order_info: vnp_Params['vnp_BankTranNo'],
                vnp_paydate: vnp_Params['vnp_PayDate'],
                vnp_response_code: vnp_Params['vnp_ResponseCode'],
                vnp_transaction_no: vnp_Params['vnp_TransactionNo'],
                vnp_transaction_status: vnp_Params['vnp_TransactionStatus'],
              });
              
              return {
                statusCode: HttpStatus.OK,
                message: 'Thành công!',
              };
            } else {
              //that bai
              //paymentStatus = '2'
              // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
              return {
                statusCode: HttpStatus.OK,
                message: 'Thất bại',
              };
            }
          } else {
            return {
              statusCode: HttpStatus.OK,
              message: 'This order has been updated to the payment status',
            };
          }
        } else {
          return {
            statusCode: HttpStatus.OK,
            message: 'Amount invalid',
          };
        }
    //   } else {
    //     return {
    //       statusCode: HttpStatus.OK,
    //       message: 'Order not found',
    //     };
    //   }
    // } else {
    //   return {
    //     statusCode: HttpStatus.OK,
    //     message: 'Checksum failed!',
    //   };
    // }
  }

  // Format date helper function
function  formatDate(date, format){
    const yyyymmdd = date.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
    const hhmmss = date.toTimeString().slice(0, 8).replace(/:/g, ''); // HHMMSS
    return format === 'yyyymmddHHmmss' ? yyyymmdd + hhmmss : hhmmss;
  }

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
  }

module.exports = {
    createPaymentUrl, vnpayIpn
}