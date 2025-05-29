import { createHashRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Register from "../pages/Register/Register";
import LogIn from "../pages/LogIn/LogIn";

const routes = createHashRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <LogIn /> }, 
]);

export default routes;