import './footer.css'
import logo from './images/image 3.png'
import fb_icon from './images/facebook.png'
import gg_icon from './images/google.png'

export default function Footer(){
    return (
        <footer>
            <figure className='logo'><img src={logo} alt="" /></figure>
            <div className='clb'>
                <div className='title'>
                    <p>CLB GUITAR SINH VIÊN ĐÀ NẴNG</p>
                </div>
                <div className='infor'>
                    <p className='sub-title'>Đơn vị chủ quản</p>
                    <ul></ul>
                </div>
                <div className='infor'>
                    <p className='sub-title'>Thông tin truyền thông</p>
                    <div className='contact'>
                        <figure><img src={fb_icon} alt="" /></figure>
                        <a href='https://www.facebook.com/guitarsvdn29'>https://www.facebook.com/guitarsvdn29</a>
                    </div>
                    <div className='contact'>
                        <figure><img src={gg_icon} alt="" /></figure>
                        <a href='mailto:guitarsvdanang@gmail.com'>guitarsvdanang@gmail.com</a>
                    </div>
                </div>
            </div>
            <div className='project'>
                <div className='title'>
                    <p>Dự án “Mùa Đông Yêu Thương 10”</p>
                </div>
                <div className='infor'>
                    <p className='sub-title'>Nhà tài trợ</p>
                    <ul></ul>
                </div>
                <div className='infor'>
                    <p className='sub-title'>Liên hệ</p>
                    <p className='text'>Nguyễn Văn A (Chủ nhiệm) - 0123456789</p>
                    <p className='text'>Nguyễn Văn A (Phó chủ nhiệm) - 0123456789</p>
                    <p className='text'>Nguyễn Văn A (Phó chủ nhiệm) - 0123456789</p>
                    <p className='text'>Nguyễn Văn A (Phó chủ nhiệm) - 0123456789</p>
                </div>
            </div>
        </footer>
    )
}