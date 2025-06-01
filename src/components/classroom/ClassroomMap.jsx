import React, { useState } from "react";
import SecondDAWMap from "./maps/SecondDAWMap";
import FirstDAWMap from "./maps/FirstDAWMap";

export default function ClassroomMap({ image, title }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderMap = () => {
    if (title === "1º DAW") {
      return (
        <FirstDAWMap isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <img src={image} alt={title} className="w-full h-auto rounded" />
        </FirstDAWMap>
      );
    } else if (title === "2º DAW") {
      return (
        <SecondDAWMap isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <img src={image} alt={title} className="w-full h-auto rounded" />
        </SecondDAWMap>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-5 py-8 px-10 rounded-xl bg-cuaternary border-2 border-details">
      <div className="flex flex-col w-full items-center justify-center space-y-4">
        <img className="max-w-200 w-full h-96" src={image} alt={title} />
        <h3 className="font-sansation font-bold text-center text-details2 text-3xl mt-3">
          {title}
        </h3>
      </div>

      <button
        className="w-full group font-sansation font-bold rounded-md p-2 mt-4 text-white text-2xl bg-lightblue2 flex items-center justify-center gap-3 hover:cursor-pointer hover:bg-details2 hover:text-details transition-colors duration-300 ease-in-out"
        onClick={() => setIsModalOpen(true)}
      >
        Ver mapa
      </button>

      {renderMap()}
    </div>
  );
}
