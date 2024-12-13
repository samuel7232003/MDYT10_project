import {Input} from "antd"

export default function Login(){
    return(
        <div className="loginMain">
            <div className="block">
                <p></p>
                <Input placeholder="Tên đăng nhập..."/>
                <Input placeholder="Mật khẩu..." />
            </div>
        </div>
    )
}