import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

export default function CategoriesDetails() {
  let { id } = useParams();

  const { data: catgoriesDet, isLoading: isCatgoriesLoading } = useQuery({
    queryKey: ["detialsCatagories", id],
    queryFn: () =>
      axios
        .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
        .then((res) => res.data.data),
  });

  if (isCatgoriesLoading) {
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

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <div className="max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <img
          src={catgoriesDet?.image}
          alt={catgoriesDet?.name}
          className="w-full  object-cover"
        />
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {catgoriesDet?.name}
          </h2>
          <p className="text-gray-500 mb-4">Slug: {catgoriesDet?.slug}</p>
        </div>
      </div>
    </div>
  );
}
