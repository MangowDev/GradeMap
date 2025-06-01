import React, { useState, useEffect } from "react";
import placeholderUser from "../../../assets/placeholder-images/profilepicture.png";
import { updateUser } from "../../../utils/users/usersApi";
import { Link, useNavigate } from "react-router-dom";
import { fetchComputersWithDetails } from "../../../utils/computers/computersApi";

export default function EditUserForm({ user }) {
  const initialData = {
    name: user.name,
    surnames: user.surnames,
    username: user.username,
    dni: user.dni,
    email: user.email,
    role: user.role,
    computer_id: user.computer_id || "",
  };

  const [formData, setFormData] = useState({
    ...initialData,
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [availableComputers, setAvailableComputers] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const loadAvailableComputers = async () => {
      const allComputers = await fetchComputersWithDetails();
      if (!allComputers) return;

      const unassigned = allComputers.filter(
        (comp) => !comp.user || comp.user === null
      );

      if (user.computer_id) {
        const currentComputer = allComputers.find(
          (comp) => comp.id === user.computer_id
        );
        if (currentComputer) {
          unassigned.unshift(currentComputer);
        }
      }

      setAvailableComputers(unassigned);
    };

    loadAvailableComputers();
  }, [user.computer_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (formData.dni && formData.dni.length !== 9) {
      setError("El DNI debe tener 9 caracteres.");
      return;
    }

    const payload = {};
    Object.keys(formData).forEach((key) => {
      if (key === "confirmPassword") return;

      const value = formData[key];
      const original = initialData[key];

      if (key === "password") {
        if (value) payload[key] = value;
        return;
      }

      if (key === "computer_id") {
        const val = value === "" ? null : value;
        if (val !== (original === "" ? null : original)) {
          payload[key] = val;
        }
        return;
      }

      if (value !== original) {
        payload[key] = value;
      }
    });

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await updateUser(user.id, payload);
      console.log("Usuario editado:", response);
      setSuccessMessage("¡Usuario editado con éxito! Redirigiendo...");
      setTimeout(() => {
        navigate("/users");
      }, 1500);
    } catch (error) {
      console.error("Error al editar el usuario:", error);
      setError("Hubo un problema al editar el usuario. Intenta nuevamente.");
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
            backgroundImage: `url(${user.profile_picture || placeholderUser})`,
            backgroundSize: "140%",
          }}
        ></div>
        <button className="group text-details2 mt-6 p-3 px-4 rounded-lg bg-details text-xl hover:cursor-pointer hover:bg-details2 hover:text-details transition-colors duration-300 ease-in-out">
          Cambiar imagen
        </button>

        <div className="mt-6 w-[80%]">
          <label className="block text-xl sm:text-2xl font-medium font-sansation text-details2">
            Ordenador:
          </label>
          <select
            name="computer_id"
            value={formData.computer_id === null ? "" : formData.computer_id}
            onChange={(e) => {
              const value = e.target.value;
              setFormData((prev) => ({
                ...prev,
                computer_id: value === "" ? "" : Number(value),
              }));
            }}
            className="mt-2 font-rubik block w-full rounded-lg bg-details text-lg sm:text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary focus:ring-cuaternary hover:pl-3 transition-all duration-200"
          >
            <option value="">Sin ordenador</option>
            {availableComputers.map((computer) => (
              <option key={computer.id} value={computer.id}>
                Ordenador {computer.id}
              </option>
            ))}
          </select>

          {formData.computer_id !== null && formData.computer_id !== "" && (
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, computer_id: "" }))
              }
              className="mt-2 text-md text-red-500 hover:underline hover:cursor-pointer"
            >
              Quitar ordenador
            </button>
          )}
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

          <button
            type="submit"
            className="w-full bg-secondary mt-3 font-sansation font-semibold text-primary text-3xl py-2 rounded-md transition-colors duration-200 ease-in-out hover:cursor-pointer hover:bg-cuaternary hover:text-tertiary"
          >
            {isLoading ? "Editando usuario..." : "Actualizar usuario"}
          </button>
        </div>
      </div>
    </form>
  );
}
