import React, { useEffect, useState } from "react";
import Navbar from "../components/bars/Navbar/Navbar";
import Footer from "../components/bars/footer/Footer";
import Table from "../components/shared/Table.jsx";
import { fetchComputersWithDetails } from "../utils/computers/computersApi.js";
import CreateNewButton from "../components/shared/CreateNewButton.jsx";
import { deleteComputer } from "../utils/computers/computersApi.js";

export default function Computers() {
  const [computers, setComputers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const userRole = localStorage.getItem("user_role");
  useEffect(() => {
    const getComputers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchComputersWithDetails();

        const formatted = data.map((computer) => ({
          id: computer.id,
          board: computer.board?.id || "Sin mesa",
          classroom: computer.board?.classroom?.name || "Sin clase",
          user: computer.user?.name || "Sin usuario",
        }));

        setComputers(formatted);
      } catch (err) {
        console.error("Error:", err);
        setError("Error al cargar ordenadores.");
      } finally {
        setIsLoading(false);
      }
    };

    getComputers();
  }, []);

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Mesa", accessorKey: "board" },
    { header: "Aula", accessorKey: "classroom" },
    { header: "Usuario asignado", accessorKey: "user" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow px-8 py-12">
        <div className="w-full flex flex-col font-sansation space-y-5 text-details2 text-5xl font-bold">
          <h1>Página de ordenadores</h1>
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
              Tabla de ordenadores
            </h2>
            <div className="w-full h-1.5 bg-tertiary border-1 rounded-lg border-primary"></div>
          </div>{" "}
          <div className="my-5">
            {isLoading ? (
              <div className="font-rubik mt-6 text-white text-center space-x-7 text-2xl flex flex-row items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                <span>Cargando...</span>
              </div>
            ) : (
              <Table
                data={computers}
                columns={columns}
                url={"computer"}
                onDeleteItem={deleteComputer}
                userRole={userRole}
              />
            )}{" "}
          </div>
          <CreateNewButton url="create" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
