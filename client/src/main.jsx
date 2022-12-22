import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import RootLayout from "./components/layouts/RootLayout";
import "./index.css";
import Home from "./views/Home";
import AdminProducts from "./views/product/admin/AdminProducts";
import ProductDetail from "./views/product/ProductDetail";
import Products from "./views/product/Products";

// Config baseURL for axios
axios.defaults.baseURL = "http://localhost:4000";

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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
