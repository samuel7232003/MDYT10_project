import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/header/Header";

export default function Home(){
    const [curPage, setCurPage] = useState("home");
    const navigate = useNavigate();

    useEffect(() => {
        const check = localStorage.getItem("access_token");

        if(!check || check === "undefined") {
            navigate("./login");
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Header curPage={curPage}/>
            <div>
                <Outlet context={{setCurPage}}/>
            </div>
        </div>
    )
}