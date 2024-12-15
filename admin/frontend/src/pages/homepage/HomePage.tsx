import { Button, Input, message, Table, TableProps, Tag } from "antd";
import "./homepage.css"
import { useAppDispatch, useAppSelector } from "../../redux/builder";
import { useEffect, useState } from "react";
import { getListBill } from "../../redux/bill/bill.action";
import { Bill } from "../../redux/bill/bill.state";
import { getAllStatus, updateTicket } from "../../services/StatusService";
import { getProfile } from "../../redux/user/user.action";
import { setActivity } from "../../services/AccountService";

interface DataType extends Bill{
    index: number;
    key: string;
    numDone: number;
    status: boolean;
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
            if(status.numDone === status.numSeat) return true;
            else return false;
        } 
        else return false;
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
            title: 'Số vé đã giao',
            key: "numDone",
            dataIndex: "numDone"
        },
        {
            title: 'Tình trạng',
            key: "status",
            dataIndex: "status",
            render:(_, { status }) => (
                <Tag color={status?'green':'volcano'}>
                    {status?"DONE":"PENDING"}
                </Tag>
            ),
        },
        {
            title: 'Mã vé',
            key: "tickets",
            dataIndex: "tickets",
            render:(_, { status, idBill}) => (
                !status?
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
    
    
    return(
        <div className="homepage">
            <div>
                <Table<DataType> columns={columns} dataSource={listData}/>
            </div>
        </div>
    )
}