import './header.css';
import mdyt10 from '../../images/mdyt10.png'
import { useEffect } from 'react';

export default function Header(){

    let lastScrollTop = 0;

    window.addEventListener("scroll", function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll <= lastScrollTop) {
                document.body.classList.remove('scroll');
        } else {
                document.body.classList.add('scroll');
        }

        if (currentScroll === 0) document.body.classList.add("top");
        else document.body.classList.remove("top");
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Đảm bảo không giá trị âm
    });

    window.addEventListener('mousemove', function(e) {
        if (e.clientY < 70) {
            document.body.classList.remove('scroll');
        } else {
            document.body.classList.add('scroll');
        }
    });

    useEffect(() => {
        document.body.classList.add("top");
    },[])

    return (
        <header>
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