import { createHashRouter } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Login from "../pages/LogIn/LogIn";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";

const routes = createHashRouter([
    {
        path: "/",
        element: <Landing/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
    },
    
    ])

export default routes;