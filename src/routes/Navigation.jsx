import { createHashRouter } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import About from "../pages/About/About";
import Groups from "../pages/Groups/Groups";

const routes = createHashRouter([
    {
        path: "/",
        element: <Landing/>,
    },
    {
        path: "/about",
        element: <About/>,
    },
    {
        path: "/groups",
        element: <Groups/>,
    },
    
    ])

export default routes;