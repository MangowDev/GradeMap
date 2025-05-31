import React from "react";

export default function MapButton({ top, left, right, bottom, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`absolute 
        ${top || ""} 
        ${left || ""} 
        ${right || ""} 
        ${bottom || ""} 
        bg-details font-rubik hover:cursor-pointer text-details2 px-4 py-2 rounded-lg hover:bg-lightblue2 transition-all ease-in-out 300`}
    >
      {text}
    </button>
  );
}
