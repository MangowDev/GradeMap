import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../../components/bars/Navbar/Navbar";
import Footer from "../../components/bars/footer/Footer";
import UserGradeInfo from "../../components/users/UserGradeInfo";
import { getUserGrades, getUserById } from "../../utils/users/usersApi";
import { deleteGrade } from "../../utils/grades/gradesApi";
import Table from "../../components/shared/Table";
import CreateNewButton from "../../components/shared/CreateNewButton";

export default function UserGrades() {
  const { id } = useParams();
  const location = useLocation();

  const [grades, setGrades] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [gradesData, userData] = await Promise.all([
          getUserGrades(id),
          getUserById(id),
        ]);
        setGrades(gradesData);
        setUser(userData);
      } catch (err) {
        setError("Error al obtener los datos del usuario.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const tableData = grades.map((grade) => ({
    id: grade.id,
    name: grade.name ?? "Sin nombre",
    grade: grade.grade ?? "Sin nota",
    type: grade.type ?? "Sin tipo",
    subject: grade.subject?.name ?? "Sin asignatura",
  }));

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Nombre", accessorKey: "name" },
    { header: "Nota", accessorKey: "grade" },
    { header: "Tipo", accessorKey: "type" },
    { header: "Asignatura", accessorKey: "subject" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow px-8 py-12">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : user && grades && !isLoading ? (
          <UserGradeInfo user={user} grades={grades} />
        ) : (
          <div className="font-rubik mt-6 text-white text-center space-x-7 text-2xl flex flex-row items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
            <span>Cargando...</span>
          </div>
        )}

        <div className="mt-10 border-2 py-4 px-10 rounded-lg border-details bg-cuaternary">
          <div className="flex flex-col w-full justify-center items-center space-y-5">
            <h2 className="text-4xl text-white font-sansation">
              Notas del usuario
            </h2>
            <div className="w-full h-1.5 bg-tertiary border-1 rounded-lg border-primary"></div>
          </div>
          <div className="my-5">
            {isLoading ? (
              <div className="font-rubik mt-6 text-white text-center space-x-7 text-2xl flex flex-row items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                <span>Cargando...</span>
              </div>
            ) : (
              <Table
                data={tableData}
                columns={columns}
                url={"grade"}
                onDeleteItem={deleteGrade}
              />
            )}
          </div>
          <CreateNewButton
            url="/grades/create"
            state={{ from: location.pathname, userId: id }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
