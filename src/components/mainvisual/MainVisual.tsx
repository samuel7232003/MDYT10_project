import './mainvisual.css'
import mountant from './images/Group 3 (3).png'
import cloud from './images/cloud.png'
import name from './images/Group 2.png'
import image1 from './images/image1.png'
import image2 from './images/image2.png'
import image3 from './images/image3.png'

export default function MainVisual(){
    return(
        <section className="mainvisual">
            <div className='content'>
                <div className='image'>
                    <figure className='image1'><img src={image2} alt="" /></figure>
                    <figure className='image2'><img src={image1} alt="" /></figure>
                    <figure className='image3'><img src={image3} alt="" /></figure>
                </div>
                <div className='text'>
                    <figure><img src={name} alt="" /></figure>
                    <p>CLB GUITAR SINH VIÊN ĐÀ NẴNG</p>
                </div>
            </div>
            
            <figure className='cloud'><img src={cloud} alt="" /></figure>
            <figure className='mountant'><img src={mountant} alt="" /></figure>
        </section>
    )
}