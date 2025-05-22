import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClassroom } from "../../../utils/classrooms/classroomsApi";
import { fetchUsers } from "../../../utils/users/usersApi";
import classroomImg from "../../../assets/page_images/classroom.png";

export default function CreateClassroomForm() {
  const [formData, setFormData] = useState({
    name: "",
    teacher_id: "",
  });

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData || []);
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.teacher_id) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      setIsLoading(true);
      await createClassroom(formData);
      setSuccessMessage("¡Aula creada con éxito!");
      setTimeout(() => navigate("/classrooms"), 1500);
    } catch (err) {
      console.error("Error al crear el aula:", err);
      setError("Error al crear el aula.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col font-rubik items-center justify-center w-full px-10 py-10"
    >
      <div className="flex items-center justify-center flex-col w-1/2 mb-10">
        <img className="w-72 h-56" src={classroomImg} alt="classroom-img" />
      </div>
      <div className="w-full max-w-xl space-y-10">
        <div>
          <label className="block text-2xl font-sansation text-details2">
            Nombre del aula:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg bg-details text-white text-xl py-2 px-3 border-b-2 border-cuaternary"
            placeholder="Ej. Aula 1, Laboratorio, etc."
          />
        </div>
        <div>
          <label className="block text-2xl font-sansation text-details2">
            Asignar profesor:
          </label>
          <select
            name="teacher_id"
            value={formData.teacher_id}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg bg-details text-white text-xl py-2 px-3 border-b-2 border-cuaternary"
          >
            <option value="">Selecciona un profesor</option>
            {users
              .filter((user) => user.role === "teacher")
              .map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} {user.surnames} (ID: {user.id})
                </option>
              ))}
          </select>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}

        <button
          type="submit"
          className="w-full bg-secondary mt-3 font-sansation font-semibold text-primary text-3xl py-2 rounded-md transition-colors duration-200 ease-in-out hover:cursor-pointer hover:bg-cuaternary hover:text-tertiary"
        >
          {isLoading ? "Creando aula..." : "Crear aula"}
        </button>
      </div>
    </form>
  );
}
