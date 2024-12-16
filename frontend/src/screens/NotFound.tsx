import { useNavigate } from 'react-router-dom'
import './notfound.css'

export default function Notfound(){
    const navigate = useNavigate();

    return(
        <div className="notfound">
            <div className='inner'>
                <p className='num'>404</p>
                <p>Hệ thống đang được bảo trì, vui lòng quay trở lại sau...</p>
                {/* <p onClick={() => navigate("/")} className='button'>Trang chủ</p> */}
            </div>
        </div>
    )
}