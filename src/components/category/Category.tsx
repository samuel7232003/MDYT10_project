import './category.css'
import title_icon from './images/mdyt 4.png'
import t10 from './images/10.png'
import yeuthuong from './images/Frame 28 (1).png'
import muadong from './images/Frame 29.png'
import image1 from './categorys/image1.png'
import image2 from './categorys/image2.png'
import image3 from './categorys/image3.png'
import image4 from './categorys/image4.png'
import image5 from './categorys/image5.png'
import image6 from './categorys/image6.png'
import image7 from './categorys/image7.png'
import image8 from './categorys/image8.png'
import image9 from './categorys/image9.png'
import cloud from './images/Group 80.png'
import { useEffect, useState } from 'react'

export default function Category(){
    const [cur, setCur] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
          setCur(prevCur => {
            if (prevCur === 9) {
              return 1;  // Reset về 1 khi đến 8
            } else {
              return prevCur + 1;  // Tăng lên 1 sau mỗi lần
            }
          });
        }, 3000);
    
        // Clean up khi component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="category">
            <div className='title'>
                <div className='top'>
                    <figure><img src={title_icon} alt="" /></figure>
                    <p>HÀNH TRÌNH</p>
                    <figure><img src={title_icon} alt="" /></figure>
                </div>
                <div className='bottom'>
                    <figure className='t10'><img src={t10} alt="" /></figure>
                    <p>năm mang</p>
                    <figure className='yeuthuong'><img src={yeuthuong} alt="" /></figure>
                    <p>sưởi ấm</p>
                    <figure className='muadong'><img src={muadong} alt="" /></figure>
                </div>
            </div>
            <div className='cover_grid'>
                <ul className='grid'>
                    <li className={cur === 8 ?'i1 choice':"i1"}><img src={image8} alt="" /><p>MĐYT 8 - 2022</p></li>
                    <li className={cur === 2 ?'i2 choice':"i2"}><img src={image2} alt="" /><p>MĐYT 2 - 2015</p></li>
                    <li className={cur === 3 ?'i3 choice':"i3"}><img src={image3} alt="" /><p>MĐYT 3 - 2016</p></li>
                    <li className={cur === 4 ?'i4 choice':"i4"}><img src={image4} alt="" /><p>MĐYT 4 - 2017</p></li>
                    <li className={cur === 7 ?'i5 choice':"i5"}><img src={image7} alt="" /><p>MĐYT 7 - 2020</p></li>
                    <li className={cur === 6 ?'i6 choice':"i6"}><img src={image6} alt="" /><p>MĐYT 6 - 2019</p></li>
                    <li className={cur === 5 ?'i7 choice':"i7"}><img src={image5} alt="" /><p>MĐYT 5 - 2018</p></li>
                    <li className={cur === 1 ?'i8 choice':"i8"}><img src={image1} alt="" /><p>MĐYT 1 - 2014</p></li>
                    <li className={cur === 9 ?'i9 choice':"i9"}><img src={image9} alt="" /><p>MĐYT 9 - 2024</p></li>
                </ul>
            </div>
            <figure className='cloud'><img src={cloud} alt="" /></figure>
        </section>
    )
}