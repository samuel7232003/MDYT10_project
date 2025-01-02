import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import HomePage from "./pages/homepage/HomePage";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Home/>,
        children:[
            {
                path:"",
                element: <HomePage/>
            },
        ]
    }
]);