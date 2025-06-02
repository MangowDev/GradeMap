import React, { useState } from "react";
import { IoMdExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../utils/login/loginApi";

export default function LogoutButton() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logoutUser(navigate);
    setLoading(false);
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`flex flex-row items-center space-x-2 w-full text-white text-xl font-rubik font-semibold px-3 py-[5px] rounded-md transition-colors duration-200 ${
        loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-orange-400 hover:cursor-pointer"
      }`}
    >
      <span style={{ textShadow: "1px 2px 2px rgba(0, 0, 0, 0.7)" }}>
        {loading ? "Logging out..." : "Logout"}
      </span>
      {!loading && (
        <IoMdExit style={{ filter: "drop-shadow(1px 2px 2px rgba(0,0,0,0.6))" }} />
      )}
    </button>
  );
}
