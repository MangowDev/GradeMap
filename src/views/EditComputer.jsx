import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/bars/Navbar/Navbar";
import Footer from "../components/bars/footer/Footer";
import EditComputerForm from "../components/computers/form/EditComputerForm";
import { getComputerById } from "../utils/computers/computersApi";

export default function EditComputer() {
  const [computer, setComputer] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchComputer = async () => {
      try {
        const response = await getComputerById(id);
        setComputer(response);
      } catch (error) {
        console.error("Error al obtener el ordenador:", error);
      }
    };
    fetchComputer();
  }, [id]);

  if (!computer) {
    return (
      <div className="min-h-screen flex flex-col bg-secondary">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <h1 className="text-4xl text-details2 font-sansation">Cargando...</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow">
        <EditComputerForm computer={computer} />
      </main>
      <Footer />
    </div>
  );
}
