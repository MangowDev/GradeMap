import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateBoard } from "../../../utils/boards/boardsApi";
import { fetchClassrooms } from "../../../utils/classrooms/classroomsApi";
import tableImg from "../../../assets/page_images/table.png";

export default function EditTableForm({ board }) {
  const initialData = {
    classroom_id: board.classroom_id || "",
    size: board.size || "",
  };

  const [formData, setFormData] = useState({ ...initialData });
  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
      await updateBoard(board.id, payload);
      setSuccessMessage("¡Mesa actualizada con éxito!");
      setTimeout(() => navigate("/tables"), 1500);
    } catch (err) {
      console.error("Error al actualizar la mesa:", err);
      setError("Hubo un problema al actualizar la mesa.");
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
        <img className="w-64 h-64" src={tableImg} alt="table" />
      </div>

      <div className="w-full max-w-xl space-y-10">
        <div>
          <label className="block text-2xl font-sansation text-details2">
            Asignar aula:
          </label>
          <select
            name="classroom_id"
            value={formData.classroom_id}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg bg-details text-xl text-white py-2 px-3 border-b-2 border-cuaternary"
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
            className="mt-2 block w-full rounded-lg bg-details text-xl text-white py-2 px-3 border-b-2 border-cuaternary"
            placeholder="Introduce el tamaño de la mesa"
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
          {isLoading ? "Actualizando mesa..." : "Actualizar mesa"}
        </button>
      </div>
    </form>
  );
}