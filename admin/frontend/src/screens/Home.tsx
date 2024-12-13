import { Outlet } from "react-router-dom";
import { useState } from "react";
import React from "react";
import Header from "../components/header/Header";

export default function Home(){
    const [curPage, setCurPage] = useState("home");

    return (
        <div>
            <Header curPage={curPage}/>
            <div>
                <Outlet context={{setCurPage}}/>
            </div>
        </div>
    )
}