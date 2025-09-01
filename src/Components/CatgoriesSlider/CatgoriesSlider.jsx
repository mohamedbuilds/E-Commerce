import React, { useEffect, useState } from "react";
import "./CatgoriesSlider.module.css";
import Slider from "react-slick";
import axios from "axios";
export default function CatgoriesSlider() {
  const [catgories, setcatgories] = useState([]);

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
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      setcatgories(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCatgories();
  }, []);
  return (
    <>
      <div className="container mx-auto px-4 mt-16">
        {catgories.length > 0 ? (
          <>
            {/* العنوان */}
            <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
              Shop Popular Categories
            </h1>

            {/* السلايدر */}
            <Slider {...settings}>
              {catgories.map((el) => (
                <div
                  key={el._id}
                  className="p-2 flex flex-col items-center cursor-pointer"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
                    <img
                      src={el.image}
                      alt={el.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-3 text-center text-gray-700 font-semibold">
                    {el.name}
                  </p>
                </div>
              ))}
            </Slider>
          </>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="sk-folding-cube">
              <div className="sk-cube1 sk-cube"></div>
              <div className="sk-cube2 sk-cube"></div>
              <div className="sk-cube4 sk-cube"></div>
              <div className="sk-cube3 sk-cube"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
