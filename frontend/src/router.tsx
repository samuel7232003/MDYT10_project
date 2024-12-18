import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Welcome from "./pages/Welcome";
import Booking from "./pages/booking/Booking";
import Notfound from "./screens/NotFound";
import Donate from "./pages/donate/Donate";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Home/>,
        children:[
            {
                path:"",
                element: <Welcome/>
            },
            {
                path:"booking",
                element: <Booking/>
            },
            {
                path:"donate",
                element: <Donate/>
            }
        ]
    },
    {
        path: "*",
        element: <Notfound/>
    },
]);