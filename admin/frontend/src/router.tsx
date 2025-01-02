import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Notfound from "./screens/NotFound";
import React from "react";
import Login from "./pages/login/Login";
import HomePage from "./pages/homepage/HomePage";
import Active from "./pages/active/Active";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Home/>,
        children:[
            {
                path:"",
                element: <HomePage/>
            },
            {
                path:"login",
                element: <Login/>
            },
            {
                path:"active",
                element: <Active/>
            },
        ]
    },
    {
        path: "*",
        element: <Notfound/>
      },
]);