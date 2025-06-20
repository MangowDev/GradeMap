import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/bars/Navbar/Navbar";
import Footer from "../../components/bars/footer/Footer";
import ReadOnlyGradeForm from "../../components/grades/form/ReadOnlyGradeForm";
import { getGradeById } from "../../utils/grades/gradesApi";

export default function GradeDetails() {
  const [grade, setGrade] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchGrade = async () => {
      try {
        const response = await getGradeById(id);
        setGrade(response);
      } catch (error) {
        console.error("Error al obtener la nota:", error);
      }
    };

    fetchGrade();
  }, [id]);

  if (!grade) {
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
        <ReadOnlyGradeForm gradeData={grade} />
      </main>
      <Footer />
    </div>
  );
}
