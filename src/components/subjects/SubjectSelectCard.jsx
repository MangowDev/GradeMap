import React from "react";

export default function SubjectSelectCard({ image, title }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 py-8 px-10 rounded-xl bg-cuaternary border-2 border-details shadow-2xl">
      <img className="w-64 h-64" src={image} />
      <h3 className="font-sansation font-bold text-details2 text-2xl mt-3">{title}</h3>
      <button
        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
        className="group font-sansation font-bold rounded-md p-2 mt-4 text-white w-full text-2xl bg-lightblue2 flex items-center justify-center gap-3 transition-all duration-600 ease-in-out hover:bg-primary hover:cursor-pointer hover:rounded-xl hover:shadow-2xl hover:scale-[1.02]"
      >
        Ver más
      </button>
    </div>
  );
}
