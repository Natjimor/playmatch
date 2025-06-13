import { createHashRouter } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import RecommendationForm from "../pages/IndividualForm/IndividualForm";
import GroupRecommendationForm from "../pages/GroupForm/Group_form";
import GroupsDetail from "../pages/Groups/Groups";
import Login from "../pages/LogIn/LogIn";

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
    {
        path: "/profile",
        element: <Profile/>,
    },

    { path: "/forms", 
        element: <RecommendationForm/>
    },

    { path: "/groupform", 
        element: <GroupRecommendationForm />
    },
     {
        path: "/groups",
        element: <GroupsDetail/>,
    },
    
    ])

export default routes;