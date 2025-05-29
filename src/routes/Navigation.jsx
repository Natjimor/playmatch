import { createHashRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Recommendation from "../pages/Recommendation/Recommendation";
import ErrorPage from "../pages/ErrorPage";  // <--- Importa aquí ErrorPage

const routes = createHashRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage /> // ahora sí está definido
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/recommend",
    element: <Recommendation />,
  },
]);

export default routes;
