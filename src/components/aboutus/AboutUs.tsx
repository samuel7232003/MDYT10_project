import './aboutus.css'
import main from './images/main.png'
import logo from './images/image 3.png'
import cloud from './images/cloud.png'

export default function AboutUs(){
    return(
        <section className="aboutus">
            <div className='title'>
                <p className='top'>Chúng tôi là</p>
                <p className='center'>CLB GUITAR SINH VIÊN ĐÀ NẴNG</p>
                <p className='bottom'>"Vì một cộng đồng Guitar không giới hạn!"</p>
            </div>
            <div className='content'>
                <figure className='main'><img src={main} alt="" /></figure>
                <div className='text'>
                    <div className='text-inner'>
                        <figure><img src={logo} alt="" /></figure>
                        <p>“Mùa Đông Yêu Thương” - Chặng hành trình 10 năm, 
                            dự án tình nguyện không chỉ là những con số thống kê 
                            về số lượng người được giúp đỡ hay những số món quà 
                            chúng tôi được trao đi, mà còn là câu chuyện về 
                            sự trưởng thành của một cộng đồng. 
                            <br/><br/>Từ những bước đi
                            chập chững ban đầu của dự án, giờ đây dự án đã 
                            lớn mạnh hơn từng ngày và được lan tỏa yêu thương đến 
                            những vùng đất xa xôi hơn. Đó chính là những minh chứng 
                            rõ ràng nhất cho sự thành công bền vững của dự án.
                            <br/><br/><i>- CLB Guitar Sinh viên Đà Nẵng -</i></p>
                    </div>
                </div>
                <figure className='cloud c1'><img src={cloud} alt="" /></figure>
                <figure className='cloud c2'><img src={cloud} alt="" /></figure>
            </div>
        </section>
    )
}