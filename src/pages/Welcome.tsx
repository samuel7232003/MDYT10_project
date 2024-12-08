import { useEffect, useState } from "react";
import AboutUs from "../components/aboutus/AboutUs";
import Category from "../components/category/Category";
import Footer from "../components/footer/Footer";
import MainVisual from "../components/mainvisual/MainVisual";
import MDYT10 from "../components/mdyt10/MDYT10";

export default function Welcome(){
    const [show, setShow] = useState(2);
    const [curScroll, setCurScroll] = useState(0);

    window.addEventListener("scroll", function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        setCurScroll(currentScroll);
    });

    useEffect(() => {
        const vpHeigh = window.innerHeight;
        if(curScroll > 0 && curScroll < vpHeigh) setShow(3);
        if(curScroll > vpHeigh && curScroll < vpHeigh*2) setShow(4);
        if(curScroll > vpHeigh*2  && curScroll < vpHeigh*3) setShow(5);

    }, [curScroll])


    return (
        <main>
            <MainVisual/>
            <Category/>
            {show>=3 && <MDYT10/>}
            {show>=4 && <AboutUs/>}
            {show>=5 && <Footer/>}
        </main>
    )
}