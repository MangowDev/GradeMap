import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import { FaGear, FaUser } from "react-icons/fa6";
import { fetchUsername } from "../../../utils/nav/navApi";
import { MdGrade } from "react-icons/md";
import { Link } from "react-router-dom";

export default function NavUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const menuRef = useRef();

  const toggleMenu = () => setIsOpen(!isOpen);

  const userRole = localStorage.getItem("user_role");
  
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const name = await fetchUsername();
      if (name) setUsername(name);
    };
    getUser();
  }, []);

  return (
    <div className="absolute right-6" ref={menuRef}>
      <div
        onClick={toggleMenu}
        className="flex flex-row items-center space-x-3 text-primary text-2xl font-sansation font-semibold px-4 py-3 rounded-xl hover:bg-white/30 hover:cursor-pointer transition-colors duration-200"
      >
        <FaUserCircle size={36} />
        <span>{username || "User"}</span>
      </div>

      <div
        className={`absolute right-0 mt-2 py-3 px-5 w-60 border-2 border-details bg-gradient-to-b from-secondary to-cuaternary rounded-md shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <ul className="font-rubik text-lg text-white">
          <div className="flex flex-col space-y-3 mt-1">
            <li>
              <Link to={`/user/edit/${userId}`} className="flex flex-row items-center space-x-3 px-3 py-2 hover:bg-white/30 rounded-md cursor-pointer">
                <FaUser size={22} />
                <span>Perfil</span>
              </Link>
            </li>
            {userRole === "teacher" && (
              <li>
                <Link to={`/teacher/subjects/${userId}`} className="flex flex-row items-center space-x-2 px-3 py-2 hover:bg-white/30 rounded-md cursor-pointer">
                  <MdGrade size={32} />
                  <span>Calificaciones</span>
                </Link>
              </li>
            )}
            <div className="w-full h-[2px] mt-1 bg-details"></div>
          </div>
          <li className="pt-10 pb-3 cursor-pointer">
            <LogoutButton />
          </li>
        </ul>
      </div>
    </div>
  );
}
