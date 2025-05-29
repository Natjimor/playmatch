import { createHashRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Register from "../pages/Register/Register";

const routes = createHashRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/about",
        element: <About/>,
    },
    {
    path: '/register',
    element: <Register />
    },
    
    ])

export default routes;