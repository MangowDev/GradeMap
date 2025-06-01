import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/bars/Navbar/Navbar";
import Footer from "../../components/bars/footer/Footer";
import SubjectInfo from "../../components/subjects/SubjectInfo";
import SubjectUser from "../../components/subjects/SubjectUser";
import Table from "../../components/shared/Table";

import {
  getSubjectById,
  getSubjectUsersById,
} from "../../utils/subjects/subjectsApi";

import { getGradeBySubjectId } from "../../utils/grades/gradesApi";
import { deleteGrade } from "../../utils/grades/gradesApi";

export default function SubjectList() {
  const [subject, setSubject] = useState(null);
  const [users, setUsers] = useState([]);
  const [grades, setGrades] = useState([]);
  const [activeTab, setActiveTab] = useState("students");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const userRole = localStorage.getItem("user_role");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const subjectData = await getSubjectById(id);
        const subjectUsers = await getSubjectUsersById(id);

        setSubject(subjectData);
        setUsers(subjectUsers);
      } catch (err) {
        console.error("Error loading subject data:", err);
        setError("Error al cargar la información de la asignatura.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchGrades = async () => {
      if (activeTab === "grades") {
        try {
          setIsLoading(true);
          const gradesData = await getGradeBySubjectId(id);
          setGrades(gradesData);
        } catch (err) {
          console.error("Error loading grades:", err);
          setError("Error al cargar las calificaciones.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchGrades();
  }, [activeTab, id]);

  const tableData = grades.map((grade) => ({
    id: grade.id,
    name: grade.name ?? "Sin nombre",
    grade: grade.grade ?? "Sin nota",
    type: grade.type ?? "Sin tipo",
    user: grade.user?.name ?? "Sin usuario",
  }));

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Nombre", accessorKey: "name" },
    { header: "Nota", accessorKey: "grade" },
    { header: "Tipo", accessorKey: "type" },
    { header: "Alumno", accessorKey: "user" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow space-y-10 px-8 py-12">
        {error ? (
          <p className="text-red-500 text-xl text-center">{error}</p>
        ) : isLoading && activeTab === "students" ? (
          <div className="font-rubik mt-6 text-white text-center space-x-7 text-2xl flex flex-row items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
            <span>Cargando...</span>
          </div>
        ) : (
          subject && <SubjectInfo data={subject} users={users} />
        )}

        <div className="flex flex-col w-full justify-center items-center space-y-5">
          <h2 className="text-4xl text-white font-sansation">
            Alumnos y Calificaciones
          </h2>
        </div>

        <div className="flex flex-col space-y-8 font-rubik items-center justify-center w-full rounded-lg border-details border-2 bg-cuaternary">
          <div className="flex w-full flex-row text-center items-center justify-between font-sansation text-2xl text-details2">
            <div
              onClick={() => setActiveTab("students")}
              className={`w-1/2 rounded-b-lg py-3 hover:bg-details hover:cursor-pointer ${
                activeTab === "students" ? "bg-details" : ""
              }`}
            >
              <span>Alumnos</span>
            </div>
            <div
              onClick={() => setActiveTab("grades")}
              className={`w-1/2 rounded-b-lg py-3 hover:bg-details hover:cursor-pointer ${
                activeTab === "grades" ? "bg-details" : ""
              }`}
            >
              <span>Calificaciones</span>
            </div>
          </div>

          <div className="w-full p-6 space-y-6">
            {isLoading ? (
              <div className="font-rubik mt-6 text-white text-center space-x-7 text-2xl flex flex-row items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                <span>Cargando...</span>
              </div>
            ) : activeTab === "students" ? (
              users.map((user) => <SubjectUser key={user.id} user={user} />)
            ) : (
              <Table
                data={tableData}
                columns={columns}
                url={"grade"}
                onDeleteItem={deleteGrade}
                userRole={userRole}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
