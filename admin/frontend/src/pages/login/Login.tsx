import {Button, Input} from "antd"
import './login.css'

export default function Login(){
    return(
        <div className="login">
            <div className="block">
                <h2>Đăng nhập</h2>
                <Input placeholder="Tên đăng nhập..."/>
                <Input placeholder="Mật khẩu..." type="password"/>
                <Button>ĐĂNG NHẬP</Button>
            </div>
        </div>
    )
}