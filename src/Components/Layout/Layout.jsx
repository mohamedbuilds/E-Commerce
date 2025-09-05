import React from "react";


import { Outlet } from "react-router-dom";
import MyNavbar from "../MyNavbar/MyNavbar";
import MyFooter from "../MyFooter/MyFooter";
export default function Layout() {
  return (
    <>
      <MyNavbar />
      <div className="container mx-auto py-16">
        <Outlet />
      </div>
      <MyFooter />
    </>
  );
}
