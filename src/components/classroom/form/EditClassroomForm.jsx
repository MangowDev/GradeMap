import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classroomImg from "../../../assets/page_images/classroom.png";
import { updateClassroom } from "../../../utils/classrooms/classroomsApi";
import { fetchUsers } from "../../../utils/users/usersApi";

export default function EditClassroomForm({ classroom }) {
  const initialData = {
    name: classroom.name || "",
    teacher_id: classroom.teacher_id || "",
  };

  const [formData, setFormData] = useState({ ...initialData });
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData.filter((u) => u.role === "teacher"));
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
      }
    };

    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {};
    for (let key in formData) {
      if (formData[key] !== initialData[key]) {
        payload[key] = formData[key];
      }
    }

    if (Object.keys(payload).length === 0) {
      setError("No se han hecho cambios.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await updateClassroom(classroom.id, payload);
      setSuccessMessage("¡Aula actualizada con éxito!");
      setTimeout(() => navigate("/classrooms"), 1500);
    } catch (err) {
      console.error("Error al actualizar el aula:", err);
      setError("Hubo un problema al actualizar el aula.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center font-rubik px-10 py-20"
    >
      <div className="flex items-center justify-center flex-col w-1/2 mb-10">
        <img className="w-72 h-56" src={classroomImg} alt="classroom" />
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
            {users.map((user) => (
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
          {isLoading ? "Actualizando aula..." : "Actualizar aula"}
        </button>
      </div>
    </form>
  );
}
