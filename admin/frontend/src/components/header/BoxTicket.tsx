import { Button, Input } from "antd"
import { useState } from "react"
import { updateActive } from "../../services/PaymentServices";

interface Props{
    index: any
}

export default function BoxTicket({index}:Props){
    const [idTicket, setIdTicket] = useState("");

    function handleUpdate(){
        const update = async ()=>{
            try {
                const res = await updateActive(index._id, idTicket.trim());
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        update();
    }

    return(
        <li key={index._id}>
            <p>Họ và tên: {index.name}</p>
            <p>Vị trí ghế: {index.seat}</p>
            <p>Tình trạng: {index.isActive}</p>
            {index.isActive ==="NONE" && <div>
                <p>Mã vé:</p> 
                <Input onChange={e => setIdTicket(e.target.value)} value={idTicket}/>
                <Button onClick={() => handleUpdate()}>Thêm</Button>
            </div>}
        </li>
    )
}