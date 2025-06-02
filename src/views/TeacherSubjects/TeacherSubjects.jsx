import React, { useEffect, useState } from "react";
import Navbar from "../../components/bars/Navbar/Navbar";
import Footer from "../../components/bars/footer/Footer";
import SubjectSelectCard from "../../components/subjects/SubjectSelectCard";
import { fetchSubjects } from "../../utils/subjects/subjectsApi";

export default function TeacherSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllSubjects, setShowAllSubjects] = useState(false);

  const userId = parseInt(localStorage.getItem("user_id"), 10);

  useEffect(() => {
    const getSubjects = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchSubjects();

        // Solo las asignaturas del profesor actual
        const filtered = data.filter(
          (subject) => subject.teacher_id === userId
        );

        const formatted = filtered.map((subject) => ({
          id: subject.id,
          name: subject.name,
          image: subject.image,
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
  }, [userId]);

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow px-8 py-12">
        <div className="w-full flex flex-col justify-center items-center font-sansation space-y-5 text-details2 text-5xl font-bold">
          <h1>Mis asignaturas</h1>
          <div className="w-full h-1.5 bg-cuaternary border-1 rounded-lg border-details"></div>
        </div>

        {error && (
          <p className="text-red-500 text-center mt-8 text-xl">{error}</p>
        )}

        {isLoading ? (
          <div className="font-rubik mt-12 text-white text-center space-x-7 text-2xl flex flex-row items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
            <span>Cargando asignaturas...</span>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {(showAllSubjects ? subjects : subjects.slice(0, 8)).map(
              (subject) => (
                <SubjectSelectCard
                  key={subject.id}
                  image={subject.image}
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
      </main>
      <Footer />
    </div>
  );
}
