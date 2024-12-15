import { apiInstance } from "./api";

export async function getAllStatus():Promise<any>{
    try {
        const res = await apiInstance.get("/getAllStatus");
        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function updateTicket(idBill: string, ticket: string):Promise<any> {
    try {
        const res = await apiInstance.post("/updateStatus", {idBill: idBill, ticket: ticket});
        return res;
    } catch (error) {
        console.log(error);
    }
}