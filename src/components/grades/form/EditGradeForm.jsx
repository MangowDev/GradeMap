import React, { useEffect, useState } from "react";
import { updateGrade } from "../../../utils/grades/gradesApi";
import { fetchUsers } from "../../../utils/users/usersApi";
import { fetchSubjects } from "../../../utils/subjects/subjectsApi";
import gradeImg from "../../../assets/page_images/grade.png";
import { useNavigate } from "react-router-dom";

export default function EditGradeForm({ gradeData }) {
  const initialData = {
    grade: gradeData.grade || "",
    type: gradeData.type || "",
    name: gradeData.name || "",
    user_id: gradeData.user_id || "",
    subject_id: gradeData.subject_id || "",
  };

  const [formData, setFormData] = useState({ ...initialData });
  const [users, setUsers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, subjectsData] = await Promise.all([
          fetchUsers(),
          fetchSubjects(),
        ]);
        setUsers(usersData || []);
        setSubjects(subjectsData || []);
      } catch (err) {
        console.error("Error al cargar usuarios o asignaturas:", err);
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

    if (
      !formData.grade ||
      !formData.type ||
      !formData.name ||
      !formData.user_id ||
      !formData.subject_id
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);

      await updateGrade(gradeData.id, payload);
      setSuccessMessage("¡Nota actualizada con éxito! Redirigiendo...");
      setTimeout(() => {
        navigate("/grades");
      }, 1500);
    } catch (err) {
      console.error("Error al actualizar la nota:", err);
      setError("Hubo un problema al actualizar la nota.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col font-rubik items-center justify-center w-full px-20 py-20"
    >
      <div className="w-full max-w-4xl space-y-8">
        <div className="flex items-center justify-center flex-col w-full mb-10">
          <img className="w-64 h-64" src={gradeImg} alt="computer-img" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xl font-medium font-sansation text-details2">
              Valor de nota:
            </label>
            <input
              name="grade"
              type="number"
              step="0.1"
              value={formData.grade}
              onChange={handleChange}
              className="mt-2 font-rubik block w-full rounded-lg bg-details text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary"
              placeholder="Ej: 9.5"
            />
          </div>

          <div>
            <label className="block text-xl font-medium font-sansation text-details2">
              Tipo:
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-2 font-rubik block w-full rounded-lg bg-details text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary"
            >
              <option value="">Selecciona un tipo</option>
              <option value="Examen">Examen</option>
              <option value="Trabajo">Trabajo</option>
            </select>
          </div>

          <div>
            <label className="block text-xl font-medium font-sansation text-details2">
              Nombre:
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 font-rubik block w-full rounded-lg bg-details text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary"
              placeholder="Nombre de la nota"
            />
          </div>

          <div>
            <label className="block text-xl font-medium font-sansation text-details2">
              Usuario:
            </label>
            <select
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              className="mt-2 font-rubik block w-full rounded-lg bg-details text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary"
            >
              <option value="">Selecciona un usuario</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} {user.surnames} (ID: {user.id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xl font-medium font-sansation text-details2">
              Asignatura:
            </label>
            <select
              name="subject_id"
              value={formData.subject_id}
              onChange={handleChange}
              className="mt-2 font-rubik block w-full rounded-lg bg-details text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary"
            >
              <option value="">Selecciona una asignatura</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} (ID: {subject.id})
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <p className="text-red-600 mt-4 font-rubik text-lg text-center">
            {error}
          </p>
        )}
        {successMessage && (
          <p className="text-green-600 mt-4 font-rubik text-lg text-center">
            {successMessage}
          </p>
        )}

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-secondary font-sansation font-semibold text-primary text-3xl py-2 rounded-md transition-colors duration-200 ease-in-out hover:cursor-pointer hover:bg-cuaternary hover:text-tertiary"
          >
            {isLoading ? "Actualizando nota..." : "Actualizar nota"}
          </button>
        </div>
      </div>
    </form>
  );
}
