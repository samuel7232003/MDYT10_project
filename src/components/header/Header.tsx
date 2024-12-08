import './header.css';
import mdyt10 from '../../images/mdyt10.png'

export default function Header(){
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