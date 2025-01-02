import { useNavigate } from 'react-router-dom'
import './notfound.css'
import React from 'react';

export default function Notfound(){
    const navigate = useNavigate();

    return(
        <div className="notfound">
            <div className='inner'>
                <p className='num'>404</p>
                <p>PAGE NOT FOUND!</p>
                <p onClick={() => navigate("/")} className='button'>Trang chủ</p>
            </div>
        </div>
    )
}