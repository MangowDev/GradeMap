import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/bars/Navbar/Navbar";
import Footer from "../components/bars/footer/Footer";
import { getClassroomById } from "../utils/classrooms/classroomsApi";
import EditClassroomForm from "../components/classroom/form/EditClassroomForm";

export default function EditClassroom() {
  const [classroom, setClassroom] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const response = await getClassroomById(id);
        setClassroom(response);
      } catch (error) {
        console.error("Error al obtener el aula:", error);
      }
    };
    fetchClassroom();
  }, [id]);

  if (!classroom) {
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
        <EditClassroomForm classroom={classroom} />
      </main>
      <Footer />
    </div>
  );
}
