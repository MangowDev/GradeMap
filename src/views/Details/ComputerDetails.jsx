import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/bars/Navbar/Navbar";
import Footer from "../../components/bars/footer/Footer";
import ReadOnlyComputerForm from "../../components/computers/form/ReadOnlyComputerForm";
import { getComputerById } from "../../utils/computers/computersApi";

export default function ComputerDetails() {
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
        <main className="flex-grow">
          <div className="flex flex-row text-4xl text-details2 justify-center space-x-10 items-center py-50 font-sansation">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
            <h1>Cargando...</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow">
        <ReadOnlyComputerForm computer={computer} />
      </main>
      <Footer />
    </div>
  );
}
