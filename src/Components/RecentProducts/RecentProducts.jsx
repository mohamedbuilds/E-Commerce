import React from "react";
import "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function RecentProducts() {
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["recentProduct"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-600 text-center">Error: {error.message}</p>;
  }

  return (
    <div className="container w-[80%] mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6">Recent Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.data?.data?.map((el) => (
          <div
            key={el.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
          >
            <Link to={`productDetials/${el.id}`}>
              <img
                src={el.imageCover}
                alt={el.title}
                className="w-full object-cover rounded-lg mb-4"
              />

              <h3 className="text-lg font-semibold mb-2">
                {el.title.split(" ").slice(0, 3).join(" ")}
              </h3>
              <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                {el.description}
              </p>

              <div className="mt-auto flex justify-between items-center">
                <p className="text-lg font-bold text-green-600 mb-1">
                  ${el.price}
                </p>
                <p className="text-yellow-500 text-sm">
                  ⭐ {el.ratingsAverage} / 5 ({el.ratingsQuantity})
                </p>
              </div>
            </Link>

            <button
              className="mt-4 w-full flex items-center justify-center gap-2 
                bg-gradient-to-r from-green-400 to-green-600 
                text-white font-bold py-3 px-5 rounded-xl 
                shadow-md transition-all duration-300 
                hover:bg-green-700 hover:from-green-700 hover:to-green-700 
                hover:text-white hover:shadow-xl 
                hover:-translate-y-1 hover:scale-105 cursor-pointer"
            >
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
