import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/bars/Navbar/Navbar";
import Footer from "../../components/bars/footer/Footer";
import { getSubjectById } from "../../utils/subjects/subjectsApi";
import ReadOnlySubjectForm from "../../components/subjects/forms/ReadOnlySubjectForm";

export default function SubjectDetails() {
  const [subject, setSubject] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const data = await getSubjectById(id);
        setSubject(data);
      } catch (error) {
        console.error("Error al obtener la asignatura:", error);
      }
    };

    fetchSubject();
  }, [id]);

  if (!subject) {
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
        <ReadOnlySubjectForm subject={subject} />
      </main>
      <Footer />
    </div>
  );
}
