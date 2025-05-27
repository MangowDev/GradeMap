import React, { useState } from "react";
import SecondDAWMap from "./maps/SecondDAWMap";

export default function ClassroomMap({ image, title }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-between space-y-5 py-8 px-10 rounded-xl bg-cuaternary border-2 border-details">
      <div className="flex flex-col w-full items-center justify-center space-y-4">
        <img className="w-[90%] h-96" src={image} alt={title} />
        <h3 className="font-sansation font-bold text-center text-details2 text-3xl mt-3">
          {title}
        </h3>
      </div>

      <button
        className="w-full group font-sansation font-bold rounded-md p-2 mt-4 text-white text-2xl bg-lightblue2 flex items-center justify-center gap-3 hover:bg-details2 hover:text-details transition-colors duration-300 ease-in-out"
        onClick={() => setIsModalOpen(true)}
      >
        Ver mapa
      </button>

      <SecondDAWMap isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <img src={image} alt={title} className="w-full h-auto rounded" />
      </SecondDAWMap>
    </div>
  );
}
