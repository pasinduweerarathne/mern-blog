import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import Home from "@/pages/Home";
import Error404 from "@/pages/Error404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "*", element: <Error404 /> },
    ],
  },
]);

export default router;
