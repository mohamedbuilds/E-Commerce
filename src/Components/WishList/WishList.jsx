import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { WishListContext } from "./../../Context/WishListContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
export default function WishList() {
  const queryClient = useQueryClient();
  let { getLoggedWishList, removeWishList } = useContext(WishListContext);
  const [load, setload] = useState(false);
  const [current, setcurrent] = useState(0);
  async function itemsWish() {
    let response = await getLoggedWishList();
    return response.data.data;
  }
  async function deleteWish(id) {
    setload(true);
    setcurrent(id);
    let response = await removeWishList(id);
    console.log(response);
    if (response.status === 200) {
      toast.success(response.data.message);
      queryClient.invalidateQueries({ queryKey: ["allWishList"] });
    } else {
      setload(false);
      toast.error(response.data.message);
    }
  }

  const {
    data: allWish,
    isLoading: isLoading,
  } = useQuery({
    queryKey: ["allWishList"],
    queryFn: itemsWish,
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
  return (
    <div className="container mx-auto my-12 w-[85%]">
      {allWish.length > 0 ? (
        <>
          <h2 className="text-3xl font-extrabold mb-8 text-gray-800 border-l-4 border-green-500 pl-3">
            🌟 My WishList
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {allWish?.map((product) => (
              <>
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-md p-5 flex flex-col group relative hover:shadow-xl transition-all duration-300"
                >
                  {/* Link للضغط على المنتج */}
                  <Link to={`/productDetials/${product.id}`} className="flex-1">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-full h-60 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-green-600 transition">
                      {product.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-auto flex justify-between items-center">
                      <p className="text-xl font-bold text-green-600">
                        ${product.price}
                      </p>
                      <p className="text-yellow-500 text-sm flex items-center gap-1">
                        ⭐ {product.ratingsAverage}
                        <span className="text-gray-500 text-xs">
                          ({product.ratingsQuantity})
                        </span>
                      </p>
                    </div>
                  </Link>

                  {/* زر Remove */}
                  <button
                    onClick={() => deleteWish(product.id)}
                    className="w-full mt-4 cursor-pointer bg-red-500 text-white font-bold py-2 rounded-xl shadow-md hover:bg-red-600 transition-all flex justify-center items-center gap-2"
                  >
                    {load && current === product.id && (
                      <i className="fas fa-spinner fa-spin"></i>
                    )}
                    <span>Remove</span>
                  </button>
                </div>
              </>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20 bg-gray-100 rounded-xl shadow-md">
          <p className="text-xl font-semibold text-gray-700 mb-2">
            Your WishList is currently empty
          </p>
          <p className="text-gray-500">
            Add some favorite products and they will appear here! 🌟
          </p>
        </div>
      )}
    </div>
  );
}
