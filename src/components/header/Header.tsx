import './header.css';
import mdyt10 from '../../images/mdyt10.png'
import { useEffect, useState } from 'react';

export default function Header(){
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [hide, setHide] = useState(false);

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

    return (
        <header className={hide? "hide": ""}>
            <div className="header-left">
                <figure><img src={mdyt10} alt="" /></figure>
                <nav>
                    <ul>
                        <li className="main">Trang chủ</li>
                        <li>Hành trình</li>
                        <li>MĐYT 10</li>
                        <li>Chúng tôi</li>
                    </ul>
                </nav>
            </div>
            <div className="header-right">
                <p>MUA VÉ NGAY</p>
            </div>
        </header>
    )
}