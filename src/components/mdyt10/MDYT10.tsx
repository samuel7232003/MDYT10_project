import './mdyt10.css'
import mdyt10 from './images/Group 2.png'
import image1 from './images/image1.png'
import image2 from './images/image2.png'
import image3 from './images/image3.png'
import image4 from './images/image4.png'
import { Carousel } from 'antd';
import mount from './images/mdyt 4.png'


export default function MDYT10(){
    return (
        <section className="mdyt10">
            <Carousel autoplay>
                <figure className='back'><img src={image1} alt="" loading='lazy'/></figure>
                <figure className='back'><img src={image2} alt="" loading='lazy'/></figure>
                <figure className='back'><img src={image3} alt="" loading='lazy'/></figure>
                <figure className='back'><img src={image4} alt="" loading='lazy'/></figure>
            </Carousel>
            <div className="inner">
                <div className="content">
                    <figure className='logo'><img src={mdyt10} alt="" /></figure>
                    <p>“Mùa đông yêu thương” là chương trình tình nguyện thường niên 
                        lớn và đặc sắc nhất của CLB Guitar Sinh Viên Đà Nẵng. 
                        Không chỉ mang lại không khí sôi động cùng nguồn năng lượng 
                        “cực cháy” của một đêm nhạc hoành tráng, mà đây còn là 
                        hoạt động nhằm “lan tỏa hạnh phúc, chia sẻ yêu thương” 
                        đến các em ở vùng cao, vùng xa.<br/><br/>
                        Thấu hiểu được sự khó khăn về kinh tế, sự thiếu thốn 
                        về các nhu yếu phẩm hàng ngày của người dân sống ở vùng cao, 
                        đặc biệt hơn là các miền núi xa xôi hiểm trở. Chúng tôi luôn 
                        muốn được chia sẻ và hỗ trợ hết mình cho người dân nơi đây.
                    </p>
                    <figure className='mount'><img src={mount} alt="" /></figure>
                </div>
            </div>
        </section>
    )
}