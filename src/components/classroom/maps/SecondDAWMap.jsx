import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa6";

export default function SecondDAWMap({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-8 right-8 z-50 text-7xl text-white hover:text-primary hover:cursor-pointer transition-all ease-in-out
            bg-opacity-80 hover:bg-opacity-100 rounded-full w-14 h-14 flex items-center justify-center"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0, ease: "easeInOut" }}
          >
            ×
          </motion.button>
          <div className="flex flex-col items-center justify-center">
            <motion.div
              className="rounded-lg overflow-hidden max-w-7xl w-full shadow-xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {children}
            </motion.div>{" "}
            <button
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
              className="group font-sansation font-bold rounded-md mt-10 p-2 text-white w-[90%] text-2xl bg-lightblue2 flex items-center justify-center gap-3 transition-all duration-600 ease-in-out hover:bg-primary hover:cursor-pointer hover:rounded-xl hover:shadow-2xl hover:scale-[1.02]"
            >
              <span className="opacity-0 group-hover:opacity-100 transform -rotate-90 group-hover:rotate-0 transition-all duration-600 ease-in-out">
                <FaPlus />
              </span>
              Aplicar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
