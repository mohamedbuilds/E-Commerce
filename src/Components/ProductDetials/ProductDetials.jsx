import React, { useContext, useState } from "react";

import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetials() {
  const [load, setload] = useState(false);
  let { id } = useParams();
  let { addProductToCart } = useContext(CartContext);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280, // شاشات لابتوب
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024, // تابلت كبير
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // تابلت
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // موبايل
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 280, // موبايل
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function getProducts() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => res.data.data);
  }

  function getProductDetials(id) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => res.data.data);
  }

  async function addProduct(id) {
    try {
      setload(true);
      let response = await addProductToCart(id);
      console.log(response.data);
      if (response.data.status == "success") {
        toast.success(response.data.message);
      } else {
        setload(false);
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);

      setload(false);
    } finally {
      setload(false);
    }
  }

  const { data: allProducts, isLoading: isProductsLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getProducts,
  });

  const {
    data: productDetails,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
    error: detailsError,
  } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => getProductDetials(id),
  });

  if (isProductsLoading || isDetailsLoading) {
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
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-2xl p-6">
        {/* صور المنتج */}
        <div>
          <Slider {...settings}>
            {productDetails?.images?.map((el) => (
              <img src={el} alt="" />
            ))}
          </Slider>
        </div>

        {/* تفاصيل المنتج */}
        <div className="flex flex-col ">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {productDetails?.title}
            </h1>
            <p className="text-gray-600 text-base mb-6">
              {productDetails?.description}
            </p>

            <div className="mb-6">
              {productDetails?.priceAfterDiscount ? (
                <div className="flex items-center gap-4">
                  <p className="text-2xl font-bold text-green-600">
                    ${productDetails?.priceAfterDiscount}
                  </p>
                  <p className="text-lg line-through text-gray-400">
                    ${productDetails?.price}
                  </p>
                </div>
              ) : (
                <p className="text-2xl font-bold text-green-600">
                  ${productDetails?.price}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-yellow-500 text-xl">⭐</span>
              <span className="text-gray-700 font-medium">
                {productDetails?.ratingsAverage} / 5
              </span>
              <span className="text-gray-500 text-sm">
                ({productDetails?.ratingsQuantity} reviews)
              </span>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Brand:
                <span className="font-medium">
                  {productDetails?.brand?.name}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Category:
                <span className="font-medium">
                  {productDetails?.category?.name}
                </span>
              </p>
            </div>
          </div>

          {/* زرار */}
          <button
            className="mt-6 w-full flex items-center justify-center gap-2 
            bg-gradient-to-r from-green-400 to-green-600 
            text-white font-bold py-3 px-5 rounded-xl 
            shadow-md transition-all duration-300 
            hover:bg-green-700 hover:from-green-700 hover:to-green-700 
            hover:shadow-xl hover:-translate-y-1 hover:scale-105 cursor-pointer"
            onClick={() => addProduct(productDetails.id)}
          >
            {load ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
              </>
            ) : (
              "Add To Cart"
            )}
          </button>
        </div>
      </div>

      {productDetails && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allProducts
            .filter((el) => el.category.name === productDetails?.category?.name)
            .map((el) => (
              <div
                key={el._id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col"
              >
                <img
                  src={el.imageCover}
                  alt={el.title}
                  className="rounded-lg mb-4 w-full object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {el.title}
                </h3>
                <p className="text-green-600 font-bold mb-2">${el.price}</p>
                <Link
                  to={`/productdetials/${el._id}`}
                  className="mt-auto bg-green-500 text-white py-2 px-4 rounded-lg text-center hover:bg-green-600 transition"
                >
                  View Product
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
