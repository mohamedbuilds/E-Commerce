import React, { useContext, useState } from "react";
import "./Login.module.css";
import { Button, TextInput, HelperText } from "flowbite-react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
export default function Login() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  let navgition = useNavigate();
  const [ApiError, setApiError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  async function handlesSubmite(values) {
    try {
      setisLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      console.log(data);
      localStorage.setItem("token", data.token);
      setuserLogin(data.token);
      navgition("/");
    } catch (error) {
      setisLoading(false);
      setApiError(error.response.data.message);
    }
  }

  let formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema,
    onSubmit: handlesSubmite, // Function
  });
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 text-center my-16">
        Login Form
      </h1>
      {ApiError ? (
        <div className="w-[70%] my-16 mx-auto mt-2 text-center text-sm font-semibold text-red-700 bg-red-100 border border-red-300 rounded-md px-3 py-2 shadow-md animate-slide-in">
          {ApiError}
        </div>
      ) : null}
      <form onSubmit={formik.handleSubmit} className=" my-16">
        <div className="my-5">
          <TextInput
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-[70%] mx-auto inpt-form"
            name="email"
            id="email"
            type="email"
            placeholder="enter your email"
          />
          {formik.errors.email && formik.touched.email && (
            <HelperText
              className="w-[70%] mx-auto mt-2 text-center text-sm font-semibold text-red-700 bg-red-100 border border-red-300 rounded-md px-3 py-1 shadow-smw-[70%] mx-auto mt-2 text-center text-sm font-semibold text-red-800 bg-red-50 border border-red-300 rounded-lg px-4 py-2 shadow-md animate-slide-in"
              color="failure"
            >
              {formik.errors.email}
            </HelperText>
          )}
        </div>

        <div className="my-5">
          <TextInput
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-[70%] mx-auto inpt-form"
            name="password"
            id="password"
            type="password"
            placeholder="enter your password"
          />
          {formik.errors.password && formik.touched.password && (
            <HelperText
              className="w-[70%] mx-auto mt-2 text-center text-sm font-semibold text-red-700 bg-red-100 border border-red-300 rounded-md px-3 py-1 shadow-smw-[70%] mx-auto mt-2 text-center text-sm font-semibold text-red-800 bg-red-50 border border-red-300 rounded-lg px-4 py-2 shadow-md animate-slide-in"
              color="failure"
            >
              {formik.errors.password}
            </HelperText>
          )}
        </div>

        <div className="flex w-[70%]  mx-auto  justify-around items-center">
          <Button
            type="submit"
            className=" block cursor-pointer mt-4 bg-emerald-800 hover:bg-emerald-500 text-white font-semibold rounded-md py-2 transition-colors"
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin text-white text-1xl"></i>
            ) : (
              "Login"
            )}
          </Button>
          <Link
            to="/register"
            className="block text-center mt-4 text-sm text-gray-600 hover:text-emerald-700 transition-colors"
          >
            <span className="text-gray-800">
              Dont You Have An Account?
              <span className="font-semibold text-emerald-700">
                Register Now.
              </span>
            </span>
          </Link>
        </div>
      </form>
    </>
  );
}
