import React, { useEffect, useState } from "react";
import {
  updateComputer,
  fetchComputersWithDetails,
} from "../../../utils/computers/computersApi";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../../utils/users/usersApi";
import { fetchBoardsWithDetails } from "../../../utils/boards/boardsApi";
import computerImg from "../../../assets/page_images/computer.png";

export default function EditComputerForm({ computer }) {
  const initialData = {
    user_id: computer.user_id || "",
    board_id: computer.board_id || "",
  };

  const [formData, setFormData] = useState({ ...initialData });
  const [users, setUsers] = useState([]);
  const [boards, setBoards] = useState([]);
  const [computers, setComputers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, boardsData, computersData] = await Promise.all([
          fetchUsers(),
          fetchBoardsWithDetails(), // ✅ esta llamada ya incluye classroom
          fetchComputersWithDetails(),
        ]);

        setUsers(usersData || []);
        setComputers(computersData || []);
        setBoards(boardsData || []);
      } catch (err) {
        console.error("Error al cargar datos:", err);
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

    const userAlreadyAssigned = computers.some(
      (c) =>
        String(c.user?.id) === String(formData.user_id) &&
        c.id !== computer.id
    );

    if (userAlreadyAssigned) {
      setError("Este usuario ya está asignado a otro ordenador.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      await updateComputer(computer.id, payload);
      setSuccessMessage("¡Ordenador actualizado con éxito!");
      setTimeout(() => navigate("/computers"), 1500);
    } catch (err) {
      console.error("Error al actualizar el ordenador:", err);
      setError("Hubo un problema al actualizar el ordenador.");
    } finally {
      setIsLoading(false);
    }
  };

  const assignedUserIds = computers
    .filter((c) => c.user?.id && c.id !== computer.id)
    .map((c) => String(c.user.id));

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center font-rubik px-10 py-20"
    >
      <div className="flex items-center justify-center flex-col w-1/2 mb-10">
        <img className="w-56 h-56" src={computerImg} alt="computer" />
      </div>

      <div className="w-full max-w-xl space-y-10">
        <div>
          <label className="block text-2xl font-sansation text-details2">
            Asignar usuario:
          </label>
          <select
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg bg-details text-white text-xl py-2 px-3 border-b-2 border-cuaternary"
          >
            <option value="">Selecciona un usuario</option>
            {users.map((user) => {
              const isAssigned = assignedUserIds.includes(String(user.id));
              return (
                <option
                  key={user.id}
                  value={user.id}
                  disabled={isAssigned}
                >
                  {user.name} {user.surnames} (ID: {user.id})
                  {isAssigned ? " - Ya asignado" : ""}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="block text-2xl font-sansation text-details2">
            Asignar mesa:
          </label>
          <select
            name="board_id"
            value={formData.board_id}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg bg-details text-white text-xl py-2 px-3 border-b-2 border-cuaternary"
          >
            <option value="">Selecciona una mesa</option>
            {boards.map((board) => (
              <option key={board.id} value={board.id}>
                Mesa ID: {board.id} - Aula: {board.classroom?.name || "Sin aula"}
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
          {isLoading ? "Actualizando ordenador..." : "Actualizar ordenador"}
        </button>
      </div>
    </form>
  );
}
