import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Notfound from "./screens/NotFound";
import React from "react";
import Login from "./pages/login/Login";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Home/>,
        children:[
            {
                path:"/",
                element: <Login/>
            }
        ]
    },
    {
        path: "*",
        element: <Notfound/>
      },
]);