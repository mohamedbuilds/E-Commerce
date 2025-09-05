import React, { useContext } from "react";
import { Footer } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function MyFooter() {
  let { userLogin } = useContext(UserContext);
  return (
    <Footer
      container
      className="rounded-none fixed bottom-0 bg-gray-100 shadow mt-10"
    >
      <div className="w-full text-center">
        {/* Links */}
        {userLogin !== null ? (
          <>
            {" "}
            <div className="flex justify-center gap-6 mb-3">
              <NavLink to="/" className="text-gray-600 hover:text-blue-600">
                Home
              </NavLink>
              <NavLink
                to="/products"
                className="text-gray-600 hover:text-blue-600"
              >
                Products
              </NavLink>
              <NavLink
                to="/categories"
                className="text-gray-600 hover:text-blue-600"
              >
                Categories
              </NavLink>
              <NavLink
                to="/brands"
                className="text-gray-600 hover:text-blue-600"
              >
                Brands
              </NavLink>
              <NavLink to="/cart" className="text-gray-600 hover:text-blue-600">
                Cart
              </NavLink>
            </div>
          </>
        ) : null}
        {/* CopyRight */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} FreshCart™. All Rights Reserved.
        </p>
      </div>
    </Footer>
  );
}
