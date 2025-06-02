import React, { useState } from "react";
import placeholderUser from "../../../assets/placeholder-images/profilepicture.png";
import { createUser } from "../../../utils/users/usersApi.js";
import { useNavigate } from "react-router-dom";

export default function CreateUserForm() {
  const [formData, setFormData] = useState({
    name: "",
    surnames: "",
    username: "",
    dni: "",
    password: "",
    confirmPassword: "",
    email: "",
    role: "",
    computer_id: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    } else if (!formData.username) {
      setError("El campo Username es obligatorio.");
      return;
    } else if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    } else if (!formData.dni || formData.dni.length !== 9) {
      setError("El DNI debe tener 9 caracteres.");
      return;
    } else if (!formData.name) {
      setError("El campo Nombre es obligatorio.");
      return;
    } else if (!formData.surnames) {
      setError("El campo Apellidos es obligatorio.");
      return;
    } else if (!formData.role) {
      setError("El campo Rol es obligatorio.");
      return;
    }

    if (
      !formData.name ||
      !formData.surnames ||
      !formData.username ||
      !formData.dni ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.email ||
      !formData.role
    ) {
      setError("Todos los campos deben estar llenos.");
      return;
    }

    const payload = { ...formData };
    delete payload.confirmPassword;

    if (!payload.computer_id) {
      payload.computer_id = null;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await createUser(payload);
      console.log("Usuario creado:", response);
      setFormData({});
      setSuccessMessage("¡Usuario creado con éxito! Redirigiendo...");
      setTimeout(() => {
        navigate("/users");
      }, 1500);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      setError("Hubo un problema al crear el usuario. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row font-rubik items-center justify-center w-full px-20 py-20"
    >
      <div className="flex items-center mb-20 justify-center flex-col w-1/3">
        <div
          className="w-70 h-70 border-4 rounded-full border-details2 bg-center"
          style={{
            backgroundImage: `url(${placeholderUser})`,
            backgroundSize: "140%",
          }}
        ></div>

        <div className="mt-6 w-[80%]">
          <label className="block text-xl sm:text-2xl font-medium font-sansation text-details2">
            Ordenador:
          </label>
          <input
            name="computer_id"
            type="number"
            value={formData.computer_id}
            onChange={handleChange}
            className="mt-2 font-rubik block w-full rounded-lg bg-details text-lg sm:text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary focus:ring-cuaternary hover:pl-3 transition-all duration-200"
            placeholder="Opcional"
          />
        </div>
      </div>

      <div className="flex items-center justify-center flex-col w-2/3">
        <div className="w-[90%] max-w-full mx-auto px-4 space-y-6">
          <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 w-full">
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium font-sansation text-details2">
                Nombre:
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 font-rubik block w-full rounded-lg bg-details text-lg sm:text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary focus:ring-cuaternary hover:pl-3 transition-all duration-200"
                placeholder="Tony"
              />
            </div>
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium font-sansation text-details2">
                Apellidos:
              </label>
              <input
                name="surnames"
                type="text"
                value={formData.surnames}
                onChange={handleChange}
                className="mt-2 font-rubik block w-full rounded-lg bg-details text-lg sm:text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary focus:ring-cuaternary hover:pl-3 transition-all duration-200"
                placeholder="Stark"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 w-full">
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium font-sansation text-details2">
                Username:
              </label>
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="mt-2 font-rubik block w-full rounded-lg bg-details text-lg sm:text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary focus:ring-cuaternary hover:pl-3 transition-all duration-200"
                placeholder="IronMan99"
              />
            </div>
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium font-sansation text-details2">
                DNI:
              </label>
              <input
                name="dni"
                type="text"
                value={formData.dni}
                onChange={handleChange}
                className="mt-2 font-rubik block w-full rounded-lg bg-details text-lg sm:text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary focus:ring-cuaternary hover:pl-3 transition-all duration-200"
                placeholder="26354899D"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 w-full">
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium font-sansation text-details2">
                Contraseña:
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-2 font-rubik block w-full rounded-lg bg-details text-lg sm:text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary focus:ring-cuaternary hover:pl-3 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium font-sansation text-details2">
                Confirmar contraseña:
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-2 font-rubik block w-full rounded-lg bg-details text-lg sm:text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary focus:ring-cuaternary hover:pl-3 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 w-full">
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium font-sansation text-details2">
                Email:
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 font-rubik block w-full rounded-lg bg-details text-lg sm:text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary focus:ring-cuaternary hover:pl-3 transition-all duration-200"
                placeholder="ejemplo@email.com"
              />
            </div>
            <div className="w-full">
              <label className="block text-xl sm:text-2xl font-medium font-sansation text-details2">
                Rol:
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-2 font-rubik block w-full rounded-lg bg-details text-lg sm:text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary focus:ring-cuaternary hover:pl-3 transition-all duration-200"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
          </div>

          {error && (
            <p className="text-red-600 mt-5 font-rubik text-lg text-center">
              {error}
            </p>
          )}
          {successMessage && (
            <p className="text-green-600 mt-5 font-rubik text-lg text-center">
              {successMessage}
            </p>
          )}

          <div>
            <button
              type="submit"
              className="w-full bg-secondary mt-3 font-sansation font-semibold text-primary text-3xl py-2 rounded-md transition-colors duration-200 ease-in-out hover:cursor-pointer hover:bg-cuaternary hover:text-tertiary"
            >
              {isLoading ? "Creando usuario..." : "Registrar"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
