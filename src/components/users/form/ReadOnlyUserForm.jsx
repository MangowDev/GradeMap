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
          <input
            type="text"
            disabled
            value={
              user.computer_id ? `Ordenador ${user.computer_id}` : "No asignado"
            }
            className="mt-2 font-rubik block w-full rounded-lg bg-details text-lg sm:text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-none cursor-default"
          />
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
          {/** Nombre y Apellidos */}
          <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 w-full">
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium text-details2">
                Nombre:
              </label>
              <input
                type="text"
                disabled
                value={user.name}
                className="mt-2 font-rubik block w-full rounded-lg bg-details text-lg sm:text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-none cursor-default"
              />
            </div>
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium text-details2">
                Apellidos:
              </label>
              <input
                type="text"
                disabled
                value={user.surnames}
                className="mt-2 font-rubik block w-full rounded-lg bg-details text-lg sm:text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-none cursor-default"
              />
            </div>
          </div>

          {/** Username y DNI */}
          <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 w-full">
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium text-details2">
                Username:
              </label>
              <input
                type="text"
                disabled
                value={user.username}
                className="mt-2 font-rubik block w-full rounded-lg bg-details text-lg sm:text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-none cursor-default"
              />
            </div>
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium text-details2">
                DNI:
              </label>
              <input
                type="text"
                disabled
                value={user.dni}
                className="mt-2 font-rubik block w-full rounded-lg bg-details text-lg sm:text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-none cursor-default"
              />
            </div>
          </div>

          {/** Email y Rol */}
          <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 w-full">
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium text-details2">
                Email:
              </label>
              <input
                type="email"
                disabled
                value={user.email}
                className="mt-2 font-rubik block w-full rounded-lg bg-details text-lg sm:text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-none cursor-default"
              />
            </div>
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium text-details2">
                Rol:
              </label>
              <select
                disabled
                value={user.role}
                className="mt-2 font-rubik block w-full rounded-lg bg-details text-lg sm:text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-none cursor-default capitalize"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
          </div>

          {/** Contraseña y Confirmar */}
          <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 w-full">
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium text-details2">
                Contraseña:
              </label>
              <input
                type="password"
                disabled
                value="••••••••"
                className="mt-2 font-rubik block w-full rounded-lg bg-details text-lg sm:text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-none cursor-default"
              />
            </div>
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium text-details2">
                Confirmar contraseña:
              </label>
              <input
                type="password"
                disabled
                value="••••••••"
                className="mt-2 font-rubik block w-full rounded-lg bg-details text-lg sm:text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-none cursor-default"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
