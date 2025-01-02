import { Button, Input, message } from "antd";
import { useState } from "react";
import { getTickets } from "../../services/PaymentServices";
import "./active.css"
import BoxTicket from "../../components/header/BoxTicket";

export default function Active(){
    const [listTicket, setListTicket] = useState([]);
    const [idBill, setIdBill] = useState("");

    function getListTicket(){
        const fetchData = async () =>{
            try {
                const res = await getTickets(idBill.trim());
                setListTicket(res);
            } catch (error) {
                console.log(error);
            }
        }
        if(idBill==="" ) message.error("Vui lòng nhập idBill!");
        else {
            fetchData();
        }
    }

    return(
        <div className="active">
            <div>
                <p>Nhập idBill: </p>
                <Input onChange={e => setIdBill(e.target.value)} value={idBill}/>
                <Button onClick={() => getListTicket()}>Tìm kiếm</Button>
            </div>
            <ul>
                {listTicket.map((index:any) => 
                    <BoxTicket index={index} key={index._id}/>
                )}
            </ul>
        </div>
    )
}