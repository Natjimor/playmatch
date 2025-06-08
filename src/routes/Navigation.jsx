import { createHashRouter } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import LogIn from "../pages/LogIn/LogIn";
import Register from "../pages/Register/Register";

const routes = createHashRouter([
    {
        path: "/",
        element: <Landing/>,
    },
    {
        path: "/login",
        element: <LogIn/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
    
    ])

export default routes;