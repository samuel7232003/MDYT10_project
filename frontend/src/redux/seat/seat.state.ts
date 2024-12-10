export interface Seat{
    _id: string;
    name: string;
    status: "NONE" | "DONE" | "PENDING";
}

export interface SeatModel{
    seat: Seat;
    listSeat: Seat[];
}