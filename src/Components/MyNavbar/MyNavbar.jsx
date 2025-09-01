import React, { useContext } from "react";
import logo from "../../assets/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { UserContext } from "../../Context/UserContext";

export default function MyNavbar() {
  let navgiate = useNavigate();
  let { userLogin, setuserLogin } = useContext(UserContext);

  function signOut() {
    localStorage.removeItem("token");
    setuserLogin(null);
    navgiate("/login");
  }

  return (
    <Navbar className=" fixed start-0 end-0 top-0bg-white shadow-md border-b border-gray-200 z-50">
      {/* Logo */}
      <NavbarBrand as={NavLink} to="/">
        <img
          src={logo}
          className="mr-3 h-10 w-[160px] object-contain"
          alt="FreshCart Logo"
        />
      </NavbarBrand>
      <NavbarToggle className="cursor-pointer" />
      {/* Links */}
      <NavbarCollapse>
        {userLogin != null ? (
          <>
            <NavbarLink as={NavLink} to="/" active>
              Home
            </NavbarLink>
            <NavbarLink as={NavLink} to="/products">
              Products
            </NavbarLink>
            <NavbarLink as={NavLink} to="/categories">
              Categories
            </NavbarLink>
            <NavbarLink as={NavLink} to="/brands">
              Brands
            </NavbarLink>
            <NavbarLink as={NavLink} to="/cart">
              Cart
            </NavbarLink>
          </>
        ) : null}

        {/* Auth Links */}

        {userLogin !== null ? (
          <>
            <NavbarLink onClick={signOut} className="cursor-pointer">
              Sign Out
            </NavbarLink>
          </>
        ) : (
          <>
            <NavbarLink as={NavLink} to="/login">
              Login
            </NavbarLink>
            <NavbarLink as={NavLink} to="/register">
              Register
            </NavbarLink>
          </>
        )}
      </NavbarCollapse>
    </Navbar>
  );
}
