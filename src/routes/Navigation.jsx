import { createHashRouter } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import About from "../pages/About/About";

const routes = createHashRouter([
    {
        path: "/",
        element: <Landing/>,
    },
    {
        path: "/about",
        element: <About/>,
    },
    
    ])

export default routes;