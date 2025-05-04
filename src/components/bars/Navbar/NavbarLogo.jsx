import React from "react";
import GrademapLogo from "../../../assets/logo/GradeMapLogo.png";
import { Link } from "react-router-dom";

export default function NavbarLogo() {
  return (
    <Link to="/home">
      <img
        src={GrademapLogo}
        alt="grademaplogo"
        className="w-26 h-26 transition duration-200 ease-in-out filter hover:brightness-125 max-w-none"
      />
    </Link>
  );
}