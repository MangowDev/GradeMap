import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { updateComputer } from "../../../utils/computers/computersApi";

export default function SelectComputerModal({
  availableComputers = [],
  selectedBoard,
  onAddComputer,
  onClose,
}) {
  const [selectedComputer, setSelectedComputer] = useState(null);
  const [error, setError] = useState(null);
  
  const filteredComputers = availableComputers.filter(
    computer => !computer.board_id
  );
  

  const handleApply = async () => {
    if (!selectedComputer) {
      setError("Por favor selecciona un ordenador");
      return;
    }

    if (selectedBoard.computers.length >= selectedBoard.size) {
      setError(`La mesa ya tiene el máximo de ordenadores (${selectedBoard.size})`);
      return;
    }

    try {
      setError(null);
      await updateComputer(selectedComputer.id, { 
        board_id: selectedBoard.id 
      });
      onAddComputer();
      onClose();
    } catch (err) {
      setError("Error al añadir el ordenador");
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/60"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          bg-details w-150 h-150 text-white px-5 py-4 rounded-xl shadow-2xl z-60 overflow-auto border-2 border-lightblue"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex flex-row justify-between w-full mb-3 py-2 border-b-2 text-xl font-sansation font-bold">
            <h2>Selecciona un ordenador</h2>
            <h2 className="text-tertiary">
              Mesa: {selectedBoard?.id}
            </h2>
          </div>

          {error && (
            <p className="text-red-500 text-center mb-3 font-sansation">
              {error}
            </p>
          )}

          <ul className="space-y-2 max-h-[430px] font-rubik overflow-y-auto">
            {filteredComputers.length > 0 ? (
              filteredComputers.map(computer => (
                <li
                  key={computer.id}
                  onClick={() => setSelectedComputer(computer)}
                  className={`cursor-pointer p-2 mr-5 rounded ${
                    selectedComputer?.id === computer.id
                      ? "bg-tertiary border-1 border-primary text-black font-bold"
                      : "hover:bg-white/30 rounded-md cursor-pointer font-sansation font-bold"
                  }`}
                >
                  Ordenador {computer.id}
                </li>
              ))
            ) : (
              <li className="text-center py-4 font-sansation">
                No hay ordenadores disponibles
              </li>
            )}
          </ul>

          <div className="w-full flex flex-row justify-between">
            <button
              onClick={onClose}
              className="text-white text-xl font-rubik font-semibold mt-7 px-5 py-[5px] bg-primary rounded-md hover:bg-orange-400 hover:cursor-pointer transition-colors duration-200"
            >
              <span className="drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]">Cerrar</span>
            </button>
            <button
              onClick={handleApply}
              disabled={!selectedComputer}
              className={`text-white text-xl font-rubik font-semibold mt-7 px-5 py-[5px] bg-primary rounded-md hover:bg-orange-400 hover:cursor-pointer transition-colors duration-200 ${
                !selectedComputer && "opacity-50 cursor-not-allowed"
              }`}
            >
              <span className="drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]">Añadir</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}