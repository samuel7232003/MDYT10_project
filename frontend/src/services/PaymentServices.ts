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

export async function savePending(userInfor:User, idBill: string) {
    try {
        const amount_ = userInfor.listSeat.length*1000;
        const data = {amount: amount_, name: userInfor.name, phone: userInfor.phone, email: userInfor.email, listSeat: userInfor.listSeat,address: userInfor.address, idBill: idBill}
        const respone:any = await apiInstance.post('/setPending', data);
        return respone;
    } catch (error) {
        throw error;
    }
}

export async function getDataSeat() {
    try {
        await apiInstance("/deleteOutTime");
        const respone:any = await apiInstance.get('/getSeat');
        let listSeat: Seat[] = [];
        for(let i = 0; i< respone.length; i++){
            const seat:Seat = {idTicket: respone[i]._id, name: respone[i].seat, status: respone[i].status}
            listSeat.push(seat); 
        }
        return listSeat;
    } catch (error) {
        throw(error)
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

export async function deleteOutTime() {
    try {
        const respone = await apiInstance("/deleteOutTime");
        console.log(respone);
        return respone;
    } catch (error) {
        throw error;
    }
}