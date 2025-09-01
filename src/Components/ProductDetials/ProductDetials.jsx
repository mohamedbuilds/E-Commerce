import React, { useEffect, useState } from "react";
import "./ProductDetials.module.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

export default function ProductDetials() {
  let { id } = useParams();

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

  const [productDetials, setproductDetials] = useState(null);
  const [products, setproducts] = useState([]);
  async function getProductDetials(id) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      console.log(data.data.images);

      setproductDetials(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getProducts() {
    try {
      let { data } = await axios(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      setproducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductDetials(id);
  }, [id]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      {productDetials == null ? (
        <>
          <div className="loader-container">
            <div className="sk-folding-cube">
              <div className="sk-cube1 sk-cube"></div>
              <div className="sk-cube2 sk-cube"></div>
              <div className="sk-cube4 sk-cube"></div>
              <div className="sk-cube3 sk-cube"></div>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-2xl p-6">
          {/* صور المنتج */}
          <div>
            <Slider {...settings}>
              {productDetials.images.map((el) => (
                <img src={el} alt="" />
              ))}
            </Slider>
          </div>

          {/* تفاصيل المنتج */}
          <div className="flex flex-col ">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {productDetials?.title}
              </h1>
              <p className="text-gray-600 text-base mb-6">
                {productDetials?.description}
              </p>

              <div className="mb-6">
                {productDetials?.priceAfterDiscount ? (
                  <div className="flex items-center gap-4">
                    <p className="text-2xl font-bold text-green-600">
                      ${productDetials?.priceAfterDiscount}
                    </p>
                    <p className="text-lg line-through text-gray-400">
                      ${productDetials?.price}
                    </p>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-green-600">
                    ${productDetials?.price}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 mb-6">
                <span className="text-yellow-500 text-xl">⭐</span>
                <span className="text-gray-700 font-medium">
                  {productDetials?.ratingsAverage} / 5
                </span>
                <span className="text-gray-500 text-sm">
                  ({productDetials?.ratingsQuantity} reviews)
                </span>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500">
                  Brand:{" "}
                  <span className="font-medium">
                    {productDetials?.brand?.name}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Category:{" "}
                  <span className="font-medium">
                    {productDetials?.category?.name}
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
            hover:shadow-xl hover:-translate-y-1 hover:scale-105"
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      )}

      {productDetials && (
        <div className="flex flex-wrap justify-center gap-4">
          {products
            .filter((el) => el.category.name === productDetials?.category?.name)
            .map((el) => (
              <div
                key={el._id}
                className="w-1/4 bg-white shadow-md rounded-lg p-4 flex flex-col"
              >
                <img
                  src={el.imageCover}
                  alt={el.title}
                  className="rounded-lg mb-4 w-full  object-cover"
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
