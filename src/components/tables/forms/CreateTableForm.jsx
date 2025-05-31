import React, { useState, useEffect } from "react";
import tableImg from "../../../assets/page_images/table.png";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../../../utils/boards/boardsApi";
import { fetchClassrooms } from "../../../utils/classrooms/classroomsApi";

export default function CreateTableForm() {
  const [formData, setFormData] = useState({
    classroom_id: "",
    size: "",
  });

  const [classrooms, setClassrooms] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classroomData = await fetchClassrooms();
        setClassrooms(classroomData || []);
      } catch (err) {
        console.error("Error al cargar aulas:", err);
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

    if (!formData.classroom_id) {
      setError("Selecciona un aula.");
      return;
    }

    if (!formData.size || isNaN(formData.size) || formData.size < 1 || formData.size > 5) {
      setError("El tamaño debe ser un número entre 1 y 5.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await createBoard(formData);
      setSuccessMessage("¡Mesa creada con éxito!");
      setTimeout(() => navigate("/tables"), 1500);
    } catch (err) {
      console.error(err);
      setError("Error al crear la mesa.");
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
        <img className="w-64 h-64" src={tableImg} alt="table-img" />
      </div>

      <div className="w-full max-w-xl space-y-6">
        <div>
          <label className="block text-2xl font-sansation text-details2">
            Asignar aula:
          </label>
          <select
            name="classroom_id"
            value={formData.classroom_id}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg bg-details text-white text-xl py-2 px-3 border-b-2 border-cuaternary"
          >
            <option value="">Selecciona un aula</option>
            {classrooms.map((classroom) => (
              <option key={classroom.id} value={classroom.id}>
                {classroom.name} (ID: {classroom.id})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-2xl font-sansation text-details2">
            Tamaño de la mesa (máx. 5):
          </label>
          <input
            type="number"
            name="size"
            min="1"
            max="5"
            value={formData.size}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg bg-details text-white text-xl py-2 px-3 border-b-2 border-cuaternary"
            placeholder="Introduce el tamaño"
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
          {isLoading ? "Creando mesa..." : "Crear mesa"}
        </button>
      </div>
    </form>
  );
}
