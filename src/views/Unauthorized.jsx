import React from "react";
import Navbar from "../components/bars/Navbar/Navbar";
import Footer from "../components/bars/footer/Footer";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow">
        <div className="w-full flex flex-col mt-30 mb-10 items-center justify-center space-y-10">
          <h3 className="text-5xl text-details2">
            No tienes permiso para entrar en esta página.
          </h3>
          <Link
            to="/home"
            className="w-72 flex justify-center items-center text-white text-2xl font-rubik font-semibold px-3 py-[5px] rounded-sm transition-colors duration-200 bg-primary hover:bg-orange-400 hover:cursor-pointer"
          >
            <span
              style={{ textShadow: "1px 2px 2px rgba(0, 0, 0, 0.7)" }}
              className="text-center"
            >
              Volver a inicio
            </span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
