import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/bars/Navbar/Navbar";
import Footer from "../../components/bars/footer/Footer";
import { getBoardById } from "../../utils/boards/boardsApi";
import ReadOnlyTableForm from "../../components/tables/forms/ReadOnlyTableForm";

export default function TableDetails() {
  const [table, setTable] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const response = await getBoardById(id);
        setTable(response);
      } catch (error) {
        console.error("Error al obtener la mesa:", error);
      }
    };

    fetchTable();
  }, [id]);

  if (!table) {
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
        <ReadOnlyTableForm board={table} />
      </main>
      <Footer />
    </div>
  );
}
