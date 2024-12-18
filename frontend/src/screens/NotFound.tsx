import { useNavigate } from 'react-router-dom'
import './notfound.css'

export default function Notfound(){
    const navigate = useNavigate();

    return(
        <div className="notfound">
            <div className='inner'>
                <p className='num'>404</p>
                <p>HỆ THỐNG ĐANG BẢO TRÌ VUI LÒNG QUAY TRỞ LẠI SAU!</p>
                <p onClick={() => navigate("/")} className='button'>Trang chủ</p>
            </div>
        </div>
    )
}