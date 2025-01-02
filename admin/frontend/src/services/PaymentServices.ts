import { Bill } from "../redux/bill/bill.state";
import { apiInstance } from "./api";

export async function getDataBill() {
    try {
        const respone:any = await apiInstance.get('/getAllBill');
        let listBill: Bill[] = [];
        for(let i = 0; i< respone.length; i++){
            const amount = respone[i].amount;
            const bill:Bill = {
                _id: respone[i]._id, 
                idBill: respone[i].idBill, 
                name: respone[i].name, 
                phone: respone[i].phone, 
                email: respone[i].email,
                address: respone[i].address,
                numSeat: amount/50000
            }
            listBill.push(bill); 
        }
        return listBill;
    } catch (error) {
        throw(error)
    }
}

export async function getTickets(idBill: string) :Promise<any>{
    try{
        const res = await apiInstance.get(`/tickets?idBill=${idBill}`);
        console.log(res);
        return res;
    } catch(error){
        throw(error);
    }
}

export async function updateActive(_id: string, mave: string) :Promise<any>{
    try{
        const res = await apiInstance.post(`/updateActive`, {_id: _id, mave: mave});
        console.log(res);
        return res;
    } catch(error){
        throw(error);
    }
}