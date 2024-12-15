import {Button, Input, message} from "antd"
import './login.css'
import { useState } from "react";
import { login, signin } from "../../services/AccountService";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [loginInfo, setLoginInfo] = useState<{username: string, password: string}>({username: "", password: ""});
    const navigate = useNavigate();

    function signinnow(){

    }

    function handleChange(type: string, value: string){
        setLoginInfo({...loginInfo, [type]: value});
    }

    function checklogin(){
        message.loading("Tiến hành đăng nhập");
        const username = loginInfo.username.trim();
        const password = loginInfo.password;

        const check = async ()=>{
            try {
                const res = await login(username, password);
                if(res.EC === 1 || res.EC === 2) message.error("Sai tên đăng nhập hoặc mật khẩu");
                else{
                    localStorage.setItem("access_token", res.access_token);
                    localStorage.setItem("username", res.user.username);
                    localStorage.setItem("role", res.user.role);
                    message.success("Đăng nhập thành công!");
                    navigate("/");
                }
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }

        if(username==="" || password==="") message.error("Vui lòng điền thông tin đăng nhập!");
        else {
            check();
        }
        
    }

    return(
        <div className="login">
            <div className="block">
                <h2 onClick={() => signinnow()}>Đăng nhập</h2>
                <Input 
                    placeholder="Tên đăng nhập..." 
                    value={loginInfo.username} 
                    onChange={e => handleChange("username", e.target.value)}/>
                <Input 
                    placeholder="Mật khẩu..." 
                    type="password" 
                    value={loginInfo.password} 
                    onChange={e => handleChange("password", e.target.value)}/>
                <Button onClick={checklogin}>ĐĂNG NHẬP</Button>
            </div>
        </div>
    )
}