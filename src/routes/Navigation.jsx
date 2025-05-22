import { createHashRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";

const routes = createHashRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/about",
        element: <About/>,
    },
    
    ])

export default routes;