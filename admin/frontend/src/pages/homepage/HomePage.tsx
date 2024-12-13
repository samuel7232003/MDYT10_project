import { Table, TableProps } from "antd";
import "./homepage.css"
import { useAppDispatch, useAppSelector } from "../../redux/builder";
import { useEffect, useState } from "react";
import { getListBill } from "../../redux/bill/bill.action";
import { Bill } from "../../redux/bill/bill.state";

interface DataType extends Bill{
    key: string;
}

export default function HomePage(){
    const listBill = useAppSelector(state => state.bill.listBill);
    const dispatch = useAppDispatch();
    const [listData, setListData] = useState<DataType[]>([]);

    useEffect(() => {
        const fetchData = async ()=>{
            try {
                await dispatch(getListBill());
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        let list:DataType[] = [];
        for(let i=0; i<listBill.length; i++){
            list.push({key: listBill[i]._id, ...listBill[i]})
        }
        setListData(list);
    },[listBill])

    const columns: TableProps<DataType>['columns'] = [
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
    ];
      
    
    return(
        <div className="homepage">
            <div>
                <Table<DataType> columns={columns} dataSource={listData}/>
            </div>
        </div>
    )
}