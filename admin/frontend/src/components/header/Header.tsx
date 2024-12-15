import './header.css';
import mdyt10 from '../../images/mdyt10.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            </div>
            <div className="header-right">
                <p onClick={() => {navigate('./login'); localStorage.clear()}}>Đăng xuất</p>
            </div>
        </header>
    )
}