import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import Home from "../views/Home";
import NotFound from "../views/NotFound";
import AdminProducts from "../views/product/admin/AdminProducts";
import AdminProductsEdit from "../views/product/admin/AdminProductsEdit";
import AdminProductsNew from "../views/product/admin/AdminProductsNew";
import ProductDetail from "../views/product/ProductDetail";
import Products from "../views/product/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
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
      {
        path: "admin/products/new",
        element: <AdminProductsNew />,
      },
      {
        path: "admin/products/:productId/edit",
        element: <AdminProductsEdit />,
      },
    ],
  },
]);

export default router;
