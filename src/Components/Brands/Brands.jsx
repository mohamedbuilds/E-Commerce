import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export default function Brands() {
  async function allCatgoriesData() {
    let response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
    return response.data.data;
  }

  const {
    data: allBrands,
    isLoading: isLoading,
    isError: isError,
    error: Error,
  } = useQuery({
    queryKey: ["allCatgories"],
    queryFn: allCatgoriesData,
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
  if (isError)
    return <p className="text-center text-red-500 mt-10">{Error.message}</p>;
  console.log(allBrands);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h2 className="text-3xl font-bold text-emerald-700 text-center mb-10">
        Brands
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allBrands.map((el) => (
          <Link
            to={`/brandDetails/${el._id}`}
            key={el._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img
              src={el.image}
              alt={el.name}
              className="w-full  object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{el.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
