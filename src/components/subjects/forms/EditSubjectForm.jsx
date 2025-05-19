import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateSubject } from "../../../utils/subjects/subjectsApi";
import subjectImg from "../../../assets/page_images/subject.png";

export default function EditSubjectForm({ subject }) {
  const initialData = {
    name: subject.name || "",
  };

  const [formData, setFormData] = useState({ ...initialData });
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
      await updateSubject(subject.id, payload);
      setSuccessMessage("¡Asignatura actualizada con éxito!");
      setTimeout(() => navigate("/subjects"), 1500);
    } catch (err) {
      console.error("Error al actualizar la asignatura:", err);
      setError("Hubo un problema al actualizar la asignatura.");
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
        <img className="w-72 h-56" src={subjectImg} alt="subject" />
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
            className="mt-2 block w-full rounded-lg bg-details text-xl text-white py-2 px-3 border-b-2 border-cuaternary"
            placeholder="Ej. Lengua"
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}

        <button
          type="submit"
          className="w-full bg-secondary mt-3 font-sansation font-semibold text-primary text-3xl py-2 rounded-md transition-colors duration-200 ease-in-out hover:cursor-pointer hover:bg-cuaternary hover:text-tertiary"
        >
          {isLoading ? "Actualizando asignatura..." : "Actualizar asignatura"}
        </button>
      </div>
    </form>
  );
}
