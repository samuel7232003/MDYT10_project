import './header.css';
import mdyt10 from '../../images/mdyt10.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

interface Props{
    curPage :string;
}

export default function Header({curPage} :Props){
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [hide, setHide] = useState(false);
    const navigate = useNavigate();

    window.addEventListener("scroll", function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll <= lastScrollTop) setHide(false);
        else setHide(true);

        if (currentScroll === 0) document.body.classList.add("top");
        else document.body.classList.remove("top");
        setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
    });

    window.addEventListener('mousemove', function(e) {
        if (e.clientY < 70) setHide(false);
        else setHide(true);
    });

    useEffect(() => {
        document.body.classList.add("top");
    },[])

    function scrollToNum(num : number){
        const vh = window.innerHeight*num;
        window.scrollTo({
            top: vh,
            behavior: "smooth"
        })
    }

    return (
        <header className={hide? "hide": ""}>
            <div className="header-left">
                <figure onClick={() => navigate('./')}><img src={mdyt10} alt="" /></figure>
                <nav>
                    <ul>
                        <li className="main" onClick={() => {navigate('/'); scrollToNum(0)}}>Trang chủ</li>
                        {curPage==="home" && <li onClick={() => scrollToNum(1)}>Hành trình</li>}
                        {curPage==="home" && <li onClick={() => scrollToNum(2)}>MĐYT 10</li>}
                        {curPage==="home" && <li onClick={() => scrollToNum(3)}>Chúng tôi</li>}
                    </ul>
                </nav>
            </div>
            <div className="header-right">
                <p onClick={() => navigate('./research')}>TRA CỨU</p>
                <p className='donate-now' onClick={() => navigate('./donate')}>ỦNG HỘ</p>
                {/* <p onClick={() => navigate('./booking')}>MUA VÉ</p> */}
                <p onClick={() => message.info("Đã hết thời gian bán vé! Vui lòng mua trực tiếp tại sự kiện!")}>MUA VÉ</p>
            </div>
        </header>
    )
}