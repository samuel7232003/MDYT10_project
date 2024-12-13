import { useOutletContext } from 'react-router-dom';
import './donate.css'
import { useEffect } from 'react';
import donate_img from "./donate.png"

export default function Donate(){
    const {setCurPage}:any = useOutletContext();

    useEffect(() => {
        setCurPage("donate");
    }, [])
    
    return (
        <div className="donate">
            <div className='inner'>
                <div className='sub-inner'>
                    <figure><img src={donate_img} alt="" /></figure>
                    <p>Ban tổ chức dự án "Mùa Đông Yêu Thương 10" xin chân thành gửi lời cảm ơn vì sự ửng hộ của bạn!</p>
                </div>
            </div>
        </div>
    )
}