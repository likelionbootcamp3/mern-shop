import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import Home from "../views/Home";
import AdminProducts from "../views/product/admin/AdminProducts";
import ProductDetail from "../views/product/ProductDetail";
import Products from "../views/product/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:productId",
        element: <ProductDetail />,
      },
      {
        path: "admin/products",
        element: <AdminProducts />,
      },
    ],
  },
]);

export default router;
