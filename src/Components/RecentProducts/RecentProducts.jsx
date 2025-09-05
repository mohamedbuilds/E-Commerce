import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useHook from "../../Hooks/useHook";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";

export default function RecentProducts() {
  const [loading, setloading] = useState(false);
  const [current, setcurrent] = useState(0);
  const [colorsWishList, setcolorsWishList] = useState(() => {
    return localStorage.getItem("wish")
      ? JSON.parse(localStorage.getItem("wish"))
      : [];
  });

  let { data, isLoading, isError } = useHook();
  let { addProductToCart } = useContext(CartContext);
  let { addWishList } = useContext(WishListContext);

  async function addToCart(id) {
    setloading(true);
    setcurrent(id);
    let res = await addProductToCart(id);
    console.log(res);

    if (res.data.status == "success") {
      setloading(false);
      //res.data.message
      toast.success(res.data.message);
    } else {
      setloading(false);
      //res.data.message
      toast.error(res.data.message);
    }
  }

  async function addWish(id) {
    setloading(true);
    setcurrent(id);
    let res = await addWishList(id);
    console.log(res);

    if (res.data.status == "success") {
      setloading(false);
      toast.success(res.data.message);
      setcolorsWishList((prev) => {
        const updated = prev.includes(id) ? prev : [...prev, id];
        localStorage.setItem("wish", JSON.stringify(updated));
        return updated;
      });
    } else {
      setloading(false);
      toast.error(res.data.message);
    }
  }

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
    <div className="container w-[85%] mx-auto my-12">
      {/* Title */}
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 border-l-4 border-green-500 pl-3">
        🌟 Recent Products
      </h2>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data?.map((el) => (
          <div
            key={el.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col group relative"
          >
            {/* Product Image */}
            <Link to={`productDetials/${el.id}`} className="block relative">
              <img
                src={el.imageCover}
                alt={el.title}
                className="w-full object-cover rounded-xl mb-4 transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            {/* Heart Icon */}
            {/* {colorsWishList && current == el.id? <i className="fas fa-heart text-red-600"></i> : null} */}

            <button
              onClick={() => addWish(el.id)}
              className={` ${
                colorsWishList.includes(el.id) ? "text-red-600" : "text-white"
              } absolute cursor-pointer top-2 right-2  text-xl p-1 rounded-full bg-black/30 hover:bg-red-500 transition-all`}
            >
              <i className="fas fa-heart"></i>
            </button>
            {/* Title + Description */}
            <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-green-600 transition">
              {el.title.split(" ").slice(0, 3).join(" ")}
            </h3>
            <p className="text-gray-500 text-sm mb-3 line-clamp-2">
              {el.description}
            </p>

            {/* Price & Rating */}
            <div className="mt-auto flex justify-between items-center">
              <p className="text-xl font-bold text-green-600">${el.price}</p>
              <p className="text-yellow-500 text-sm flex items-center gap-1">
                ⭐ {el.ratingsAverage}
                <span className="text-gray-500 text-xs">
                  ({el.ratingsQuantity})
                </span>
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              className="mt-5 w-full flex items-center justify-center gap-2 
            bg-gradient-to-r from-green-500 to-green-600 
            text-white font-bold py-3 px-5 rounded-xl 
            shadow-md transition-all duration-300 
            hover:from-green-600 hover:to-green-700 
            hover:shadow-lg hover:-translate-y-1 hover:scale-105 cursor-pointer"
              onClick={() => addToCart(el.id)}
            >
              {loading && current == el.id ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <>
                  <span role="img" aria-label="cart">
                    🛒
                  </span>{" "}
                  Add to Cart
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
