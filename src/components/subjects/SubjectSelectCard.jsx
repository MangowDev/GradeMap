import React from "react";
import { Link } from "react-router-dom";

export default function SubjectSelectCard({id, image, title }) {
  console.log(image);
  
  return (
    <div className="flex flex-col items-center justify-between space-y-5 py-8 px-10 rounded-xl bg-cuaternary border-2 border-details">
      <div className="flex flex-col items-center justify-center space-y-4">
        <img className="w-64 h-64" src={image} />
        <h3 className="font-sansation font-bold text-center text-details2 text-2xl mt-3">
          {title}
        </h3>
      </div>
      <Link className="w-full" to={`/subjects/list/${id}`}>
        <button className="group font-sansation font-bold rounded-md p-2 mt-4 text-white w-full text-2xl bg-lightblue2 flex items-center justify-center gap-3 hover:cursor-pointer hover:bg-details2 hover:text-details transition-colors duration-300 ease-in-out">
          Ver más
        </button>
      </Link>
    </div>
  );
}
