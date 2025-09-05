import React from "react";

import { Link } from "react-router-dom";
export default function Notfound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <h1 className="text-9xl font-extrabold text-emerald-700 drop-shadow-lg">
        404
      </h1>

      <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-800">
        Oops! Page Not Found
      </h2>

      <p className="mt-4 text-gray-600 text-center max-w-md">
        The page you’re looking for doesn’t exist or was moved.
      </p>

      <Link
        to="/"
        className="mt-8 inline-block bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-emerald-700 transition-colors duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}
