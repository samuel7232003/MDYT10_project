import { Button, Input, message, Table, TableProps, Tag } from "antd";
import "./homepage.css"
import { useAppDispatch, useAppSelector } from "../../redux/builder";
import { useEffect, useState } from "react";
import { getListBill } from "../../redux/bill/bill.action";
import { Bill } from "../../redux/bill/bill.state";
import { getAllStatus, updateTicket } from "../../services/StatusService";
import { setActivity } from "../../services/AccountService";
import { signin } from "../../services/test";

interface DataType extends Bill{
    index: number;
    key: string;
    numDone: number;
    status: string;
}

export default function HomePage(){
    const listBill = useAppSelector(state => state.bill.listBill);
    const dispatch = useAppDispatch();
    const [listData, setListData] = useState<DataType[]>([]);
    const [listStatus, setListStatus] = useState<{idBill: string, numSeat: number, numDone: number, tickets: string}[]>([]);
    const [editMode, setEditMode] = useState("");
    const [ticket, setTicket] = useState("");

    const getDataStatus = async ()=>{
        try {
            const res = await getAllStatus();
            setListStatus(res);
        } catch (error) {
            console.log(error);
        }
    }

    function test(){
        const fetchData = async ()=>{
            try {
                await signin({username: "thanh",password: "123456",firstname: "thanh",lastname: "le",dateBirth: new Date("07-02-2003") });
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }

    useEffect(() => {
        const fetchData = async ()=>{
            try {
                await dispatch(getListBill());
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        
        getDataStatus();
    }, [])

    useEffect(() => {
        let list:DataType[] = [];
        for(let i=0; i<listBill.length; i++){
            const numDone = findDoneSeat(listBill[i].idBill);
            list.push({
                key: listBill[i]._id, 
                ...listBill[i], 
                index: i+1, 
                numDone: numDone,
                status: checkDone(listBill[i].idBill)
            })
        }
        setListData(list);
    },[listBill])

    function findDoneSeat(idBill: string){
        const status = listStatus.find(index => index.idBill === idBill);
        if(status) return status.numDone;
        else return 0;
    }

    function checkDone(idBill: string){
        const status = listStatus.find(index => index.idBill === idBill);
        if(status){
            if(getTickets(idBill) !== "") return "DONE";
            else return "WAIT";
        }
        else return "WAIT";
    }

    function getTickets(idBill: string){
        const status = listStatus.find(index => index.idBill === idBill);
        if(status) return status.tickets;
        else return "";
    }

    function handleChange(){
        const saveTicket = async ()=>{
            try {
                await updateTicket(editMode, ticket);
            } catch (error) {
                console.log(error);
            }
        }
        saveTicket();

        const username = localStorage.getItem("username");
        if(username){
            const saveActivity = async ()=>{
                try {
                    await setActivity(username, "SETTICKET", editMode);
                } catch (error) {
                    console.log(error);
                }
            }
            saveActivity();
        }
        setEditMode('');
        getDataStatus();
        message.success("Đã lưu thông tin thành công!");
    }

    function handleBack(){
        setEditMode("");
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'ID Bill',
            dataIndex: 'idBill',
            key: 'idBill',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Số vé đặt',
            key: 'numSeat',
            dataIndex: 'numSeat',
        },
        {
            title: 'Tình trạng',
            key: "status",
            dataIndex: "status",
            filters: [
                {
                    text: 'Xong',
                    value: 'DONE',
                },
                {
                    text: 'Chờ giao',
                    value: 'WAIT',
                },
            ],
            onFilter: (value, record) => record.status.includes(value as string),
            render:(_, { status }) => (
                <Tag color={status === "DONE"?'green':'volcano'}>
                    {status==="DONE"?"Xong":"Chờ giao"}
                </Tag>
            ),
        },
        {
            title: 'Mã vé',
            key: "tickets",
            dataIndex: "tickets",
            render:(_, { status, idBill}) => (
                !(status==="DONE")?
                    editMode===""?<>{getTickets(idBill)}<Button onClick={() => {setEditMode(idBill); setTicket(getTickets(idBill))}}>Thêm</Button></>
                    :idBill === editMode?<>
                        <Input onChange={e => setTicket(e.target.value)} value={ticket}/>
                        <Button onClick={handleChange} type="primary">Lưu</Button>
                        <Button onClick={handleBack} >Thoát</Button>
                    </>
                    :<></>
                :<>{getTickets(idBill)}</>
            )
        }
    ];

    function findNumTickets(){
        let sum = 0;
        for(let i=0; i<listBill.length; i++){
            sum = sum + listBill[i].numSeat;
        }
        return sum;
    }
    
    
    return(
        <div className="homepage">
            <div className="sumary" onClick={() => test()}>
                Số vé bán được: {findNumTickets()}
            </div>
            <div>
                <Table<DataType> columns={columns} dataSource={listData}/>
            </div>
        </div>
    )
}