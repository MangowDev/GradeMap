import Navbar from "../components/bars/Navbar/Navbar";
import Footer from "../components/bars/footer/Footer";
import React, { useEffect, useState } from "react";
import { fetchAllUsersWithClassrooms } from "../utils/users/usersApi.js";
import { UsersCarousel } from "../components/users/carrousel/UsersCarousel";
import "../components/users/carrousel/carousel.css";
import Table from "../components/shared/Table.jsx";
import { deleteUser } from "../utils/users/usersApi.js";
import CreateNewButton from "../components/shared/CreateNewButton.jsx";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const userRole = localStorage.getItem("user_role");
  useEffect(() => {
    const getUsersWithClassrooms = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const usersWithClassrooms = await fetchAllUsersWithClassrooms();

        setUsers(usersWithClassrooms);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error al cargar los datos. Por favor intenta nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    getUsersWithClassrooms();
  }, []);

  const recentUsers = [...users]
    .sort((a, b) => new Date(b.user.created_at) - new Date(a.user.created_at))
    .slice(0, 10);

  const usersWithClassrooms = recentUsers.map(({ user, classroom }) => ({
    ...user,
    classroom: classroom ? classroom.name : "Sin clase asignada",
    computer_id: user.computer_id || "N/A",
  }));

  const columns = [
    { header: "Id", accessorKey: "id" },
    { header: "Nombre", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Clase", accessorKey: "classroom" },
    { header: "Ordenador", accessorKey: "computer_id" },
    { header: "Rol", accessorKey: "role" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow px-8 py-12">
        <div className="w-full flex flex-col font-sansation space-y-5 text-details2 text-5xl font-bold">
          <h1>Pagina de usuarios</h1>
          <div className="w-full h-1.5 bg-cuaternary border-1 rounded-lg border-details"></div>
        </div>

        {error && (
          <div className="mt-5 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="flex flex-col space-y-5">
          <div className="w-full flex flex-col mt-10 border-2 py-4 px-10 rounded-lg border-details bg-cuaternary">
            <div className="flex flex-col w-full justify-center items-center space-y-5">
              <h2 className="text-4xl text-white font-sansation">
                Últimos usuarios
              </h2>
              <div className="w-full h-1.5 bg-tertiary border-1 rounded-lg border-primary"></div>
            </div>
            <div className="w-full flex flex-row justify-center items-center my-5">
              <UsersCarousel users={usersWithClassrooms} />
            </div>
          </div>

          <div className="w-full flex flex-col mt-10 border-2 py-4 px-10 rounded-lg border-details bg-cuaternary">
            <div className="flex flex-col w-full justify-center items-center space-y-5">
              <h2 className="text-4xl text-white font-sansation">
                Tabla de usuarios
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
                  data={usersWithClassrooms}
                  columns={columns}
                  url={"user"}
                  onDeleteItem={deleteUser}
                  userRole={userRole}
                />
              )}
            </div>
            <CreateNewButton url="create" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
