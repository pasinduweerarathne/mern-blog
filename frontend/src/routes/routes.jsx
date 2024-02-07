import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import Error404 from "@/pages/Error404";
import Home from "@/pages/home";
import ArticleDetails from "@/pages/articleDetails";
import Register from "../pages/register";
import Login from "../pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/blog/:id", element: <ArticleDetails /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "*", element: <Error404 /> },
    ],
  },
]);

export default router;
