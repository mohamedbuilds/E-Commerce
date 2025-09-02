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
    {/* العنوان */}
    <h1 className="text-3xl md:text-4xl font-extrabold text-center my-12 text-emerald-800">
      Welcome Back 👋
    </h1>

    {/* Error من الـ API */}
    {ApiError && (
      <div className="w-[70%] mx-auto mb-8 text-center text-sm font-semibold text-red-700 bg-red-100 border border-red-300 rounded-lg px-4 py-3 shadow-md animate-slide-in">
        {ApiError}
      </div>
    )}

    {/* الفورم */}
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white w-[70%] mx-auto p-8 rounded-2xl shadow-lg border border-gray-100"
    >
      {/* Email */}
      <div className="mb-6">
        <TextInput
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="w-full"
          name="email"
          id="email"
          type="email"
          placeholder="Enter your email"
        />
        {formik.errors.email && formik.touched.email && (
          <HelperText
            className="mt-2 text-center text-sm font-medium text-red-700 bg-red-50 border border-red-300 rounded-md px-3 py-2 shadow-sm animate-slide-in"
            color="failure"
          >
            {formik.errors.email}
          </HelperText>
        )}
      </div>

      {/* Password */}
      <div className="mb-6">
        <TextInput
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="w-full"
          name="password"
          id="password"
          type="password"
          placeholder="Enter your password"
        />
        {formik.errors.password && formik.touched.password && (
          <HelperText
            className="mt-2 text-center text-sm font-medium text-red-700 bg-red-50 border border-red-300 rounded-md px-3 py-2 shadow-sm animate-slide-in"
            color="failure"
          >
            {formik.errors.password}
          </HelperText>
        )}
      </div>

      {/* الأزرار */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Button
          type="submit"
          className="w-full cursor-pointer md:w-auto px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin text-white text-lg"></i>
          ) : (
            "Login"
          )}
        </Button>

        <Link
          to="/register"
          className="text-sm text-gray-600 hover:text-emerald-700 transition-colors"
        >
          Don’t have an account?
          <span className="font-semibold text-emerald-600 hover:underline">
            Register Now
          </span>
        </Link>
      </div>
    </form>
  </>
);

}
