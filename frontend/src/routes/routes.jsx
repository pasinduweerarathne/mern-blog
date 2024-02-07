import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import Error404 from "@/pages/Error404";
import Home from "@/pages/home";
import ArticleDetails from "@/pages/articleDetails";
import Register from "../pages/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/blog/:id", element: <ArticleDetails /> },
      { path: "/register", element: <Register /> },
      { path: "*", element: <Error404 /> },
    ],
  },
]);

export default router;
