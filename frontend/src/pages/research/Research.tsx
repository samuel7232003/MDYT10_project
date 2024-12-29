import './research.css'
import search_icon from "./images/Search_alt.png"
import { useEffect, useState } from 'react'
import { getDataTicket } from '../../services/PaymentServices'
import { Ticket } from '../../redux/seat/seat.state';
import { useOutletContext } from 'react-router-dom';

export default function Research(){
    const {setCurPage}:any = useOutletContext();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [listView, setListView] = useState<Ticket[]>([]);
    const [search, setSearch] = useState("");

    const getData = async()=> {
        try {
            const data = await getDataTicket();
            setTickets([...data]);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setCurPage("research");
        getData();
    }, [])

    useEffect(()=>{
        if(search.trim() === "") setListView([]);
        else{
            const list = tickets.filter(index => index.name.toUpperCase().includes(search.toUpperCase().trim()) 
                || index.phone.toUpperCase().includes(search.toUpperCase().trim()) );
            setListView(list);
        }
    }, [search])

    return (
        <main className="research">
            <div className='inner'>
                <div className='sub-inner'>
                    <div className='search-box'>
                        <figure><img src={search_icon} alt="" /></figure>
                        <h2>Tra cứu vé của bạn:</h2>
                        <div><input 
                            type="text" 
                            placeholder='Hãy nhập tên hoặc số điện thoại của bạn...'
                            value={search}
                            onChange={(e)=>{setSearch(e.target.value)}}
                        /></div>
                    </div>
                    <div className='search-result'>
                        <ul>
                            {listView.map(index=> 
                                <li key={index.idTicket} className="content">
                                    <div className='content-inner'>
                                        <p>Tên người đặt: <span>{index.name}</span></p>
                                        <p>Vị trí: <span>{index.seat}</span></p>
                                        <p>Mã vé: <span>{index.code}</span></p>
                                        <p>Tình trạng: <span className='status'>{index.code === ""? "Đợi giao":"Đã giao"}</span></p>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}