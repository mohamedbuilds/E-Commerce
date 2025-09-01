import React from "react";
import "./Template.module.css";
import RecentProducts from "./../RecentProducts/RecentProducts";
import CatgoriesSlider from "../CatgoriesSlider/CatgoriesSlider";
export default function Home() {
  return (
    <>
      <CatgoriesSlider />
      <RecentProducts />
    </>
  );
}
