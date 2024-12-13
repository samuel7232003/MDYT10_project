import './footer.css'
import logo from './images/image 3.png'
import fb_icon from './images/Social=Facebook,Style=Black.png'
import gg_icon from './images/Social=Gmail,Style=Black.png'
import ig_icon from './images/Social=Instagram,Style=Black.png'
import hsv_logo from "./images/hsv.png"
import doan_logo from "./images/Huy_Hiệu_Đoàn.png"
import bkdn_logo from "./images/bkdn.png"
import anhtu_logo from "./images/anhtu.png"

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
                    <div className='logo'>
                        <figure style={{borderRadius: "100px", overflow: "hidden"}}><img src={hsv_logo} alt="" /></figure>
                        <figure><img src={bkdn_logo} alt="" /></figure>
                        <figure><img src={doan_logo} alt="" /></figure>
                    </div>
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
                    <div className='contact'>
                        <figure><img src={ig_icon} alt="" /></figure>
                        <a href='https://www.instagram.com/guitarsvdanang'>guitarsvdanang</a>
                    </div>
                </div>
            </div>
            <div className='project'>
                <div className='title'>
                    <p>Dự án “Mùa Đông Yêu Thương 10”</p>
                </div>
                <div className='infor'>
                    <p className='sub-title'>Đơn vị đồng hành</p>
                    <div className='logo'>
                        <figure style={{borderRadius: "5px", overflow: "hidden"}}><img src={anhtu_logo} alt="" /></figure>
                    </div>
                </div>
                <div className='infor'>
                    <p className='sub-title'>Liên hệ</p>
                    <p className='text'>Nguyễn Quang Nghĩa (Chủ nhiệm) - 0844929747</p>
                    <p className='text'>Nguyễn Đăng Quang (Phó chủ nhiệm)</p>
                    <p className='text'>Nguyễn Xuân Thịnh (Phó chủ nhiệm)</p>
                    <p className='text'>Trần Minh Hải (Phó chủ nhiệm)</p>
                </div>
            </div>
        </footer>
    )
}