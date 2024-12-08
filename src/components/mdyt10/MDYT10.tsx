import './mdyt10.css'
import mdyt10 from './images/Group 2.png'
import back from './images/box.png'


export default function MDYT10(){
    return (
        <section className="mdyt10">
            <div className="inner">
                <div className="content">
                    <figure><img src={mdyt10} alt="" /></figure>
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
                        <br/><br/><i>CLB Guitar Sinh viên Đà Nẵng</i></p>
                </div>
            </div>
        </section>
    )
}