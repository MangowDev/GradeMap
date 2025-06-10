import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import subjectImg from "../../../assets/page_images/subject.png";
import { createSubject } from "../../../utils/subjects/subjectsApi";
import { fetchUsers } from "../../../utils/users/usersApi";

export default function CreateSubjectForm() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    teacher_id: "",
  });

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData || []);
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
      }
    };

    loadUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, teacher_id } = formData;
    if (!name.trim() || !teacher_id) {
      setError("El nombre de la asignatura y el profesor son obligatorios.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await createSubject(formData);

      setSuccessMessage("¡Asignatura creada con éxito!");
      setTimeout(() => navigate("/subjects"), 1500);
    } catch (err) {
      console.error("Error al crear la asignatura:", err);
      setError("Error al crear la asignatura.");
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
        <img className="w-72 h-56" src={subjectImg} alt="subject-img" />
      </div>

      <div className="w-full max-w-xl space-y-10">
        <div>
          <label className="block text-2xl font-sansation text-details2">
            Nombre de la asignatura:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg bg-details text-white text-xl py-2 px-3 border-b-2 border-cuaternary"
            placeholder="Ej. Matemáticas"
          />
        </div>

        <div>
          <label className="block text-2xl font-sansation text-details2">
            Imagen (URL):
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg bg-details text-white text-xl py-2 px-3 border-b-2 border-cuaternary"
            placeholder="URL de la imagen"
          />
        </div>

        <div>
          <label className="block text-2xl font-sansation text-details2">
            Profesor:
          </label>
          <select
            name="teacher_id"
            value={formData.teacher_id}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg bg-details text-white text-xl py-2 px-3 border-b-2 border-cuaternary"
          >
            <option value="">Selecciona un profesor</option>
            {users
              .filter((u) => u.role === "teacher")
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
          {isLoading ? "Creando asignatura..." : "Crear asignatura"}
        </button>
      </div>
    </form>
  );
}
