import Navbar from "../components/bars/Navbar/Navbar";
import Footer from "../components/bars/footer/Footer";
import React, { useEffect, useState } from "react";
import {
  fetchRecentUsers,
  fetchUserClassroom,
} from "../utils/users/usersApi.js";
import { UsersCarousel } from "../components/users/carrousel/UsersCarousel";
import "../components/users/carrousel/carousel.css";
import Table from "../components/shared/Table.jsx";
import CreateNewButton from "../components/shared/CreateNewButton.jsx";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [classroomCache, setClassroomCache] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsersAndClassrooms = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const recentUsers = await fetchRecentUsers();
        setUsers(recentUsers);

        const classrooms = await Promise.all(
          recentUsers.map((user) => fetchUserClassroom(user.id))
        );

        const newCache = {};
        recentUsers.forEach((user, index) => {
          newCache[user.id] = classrooms[index]?.classroom || null;
        });

        setClassroomCache(newCache);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error al cargar los datos. Por favor intenta nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    getUsersAndClassrooms();
  }, []);

  const usersWithClassrooms = users.map((user) => ({
    ...user,
    classroom: classroomCache[user.id]?.name || "Sin clase asignada",
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
          <h1>Users page</h1>
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
              <h2 className="text-4xl text-white font-sansation">Last users</h2>
              <div className="w-full h-1.5 bg-tertiary border-1 rounded-lg border-primary"></div>
            </div>
            <div className="w-full flex flex-row justify-center items-center my-5">
              <UsersCarousel users={users} classroomCache={classroomCache} />
            </div>
          </div>

          <div className="w-full flex flex-col mt-10 border-2 py-4 px-10 rounded-lg border-details bg-cuaternary">
            <div className="flex flex-col w-full justify-center items-center space-y-5">
              <h2 className="text-4xl text-white font-sansation">User list</h2>
              <div className="w-full h-1.5 bg-tertiary border-1 rounded-lg border-primary"></div>
            </div>
            <div className="my-5">
              {isLoading ? (
                <div className="font-rubik text-white text-center text-2xl flex flex-row items-center justify-center">
                  <span>Loading...</span>
                </div>
              ) : (
                <Table data={usersWithClassrooms} columns={columns} />
              )}{" "}
            </div>
              <CreateNewButton url="create"/>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
