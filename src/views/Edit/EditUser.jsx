import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/bars/Navbar/Navbar";
import Footer from "../../components/bars/footer/Footer";
import EditUserForm from "../../components/users/form/EditUserForm";
import { getUserById } from "../../utils/users/usersApi";

export default function EditUser() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserById(id);
        console.log(response);
        setUser(response);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };
    fetchUserData();
  }, [id]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-secondary">
        <Navbar />
        <main className="flex-grow">
          <div className="flex flex-row text-4xl text-details2 justify-center items-center py-50 font-sansation">
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
        <EditUserForm user={user} />
      </main>
      <Footer />
    </div>
  );
}
