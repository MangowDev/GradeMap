import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CreateNewButton({ url }) {
  return (
    <div className="w-full px-3 mb-3">
      <Link to={url}>
        <button
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          className="group font-sansation font-bold rounded-md p-2 text-white w-full text-2xl bg-lightblue2 flex items-center justify-center gap-3 transition-all duration-600 ease-in-out hover:bg-primary hover:cursor-pointer hover:rounded-xl hover:shadow-2xl hover:scale-[1.02]"
        >
          <span className="opacity-0 group-hover:opacity-100 transform -rotate-90 group-hover:rotate-0 transition-all duration-600 ease-in-out">
            <FaPlus />
          </span>
          Crear nuevo
        </button>
      </Link>
    </div>
  );
}
