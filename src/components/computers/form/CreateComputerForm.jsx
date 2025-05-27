import React, { useState, useEffect } from "react";
import computerImg from "../../../assets/page_images/computer.png";
import { useNavigate } from "react-router-dom";
import {
  createComputer,
  fetchComputersWithDetails,
} from "../../../utils/computers/computersApi";
import { fetchUsers } from "../../../utils/users/usersApi";
import { fetchBoards } from "../../../utils/boards/boardsApi";
import { getClassroomById } from "../../../utils/classrooms/classroomsApi";

export default function CreateComputerForm() {
  const [formData, setFormData] = useState({
    user_id: "",
    board_id: "",
  });

  const [users, setUsers] = useState([]);
  const [boards, setBoards] = useState([]);
  const [computers, setComputers] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, boardsData, computersData] = await Promise.all([
          fetchUsers(),
          fetchBoards(),
          fetchComputersWithDetails(),
        ]);

        setUsers(usersData || []);
        setComputers(computersData || []);

        const boardsWithClassroomNames = await Promise.all(
          boardsData.map(async (board) => {
            try {
              const classroom = await getClassroomById(board.classroom_id);
              return {
                ...board,
                classroom_name: classroom.name || "Sin aula",
              };
            } catch (err) {
              return {
                ...board,
                classroom_name: "Aula no encontrada",
              };
            }
          })
        );

        setBoards(boardsWithClassroomNames);
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
    setError(null);

    if (!formData.user_id || !formData.board_id) {
      setError("Selecciona usuario y mesa.");
      return;
    }

    const userAlreadyAssigned = computers.some(
      (comp) => String(comp.user?.id) === String(formData.user_id)
    );

    if (userAlreadyAssigned) {
      setError("Este usuario ya tiene un ordenador asignado.");
      return;
    }

    try {
      setIsLoading(true);
      await createComputer(formData);
      setSuccessMessage("¡Ordenador creado con éxito!");
      setTimeout(() => navigate("/computers"), 1500);
    } catch (err) {
      console.error("Error al crear el ordenador:", err);
      setError("Error al crear el ordenador.");
    } finally {
      setIsLoading(false);
    }
  };

  // Lista de usuarios ya asignados a algún ordenador
  const assignedUserIds = computers
    .filter((c) => c.user?.id)
    .map((c) => String(c.user.id));

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col font-rubik items-center justify-center w-full px-10 py-10"
    >
      <div className="flex items-center justify-center flex-col w-1/2 mb-10">
        <img className="w-56 h-56" src={computerImg} alt="computer-img" />
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
                <option key={user.id} value={user.id} disabled={isAssigned}>
                  {user.name} {user.surnames} (ID: {user.id})
                  {isAssigned ? " - Ya asignado" : ""}
                </option>
              );
            })}
          </select>
        </div>

        {/* Mesa */}
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
                Mesa ID: {board.id} - Aula: {board.classroom_name}
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
          {isLoading ? "Creando ordenador..." : "Crear ordenador"}
        </button>
      </div>
    </form>
  );
}
