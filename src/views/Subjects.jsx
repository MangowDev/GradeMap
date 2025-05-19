import React, { useEffect, useState } from "react";
import Navbar from "../components/bars/Navbar/Navbar";
import Footer from "../components/bars/footer/Footer";
import Table from "../components/shared/Table.jsx";
import CreateNewButton from "../components/shared/CreateNewButton.jsx";
import {
  fetchSubjects,
  deleteSubject,
} from "../utils/subjects/subjectsApi.js";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSubjects = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchSubjects();

        const formatted = data.map((subject) => ({
          id: subject.id,
          name: subject.name,
        }));

        setSubjects(formatted);
      } catch (err) {
        console.error("Error:", err);
        setError("Error al cargar las asignaturas.");
      } finally {
        setIsLoading(false);
      }
    };

    getSubjects();
  }, []);

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Nombre", accessorKey: "name" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow px-8 py-12">
        <div className="w-full flex flex-col font-sansation space-y-5 text-details2 text-5xl font-bold">
          <h1>Página de asignaturas</h1>
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
              Tabla de asignaturas
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
                data={subjects}
                columns={columns}
                url={"subjects"}
                onDeleteItem={deleteSubject}
              />
            )}
          </div>
          <CreateNewButton url="/subjects/create" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
