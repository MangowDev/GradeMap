import React from "react";
import { Link } from "react-router-dom";
import placeholderUser from "../../../assets/placeholder-images/profilepicture.png";

export default function ReadOnlyUserForm({ user }) {
  return (
    <div className="flex flex-row font-rubik items-center justify-center w-full px-20 py-20">
      <div className="flex items-center mb-20 justify-center flex-col w-1/3">
        <div
          className="w-70 h-70 border-4 rounded-full border-details2 bg-center"
          style={{
            backgroundImage: `url(${user.profile_picture || placeholderUser})`,
            backgroundSize: "140%",
          }}
        ></div>

        <div className="mt-6 w-[80%]">
          <label className="block text-xl sm:text-2xl font-medium font-sansation text-details2">
            Ordenador:
          </label>
          <p className="mt-2 text-white text-lg bg-details py-2 px-3 rounded-lg">
            {user.computer_id || "No asignado"}
          </p>
        </div>

        <Link
          to={`/user/grades/${user.id}`}
          className="mt-2 w-[80%] flex flex-row justify-center items-center"
        >
          <button className="group w-[90%] text-2xl text-primary mt-6 p-2 px-4 rounded-lg bg-details hover:cursor-pointer hover:bg-details2 hover:text-details transition-colors duration-300 ease-in-out">
            Ver calificaciones
          </button>
        </Link>
      </div>

      <div className="flex items-center justify-center flex-col w-2/3">
        <div className="w-[90%] max-w-full mx-auto px-4 space-y-6">
          <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 w-full">
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium text-details2">
                Nombre:
              </label>
              <p className="mt-2 text-white text-lg bg-details py-2 px-3 rounded-lg">
                {user.name}
              </p>
            </div>
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium text-details2">
                Apellidos:
              </label>
              <p className="mt-2 text-white text-lg bg-details py-2 px-3 rounded-lg">
                {user.surnames}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 w-full">
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium text-details2">
                Username:
              </label>
              <p className="mt-2 text-white text-lg bg-details py-2 px-3 rounded-lg">
                {user.username}
              </p>
            </div>
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium text-details2">
                DNI:
              </label>
              <p className="mt-2 text-white text-lg bg-details py-2 px-3 rounded-lg">
                {user.dni}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 w-full">
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium text-details2">
                Email:
              </label>
              <p className="mt-2 text-white text-lg bg-details py-2 px-3 rounded-lg">
                {user.email}
              </p>
            </div>
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium text-details2">
                Rol:
              </label>
              <p className="mt-2 text-white text-lg bg-details py-2 px-3 rounded-lg capitalize">
                {user.role}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 w-full">
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium text-details2">
                Contraseña:
              </label>
              <p className="mt-2 text-white text-lg bg-details py-2 px-3 rounded-lg">
                ••••••••
              </p>
            </div>
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium text-details2">
                Confirmar contraseña:
              </label>
              <p className="mt-2 text-white text-lg bg-details py-2 px-3 rounded-lg">
                ••••••••
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
