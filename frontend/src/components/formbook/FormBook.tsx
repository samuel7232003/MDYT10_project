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
import { PayOSConfig, usePayOS } from "@payos/payos-checkout";
import { doPayment, savePending, setFail } from '../../services/PaymentServices'
import check_done from './images/Check_round_fill.png'
import { getListSeat } from '../../redux/seat/seat.action'

interface Props{
    setPayMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FormBook({setPayMode}:Props){
    const user = useAppSelector(state => state.user.user);
    const listSeatBook = useAppSelector(state => state.seat.listSeat);
    const dispatch = useAppDispatch();

    const [userInfor, setUserInfor] = useState(user);
    const [idBill, setIdBill] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [waitOpenLink, setWaitOpenLink] = useState(false);
    const [payOSConfig, setPayOSConfig] = useState<PayOSConfig>({
        RETURN_URL: window.location.origin, 
        ELEMENT_ID: "embedded-payment-container",
        CHECKOUT_URL: "",
        embedded: true,
        onSuccess: (e:any) => {handleSuccess()},
        onExit: (e:any) => {handleTimeOut()},
    });
    const { open, exit } = usePayOS(payOSConfig);

    //Update ListSeat
    useEffect(() => {
        setUserInfor({...userInfor, listSeat: user.listSeat});
        // eslint-disable-next-line
    }, [user.listSeat]);

    //Buoc 2: Khi dữ liệu về, thì kiểm tra nếu okie thì lấy link payment
    useEffect(()=>{
        if(waitOpenLink === true){
            setWaitOpenLink(false);
            let check = true;
            let listRemove:string[] = [];
            for(let i = 0; i< userInfor.listSeat.length; i++){
                const seat = listSeatBook.find(index => index.name === userInfor.listSeat[i]);
                if(seat){
                    message.error("Vị trí " + seat.name + " đã được đặt, vui lòng chọn vị trí khác!");
                    check = false;
                    listRemove.push(seat.name);
                }
            }
            const newList = userInfor.listSeat.filter(item => !listRemove.includes(item));
            dispatch(setUser({...userInfor, listSeat: newList}));

            if(check === true){
                message.loading("Thực hiện thanh toán...");
                handleGetPaymentLink();
            }
        }
        // eslint-disable-next-line
    },[listSeatBook])

    //Bước 4: Kiểm tra đã có link checkout chưa mới mở linklink
    useEffect(() => {
        if (payOSConfig.CHECKOUT_URL && isOpen){
            open();
            setTimeLeft(180);
            setPayMode(true);
            message.info("Vị trí chỉ sẽ được giữ cho bạn trong 3 phút, vui lòng thanh toán trong khoảng thời gian này!");
        }
        // eslint-disable-next-line
    }, [payOSConfig]);

    function reset(){
        setPayMode(false);
        dispatch(setUser({...userInfor, listSeat: []}));
        setIdBill("");
        fetchDataSeat();
    }

    //Buoc 1: Validate & kiem tra du lieu moi nhat
    function checkStill(){
        if(userInfor.phone.trim() === "") message.error("Không được bỏ trống số điện thoại!");
        else if (userInfor.email.trim() === "") message.error("Không được bỏ trống email!");
        else if (userInfor.address.trim() === "") message.error("Không được bỏ trống địa chỉ nhận vé!");
        else if (userInfor.listSeat.length === 0) message.error("Bạn chưa chọn vị trí xem nào!");
        else {
            setWaitOpenLink(true);
            fetchDataSeat();
        }
    }

    //Bước 3: Lấy link thanh toán, lưu idBill, cập nhật Pending cho danh sách ghế, mở link thanh toán.
    const handleGetPaymentLink = async () => {
        const response = await doPayment(userInfor);
        setIsOpen(true);
        setPayOSConfig((oldConfig) => ({
            ...oldConfig,
            CHECKOUT_URL: response.checkoutUrl,
        }));

        setIdBill(response.orderCode);
        localStorage.setItem("idBill", response.orderCode);
        const fetchData = async ()=>{
            try {
                await savePending(userInfor, response.orderCode);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    };

    //Bước 5_(1): Khi hệ thống nhận thấy đã thanh toán thành công, xóa idBill, chuyển giao diện thành công!
    function handleSuccess(){
        message.success("Thanh toán thành công!");
        setIsOpen(false);
        setIsSuccess(true);
    }

    //Bước 5_(2): Khi quá thời gian 3 phút, reset dữ liệu tương tự 5_(3) quay lại bước 0
    function handleTimeOut(){
        message.error("Hết thời gian chờ thanh toán!");
        setIsOpen(false);
        const setFailBill = async(id_: string)=>{
            try {
                await setFail(id_);
            } catch (error) {
                console.log(error);
            }
        }
        const id = localStorage.getItem("idBill");
        if(id) setFailBill(id);
        reset();
    }

    const fetchDataSeat = async()=>{
        try {
            await dispatch(getListSeat());
        } catch (error) {
            console.log(error);
        }
    }

    function handleChange(type: string, value: string){ 
        setUserInfor({...userInfor, [type]: value});
    }

    function handleRemove(seat :string){
        const list = userInfor.listSeat.filter(index => index !== seat);
        dispatch(setUser({...userInfor, listSeat: list}));
    }

    //Bước 5_(3): Khi đóng link thì xóa dữ liệu bill trong data, xóa idBill, quay lại bước 0
    function handleCloseLink(){
        exit(); 
        setIsOpen(false);   
        const setFailBill = async(id_: string)=>{
            try {
                await setFail(id_);
            } catch (error) {
                console.log(error);
            }
        }
        setFailBill(idBill);
        reset();
    }

    //Bước 6: Thoát giao diện thành công, reset dữ liệu ghế, bật giao diện ban đầu bước 0
    function handleBack(){
        reset();
        setIsSuccess(false);
    }

    // Thiết lập thời gian ban đầu (3 phút = 180 giây)
    const [timeLeft, setTimeLeft] = useState(180);

    useEffect(() => {
        // Nếu thời gian còn lại là 0, không làm gì thêm
        if (timeLeft === 0) return;

        // Thiết lập một interval để giảm thời gian mỗi giây
        const interval = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        // Dọn dẹp khi component bị hủy hoặc khi interval kết thúc
        return () => clearInterval(interval);
    }, [timeLeft]); // Chạy lại effect mỗi khi timeLeft thay đổi

    // Hàm chuyển đổi giây thành phút và giây
    const formatTime = (time:any) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

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
            {!isSuccess ? <div className="form">
                 <p className="title">Thông tin đặt vé</p>
                {!isOpen && <div className='detail'>
                    <div className='item'>
                        <figure><img src={name_icon} alt="" /></figure>
                        <p className='sub-title'>Họ và tên:</p>
                        <fieldset><input value={userInfor.name} type="text" onChange={e => handleChange("name", e.target.value)} /></fieldset>
                    </div>
                    <div className='item'>
                        <figure><img src={phone_icon} alt="" /></figure>
                        <p className='sub-title'>Số điện thoại*:</p>
                        <fieldset><input value={userInfor.phone} type="tel" onChange={e => handleChange("phone", e.target.value)} /></fieldset>
                    </div>
                    <div className='item'>
                        <figure><img src={email_icon} alt="" /></figure>
                        <p className='sub-title'>Email*:</p>
                        <fieldset><input value={userInfor.email} type="email" onChange={e => handleChange("email", e.target.value)}/></fieldset>
                    </div>
                    <p className='note'><b>*Lưu ý:</b> Chúng mình sẽ gửi vé qua địa chỉ email của bạn, hãy nhập chính xác và kiểm tra lại trước khi đặt nhé!</p>
                    <div className='item'>
                        <figure><img src={email_icon} alt="" /></figure>
                        <p className='sub-title'>Địa chỉ nhận*:</p>
                        <fieldset><input value={userInfor.address} type="text" onChange={e => handleChange("address", e.target.value)}/></fieldset>
                    </div>
                    <div className='item'>
                        <figure><img src={price_icon} alt="" /></figure>
                        <p className='sub-title'>Vị trí đã chọn*:</p>
                        <div>
                            <ul>{userInfor.listSeat.map(index => <li key={index} onClick={() => handleRemove(index)}>{index}</li>)}</ul>
                        </div>
                    </div>
                    <p className='note'>*Bạn hãy chọn trực tiếp những vị trí trên sơ đồ.</p>
                </div>}
                {!isOpen ? <p className='btn-submit' onClick={checkStill}>Thanh toán</p>
                :<div>
                    <div id="embedded-payment-container"></div>
                    <p className='back-btn' onClick={handleCloseLink}>Trở lại</p>
                    <p className='clock'>{formatTime(timeLeft)}</p>
                </div>}
            </div>:
            <div className="form done">
                <figure><img src={check_done} alt="" /></figure>
                <p className='message'>Xin chân thành cảm ơn bạn đã ủng hộ dự án của chúng mình! Vé sẽ được gửi qua địa chỉ mail 
                    <b>{userInfor.email}</b> trong thời gian sớm nhất.
                </p>
                <p className='back-btn' onClick={handleBack}>Trở lại</p>
            </div>}
        </div>
    )
}