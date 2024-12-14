require('dotenv').config();
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
require('punycode');

const GOOGLE_MAILER_CLIENT_ID = process.env.GOOGLE_MAILER_CLIENT_ID
const GOOGLE_MAILER_CLIENT_SECRET = process.env.GOOGLE_MAILER_CLIENT_SECRET
const GOOGLE_MAILER_REFRESH_TOKEN = process.env.GOOGLE_MAILER_REFRESH_TOKEN 
const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS

const myOAuth2Client = new OAuth2Client(
    GOOGLE_MAILER_CLIENT_ID,
    GOOGLE_MAILER_CLIENT_SECRET
)

myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
})

const sendemail = async (data) => {
    try {
        const num = data.amount / 50000;
        const myAccessTokenObject = await myOAuth2Client.getAccessToken()
        const myAccessToken = myAccessTokenObject?.token

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: ADMIN_EMAIL_ADDRESS,
                clientId: GOOGLE_MAILER_CLIENT_ID,
                clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
                refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
                accessToken: myAccessToken
            }
        })

        const mailOptions = {
            to: data.email, // Gửi đến ai?
            subject: "[MÙA ĐÔNG YÊU THƯƠNG 10] XÁC NHẬN ĐẶT VÉ THÀNH CÔNG!", // Tiêu đề email
            html:  `
                <h3>Xác nhận vé đã đặt thành công!</h3>
                <p>Chúng tôi xin thông báo rằng vé của bạn đã được đặt thành công. Dưới đây là các thông tin liên quan đến đơn hàng của bạn:</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Tên:</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.name}</td>
                    </tr>
                    <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Số điện thoại:</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.phone}</td>
                    </tr>
                    <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Địa chỉ nhận vé:</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.address}</td>
                    </tr>
                    <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Số lượng vé:</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${num}</td>
                    </tr>
                    <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Mã thanh toán:</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.idBill}</td>
                    </tr>
                </table>
                <p>Xin cảm ơn bạn đã đặt vé! Chúng tôi sẽ liên lạc và gửi vé trực tiếp đi sớm nhất!</p>

                <hr />
                <p style="font-style: italic; color: gray;">Trân trọng,</p>
                <p style="font-weight: bold; color: #333;">CLB GUITAR SINH VIÊN ĐÀ NẴNG</p>
                <p style="color: #333;">Email: guitarsvdanang@email.com</p>
                <p style="color: #333;">Liên hệ: 0844929747 - Nguyễn Quang Nghĩa (Chủ nhiệm) </p>
            `
        }
        
        await transport.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    sendemail
}