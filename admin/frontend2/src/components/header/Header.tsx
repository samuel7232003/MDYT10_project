import './header.css';
import mdyt10 from '../../images/mdyt10.png'
import { useNavigate } from 'react-router-dom';

interface Props{
    curPage :string;
}

export default function Header({curPage} :Props){
    const navigate = useNavigate();

    return (
        <header>
            <div className="header-left">
                <figure onClick={() => navigate('./')}><img src={mdyt10} alt="" /></figure>
            </div>
            <div className="header-right">
            </div>
        </header>
    )
}