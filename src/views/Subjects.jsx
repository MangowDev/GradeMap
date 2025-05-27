import React, { useEffect, useState } from "react";
import Navbar from "../components/bars/Navbar/Navbar";
import Footer from "../components/bars/footer/Footer";
import Table from "../components/shared/Table.jsx";
import CreateNewButton from "../components/shared/CreateNewButton.jsx";
import { fetchSubjects, deleteSubject } from "../utils/subjects/subjectsApi.js";
import SubjectSelectCard from "../components/subjects/SubjectSelectCard.jsx";
import MontajeImg from "../assets/subjects_images/Montaje.png";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllSubjects, setShowAllSubjects] = useState(false);

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

        <div className="flex flex-col space-y-5">
          <div className="w-full flex flex-col mt-10 py-4 px-10">
            <div className="flex flex-col w-full justify-center items-center space-y-5">
              <h2 className="text-4xl text-white font-sansation">
                Asignaturas
              </h2>
              <div className="w-full h-1.5 bg-tertiary border-1 rounded-lg border-primary"></div>
            </div>
            {isLoading ? (
              <div className="font-rubik mt-6 text-white text-center text-2xl flex flex-row items-center justify-center">
                <span>Cargando...</span>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 px-10">
                {(showAllSubjects ? subjects : subjects.slice(0, 8)).map(
                  (subject) => (
                    <SubjectSelectCard
                      key={subject.id}
                      image={MontajeImg}
                      id={subject.id}
                      title={subject.name}
                    />
                  )
                )}
              </div>
            )}
            {subjects.length > 8 && (
              <div className="mt-8 w-full flex flex-row justify-center items-center">
                <button
                  onClick={() => setShowAllSubjects((prev) => !prev)}
                  className="bg-secondary text-primary font-sansation text-2xl px-6 py-2 rounded-md hover:bg-cuaternary hover:text-tertiary hover:cursor-pointer transition duration-200"
                >
                  {showAllSubjects ? "Ver menos" : "Ver más"}
                </button>
              </div>
            )}
          </div>

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
        </div>
      </main>
      <Footer />
    </div>
  );
}
