import React, { useEffect, useState } from "react";
import Navbar from "../components/bars/Navbar/Navbar.jsx";
import Footer from "../components/bars/footer/Footer.jsx";
import Table from "../components/shared/Table.jsx";
import CreateNewButton from "../components/shared/CreateNewButton.jsx";
import {
  fetchBoardsWithDetails,
  deleteBoard,
} from "../utils/boards/boardsApi.js";
import { header } from "framer-motion/client";

export default function Tables() {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBoards = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchBoardsWithDetails();

        console.log(data);

        const formatted = data.map((board) => ({
          id: board.id,
          classroom: board.classroom?.name || "Sin aula",
          size: board.size || "No especificado",
          computer:
            board.computers?.length > 0
              ? board.computers.map((c) => c.id).join(", ")
              : "Sin ordenadores",
        }));

        setBoards(formatted);
      } catch (err) {
        console.error("Error:", err);
        setError("Error al cargar las mesas.");
      } finally {
        setIsLoading(false);
      }
    };

    getBoards();
  }, []);

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Aula", accessorKey: "classroom" },
    { header: "Tamaño", accessorKey: "size" },
    { header: "Ordenadores asignados", accessorKey: "computer" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow px-8 py-12">
        <div className="w-full flex flex-col font-sansation space-y-5 text-details2 text-5xl font-bold">
          <h1>Página de mesas</h1>
          <div className="w-full h-1.5 bg-cuaternary border-1 rounded-lg border-details"></div>
        </div>

        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mt-6 border-2 py-4 px-10 rounded-lg border-details bg-cuaternary">
          <div className="flex flex-col w-full justify-center items-center space-y-5">
            <h2 className="text-4xl text-white font-sansation">
              Tabla de mesas
            </h2>
            <div className="w-full h-1.5 bg-tertiary border-1 rounded-lg border-primary"></div>
          </div>
          <div className="my-5">
            {isLoading ? (
              <div className="font-rubik text-white text-center text-2xl flex flex-row items-center justify-center">
                <span>Cargando...</span>
              </div>
            ) : (
              <Table
                data={boards}
                columns={columns}
                url={"table"}
                onDeleteItem={deleteBoard}
              />
            )}
          </div>
          <CreateNewButton url="create" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
