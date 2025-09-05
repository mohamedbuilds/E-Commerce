import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { HelperText } from "flowbite-react";
import {useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function RestPassword() {
  const [login, setLoadin] = useState(false);
  const navigate = useNavigate();
  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      ),
  });

  async function handleNewPassword(values) {
    try {
      setLoadin(true);
      let response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        {
          email: values.email,
          newPassword: values.newPassword,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setLoadin(false);
        toast.success("Code verified successfully");
        navigate("/login");
        localStorage.setItem("tokenNewPass", response.data.token);
        console.log(response);
      } else {
        setLoadin(false);
        toast.error("Invalid code, please try again");
      }
    } catch (error) {
      setLoadin(false);
      toast.error(
        error.response?.data?.message || "Server error, please try again later"
      );
      console.log(error);
    } finally {
      setLoadin(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleNewPassword,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-extrabold text-emerald-700 text-center mb-2">
          Reset Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email and your new password below.
        </p>

        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              id="email"
              name="email"
              type="email"
              placeholder="ahmedmutti@gmail.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
              defaultValue="ahmedmutti@gmail.com"
            />
          </div>
          {formik.errors.email && formik.touched.email && (
            <HelperText className="mt-2 text-center text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2 shadow-sm animate-slide-in">
              {formik.errors.email}
            </HelperText>
          )}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Ahmed@123"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
              defaultValue="Ahmed@123"
            />
          </div>
          {formik.errors.newPassword && formik.touched.newPassword && (
            <HelperText className="mt-2 text-center text-sm font-medium !text-black bg-red-300 border border-red-200 rounded-md px-3 py-2 shadow-sm animate-slide-in">
              {formik.errors.newPassword}
            </HelperText>
          )}
          <button
            type="submit"
            className="w-full cursor-pointer mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all"
          >
            {login ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Save New Password"
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Password must be at least 8 characters and include a number and a
            special character.
          </p>
        </form>
      </div>
    </div>
  );
}
