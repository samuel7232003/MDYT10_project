import { Table, TableProps } from "antd";
import "./homepage.css"
import { useAppDispatch, useAppSelector } from "../../redux/builder";
import { useEffect } from "react";
import { getListBill } from "../../redux/bill/bill.action";
import { Bill } from "../../redux/bill/bill.state";

export default function HomePage(){
    const listBill = useAppSelector(state => state.bill.listBill);
    const dispatch = useAppDispatch();

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

    const columns: TableProps<Bill>['columns'] = [
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
          title: 'Số điện thoạithoại',
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
          title: 'Số vé đặtđặt',
          key: 'numSeat',
          dataIndex: 'numSeat',
        },
    ];
      
    
    return(
        <div className="homepage">
            <div>
                <Table<Bill> columns={columns} dataSource={listBill}/>
            </div>
        </div>
    )
}