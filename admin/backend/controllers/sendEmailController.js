const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
require('punycode');

const GOOGLE_MAILER_CLIENT_ID = "987725906036-r3u1t5k3dfosr7sg75a8736u3rfrev7i.apps.googleusercontent.com"
const GOOGLE_MAILER_CLIENT_SECRET = "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"
const GOOGLE_MAILER_REFRESH_TOKEN = "1//04C06z5lb7QGrCgYIARAAGAQSNwF-L9IrLGJJ38R8SoKbrQTnQCzbuGFV3U2NiDOyokaZgzOt51dx4svOKY2b_MywXMZ_GrT7et8"
const ADMIN_EMAIL_ADDRESS = 'ticketbintech@gmail.com'

const myOAuth2Client = new OAuth2Client(
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET
)
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
})
// Tạo API /email/send với method POST
const sendemail = async (req, res) => {
  try {
    // Lấy thông tin gửi lên từ client qua body
    const { email, subject, content } = req.body
    if (!email || !subject || !content) throw new Error('Please provide email, subject and content!')
    /**
     * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
     * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
     */
    const myAccessTokenObject = await myOAuth2Client.getAccessToken()
    // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
    const myAccessToken = myAccessTokenObject?.token
    // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
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
    // mailOption là những thông tin gửi từ phía client lên thông qua API
    const mailOptions = {
      to: email, // Gửi đến ai?
      subject: subject, // Tiêu đề email
      html:  `
      <h3>Xác nhận vé đã đặt thành công!</h3>
      <p>Chúng tôi xin thông báo rằng vé của bạn đã được đặt thành công. Dưới đây là các thông tin liên quan đến đơn hàng của bạn:</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Tên:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${content}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Số điện thoại:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">0332281587</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Địa chỉ nhận vé:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">123 Âu Cơ</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Số lượng vé:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">4</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Mã thanh toán:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">1234512345</td>
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
    // Gọi hành động gửi email
    await transport.sendMail(mailOptions)
    // Không có lỗi gì thì trả về success
    res.status(200).json({ message: 'Email sent successfully.' })
  } catch (error) {
    // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client
    console.log(error)
    res.status(500).json({ errors: error.message })
  }
};

module.exports = {
    sendemail
}