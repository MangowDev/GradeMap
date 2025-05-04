import React from "react";
import { IoMdExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../utils/login/loginApi";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(navigate);
  };

  return (
    <button
      onClick={handleLogout}
      className="flex flex-row items-center space-x-2 w-full text-white text-xl font-rubik font-semibold px-3 py-[5px] bg-primary rounded-md hover:bg-orange-400 hover:cursor-pointer transition-colors duration-200"
    >
      <span style={{ textShadow: "1px 2px 2px rgba(0, 0, 0, 0.7)" }}>
        Logout
      </span>
      <IoMdExit
        style={{ filter: "drop-shadow(1px 2px 2px rgba(0,0,0,0.6))" }}
      />
    </button>
  );
}
