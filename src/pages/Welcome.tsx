import AboutUs from "../components/aboutus/AboutUs";
import Category from "../components/category/Category";
import Footer from "../components/footer/Footer";
import MainVisual from "../components/mainvisual/MainVisual";
import MDYT10 from "../components/mdyt10/MDYT10";

export default function Welcome(){
    return (
        <main>
            <MainVisual/>
            <Category/>
            <MDYT10/>
            <AboutUs/>
            <Footer/>
        </main>
    )
}