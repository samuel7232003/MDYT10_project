import { apiInstance } from "./api";

export async function getTickets():Promise<any> {
    try {
        const res = await apiInstance.get("/getTickets");
        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function checkin(id: string) {
    try {
        const res = await apiInstance.get(`/checkin?id=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
}