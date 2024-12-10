import './formbook.css'
import time_icon from './images/Calendar.png'
import location_icon from './images/Map.png'
import price_icon from './images/Ticket_use.png'
import name_icon from './images/User_alt.png'
import phone_icon from './images/Phone.png'
import email_icon from './images/Message.png'
import { useAppDispatch, useAppSelector } from '../../redux/builder'
import { useEffect, useState } from 'react'
import { setUser } from '../../redux/user/user.action'
import { message } from 'antd'

export default function FormBook(){
    const user = useAppSelector(state => state.user.user);
    const dispatch = useAppDispatch();

    const [userInfor, setUserInfor] = useState(user);

    useEffect(() => {
        setUserInfor({...userInfor, listSeat: user.listSeat});
    }, [user.listSeat])

    function handleChange(type: string, value: string){
        setUserInfor({...userInfor, [type]: value.trim()});
    }

    function handleRemove(seat :string){
        const list = userInfor.listSeat.filter(index => index !== seat);
        dispatch(setUser({...user, listSeat: list}));
    }

    function handleSave(){
        if(userInfor.phone === "") message.error("Không được bỏ trống số điện thoại!");
        else if (userInfor.email === "") message.error("Không được bỏ trống email!");
        else if (userInfor.listSeat.length === 0) message.error("Bạn chưa chọn vị trí xem nào!");
        else {
            console.log(userInfor);
            message.success("Thành công!");
        }
    }

    return(
        <div className="formbook">
            <div className='infor'>
                <p className="title">Đêm nhạc gây quỹ<br/><i>“Mùa Đông Yêu Thương 10”</i></p>
                <div className="detail">
                    <div className="item">
                        <figure><img src={time_icon} alt="" /></figure>
                        <p className="sub-title">Thời gian:</p>
                        <p className="content">Từ 5h00 đến 22h00 ngày 4/1/2025</p>
                    </div>
                    <div className="item">
                        <figure><img src={location_icon} alt="" /></figure>
                        <p className="sub-title">Địa điểm:</p>
                        <p className="content">Sân Nhà thi đấu, Trung tâm Giáo dục thể chất, Đại học Đà Nẵng. </p>
                    </div>
                    <div className="item">
                        <figure><img src={price_icon} alt="" /></figure>
                        <p className="sub-title">Giá vé:</p>
                        <p className="content">50.000 VNĐ / 1 vé</p>
                    </div>
                </div>
            </div>
            <div className="form">
                <p className="title">Thông tin đặt vé</p>
                <div className='detail'>
                    <div className='item'>
                        <figure><img src={name_icon} alt="" /></figure>
                        <p className='sub-title'>Họ và tên:</p>
                        <fieldset><input type="text" onChange={e => handleChange("name", e.target.value)} /></fieldset>
                    </div>
                    <div className='item'>
                        <figure><img src={phone_icon} alt="" /></figure>
                        <p className='sub-title'>Số điện thoại*:</p>
                        <fieldset><input type="tel" onChange={e => handleChange("phone", e.target.value)} /></fieldset>
                    </div>
                    <div className='item'>
                        <figure><img src={email_icon} alt="" /></figure>
                        <p className='sub-title'>Email*:</p>
                        <fieldset><input type="email" onChange={e => handleChange("email", e.target.value)}/></fieldset>
                    </div>
                    <p className='note'><b>*Lưu ý:</b> Chúng mình sẽ gửi vé qua địa chỉ email của bạn, hãy nhập chính xác và kiểm tra lại trước khi đặt nhé!</p>
                    <div className='item'>
                        <figure><img src={price_icon} alt="" /></figure>
                        <p className='sub-title'>Vị trí đã chọn*:</p>
                        <div>
                            <ul>{userInfor.listSeat.map(index => <li key={index} onClick={() => handleRemove(index)}>{index}</li>)}</ul>
                        </div>
                    </div>
                    <p className='note'>*Bạn hãy chọn trực tiếp những vị trí trên sơ đồ.</p>
                </div>
                <p className='btn-submit' onClick={handleSave}>Thanh toán</p>
            </div>
        </div>
    )
}