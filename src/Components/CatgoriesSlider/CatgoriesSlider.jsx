import React from "react";
import "./CatgoriesSlider.module.css";
import Slider from "react-slick";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export default function CatgoriesSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
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

  async function getCatgories() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => res.data.data);
  }
  const {
    data: Catgories,
    isLoading: CatgoriesLoading,
    isError: CatgoriesIsError,
    error: CatgoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCatgories,
  });

  if (CatgoriesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      </div>
    );
  }
  if (CatgoriesIsError) {
    return (
      <p className="text-red-600 text-center mt-10">
        Error loading categories: {CatgoriesError.message}
      </p>
    );
  }
  return (
    <>
      <div className="container mx-auto px-4 mt-16">
        {/* العنوان */}
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 text-center">
          Shop Popular Categories
        </h1>

        {/* السلايدر */}
        <Slider {...settings}>
          {Catgories.map((el) => (
            <div
              key={el._id}
              className="p-4 flex flex-col items-center cursor-pointer"
            >
              <div
                className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden 
              shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl 
              border border-gray-200 bg-gradient-to-br from-white to-gray-100"
              >
                <img
                  src={el.image}
                  alt={el.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p
                className="mt-4 text-center text-gray-800 font-semibold text-sm md:text-base 
              transition-colors duration-300 hover:text-green-600"
              >
                {el.name}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
