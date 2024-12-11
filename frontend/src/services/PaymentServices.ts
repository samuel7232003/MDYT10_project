import { Seat } from "../redux/seat/seat.state";
import { User } from "../redux/user/user.state";
import { apiInstance } from "./api";

export async function doPayment(userInfor: User) {
    try {
        const amount_ = userInfor.listSeat.length*1000;
        const data = {amount: amount_, name: userInfor.name, phone: userInfor.phone, email: userInfor.email, listSeat: userInfor.listSeat}
        const respone:any = await apiInstance.post('/create-embedded-payment-link', data);
        return respone;
    } catch (error) {
        throw error;
    }
}

export async function saveDataSeat(userInfor:User, idBill: string) {
    try {
        const data = { name: userInfor.name, phone: userInfor.phone, email: userInfor.email, listSeat: userInfor.listSeat, idBill: idBill}
        const respone:any = await apiInstance.post('/setTiket', data);
        return respone;
    } catch (error) {
        throw error;
    }
}

export async function saveDataBill(userInfor:User, idBill: string) {
    try {
        const amount = userInfor.listSeat.length*1000;
        const data = { amount:amount, name: userInfor.name, phone: userInfor.phone, email: userInfor.email, idBill: idBill, address: userInfor.address};
        const respone:any = await apiInstance.post('/setBill', data);
        return respone;
    } catch (error) {
        throw error;
    }
}

export async function getDataSeat() {
    try {
        const respone= await apiInstance.get('/getSeat');
        let listSeat: Seat[] = [];
        for(let i = 0; i< respone.data.length; i++){
            const seat:Seat = {idTicket: respone.data[i]._id, name: respone.data[i].seat, status: respone.data[i].status}
            listSeat.push(seat); 
        }
        return listSeat;
    } catch (error) {
        throw(error)
    }
}

export async function setDone(idBill:string) {
    try {
        const respone = await apiInstance(`/doneBill?idBill=${idBill}`);
        return respone;
    } catch (error) {
        throw error;
    }
}

export async function setFail(idBill: string) {
    try {
        const respone = await apiInstance(`/deleteBill?idBill=${idBill}`);
        return respone;
    } catch (error) {
        throw error;
    }
}