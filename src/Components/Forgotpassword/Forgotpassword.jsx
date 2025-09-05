import React, { useState } from "react";
import { Button, HelperText, Label, TextInput } from "flowbite-react";

import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [loading, setloading] = useState(false);
  const [loadingCode, setLoadingCode] = useState(false);
  const navigate = useNavigate();
  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    resetCode: Yup.string().notRequired(),
  });

  async function handlesForget(values) {
    try {
      setloading(true);
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        {
          email: values.email,
        }
      );
      console.log(response);
      if (response.data.statusMsg == "success") {
        setloading(false);
        toast.success(response.data.message);
      } else {
        setloading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      setloading(false);
      toast.error(
        error.response?.data?.message || "Server error, please try again later"
      );
    } finally {
      setloading(false);
    }
  }

  async function handleRecentCode(values) {
    try {
      setLoadingCode(true);
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        {
          resetCode: values.resetCode,
        }
      );
      console.log(response.data.status);
      if (response.data.status == "Success") {
        setLoadingCode(false);
        toast.success("Code verified successfully");
        navigate("/resetpassword");
      } else {
        setLoadingCode(false);
        toast.error("Invalid code, please try again");
      }
    } catch (error) {
      setLoadingCode(false);
      toast.error(
        error.response?.data?.message || "Server error, please try again later"
      );
    } finally {
      setLoadingCode(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      resetCode: "",
    },
    validationSchema,
    onSubmit: handlesForget,
  });

  return (
    <div className="flex py-16  justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md shadow-lg border border-gray-100 rounded-2xl">
        {/* العنوان */}
        <h2 className="text-3xl font-extrabold text-emerald-800 text-center mb-2">
          Forgot Password 🔒
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Don’t worry! Just enter your email and we’ll send you a reset link.
        </p>

        {/* الفورم */}
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          {/* Email */}
          <div>
            <Label
              htmlFor="email"
              value="Email Address"
              className="mb-2 block text-gray-700 font-medium"
            />
            <TextInput
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              id="email"
              type="email"
              placeholder="name@example.com"
              className="focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {formik.errors.email && formik.touched.email && (
            <HelperText className="mt-2 text-center text-sm font-medium !text-black bg-red-300 border border-red-200 rounded-md px-3 py-2 shadow-sm animate-slide-in">
              {formik.errors.email}
            </HelperText>
          )}

          {/* Reset Code */}
          <div>
            <Label htmlFor="resetCode" value="Reset Code" />
            <TextInput
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.resetCode}
              id="resetCode"
              type="text"
              placeholder="Enter reset code"
            />
          </div>
          {formik.errors.resetCode && formik.touched.resetCode && (
            <HelperText className="mt-2 text-center text-sm font-medium !text-black bg-red-300 border border-red-200 rounded-md px-3 py-2 shadow-sm animate-slide-in">
              {formik.errors.resetCode}
            </HelperText>
          )}
          {/* زر الإرسال */}
          <Button
            type="submit"
            className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Send Reset Link"
            )}
          </Button>

          {/* زر ارسال الايميل */}
          <Button
            onClick={() => handleRecentCode(formik.values)}
            type="button"
            className="w-full bg-blue-700 cursor-pointer hover:bg-emerald-700 text-white"
          >
            {loadingCode ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Verify Code"
            )}
          </Button>
        </form>

        {/* رجوع للوجين */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Remember your password?
          <a
            href="/login"
            className="!text-emerald-600 hover:text-emerald-700 hover:underline font-semibold"
          >
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}
