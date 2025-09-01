import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Login from "./Components/Login/Login";
import Notfound from "./Components/Notfound/Notfound";
import Products from "./Components/Products/Products";
import Register from "./Components/Register/Register";
import Brands from "./Components/Brands/Brands";
import UserContextProvider from "./Context/UserContext";
import ProductedRoute from "./Components/ProductedRoute/ProductedRoute";
import ProductDetials from "./Components/ProductDetials/ProductDetials";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

let query = new QueryClient();

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProductedRoute>
            <Home />
          </ProductedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProductedRoute>
            <Cart />
          </ProductedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProductedRoute>
            <Categories />
          </ProductedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      {
        path: "notfound",
        element: (
          <ProductedRoute>
            <Notfound />
          </ProductedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProductedRoute>
            <Products />
          </ProductedRoute>
        ),
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "brands",
        element: (
          <ProductedRoute>
            <Brands />
          </ProductedRoute>
        ),
      },
      {
        path: "productDetials/:id",
        element: (
          <ProductedRoute>
            <ProductDetials />
          </ProductedRoute>
        ),
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <UserContextProvider>
        <QueryClientProvider client={query}>
          <RouterProvider router={x}></RouterProvider>
        </QueryClientProvider>
      </UserContextProvider>
    </>
  );
}
