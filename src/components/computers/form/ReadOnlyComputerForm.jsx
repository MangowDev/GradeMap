import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../../utils/users/usersApi";
import { fetchBoards } from "../../../utils/boards/boardsApi";
import { getClassroomById } from "../../../utils/classrooms/classroomsApi";
import computerImg from "../../../assets/page_images/computer.png";

export default function ReadOnlyComputerForm({ computer }) {
  const [users, setUsers] = useState([]);
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersData, boardsData] = await Promise.all([
          fetchUsers(),
          fetchBoards(),
        ]);

        const boardsWithClassroomNames = await Promise.all(
          boardsData.map(async (board) => {
            try {
              const classroom = await getClassroomById(board.classroom_id);
              return {
                ...board,
                classroom_name: classroom.name || "Sin aula",
              };
            } catch {
              return {
                ...board,
                classroom_name: "Aula no encontrada",
              };
            }
          })
        );

        setUsers(usersData || []);
        setBoards(boardsWithClassroomNames);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-white">Cargando datos...</p>;
  }

  const assignedUser = users.find(
    (user) => String(user.id) === String(computer.user_id)
  );
  const assignedBoard = boards.find(
    (board) => String(board.id) === String(computer.board_id)
  );

  return (
    <div className="flex flex-col items-center justify-center font-rubik px-10 py-20 text-white">
      <div className="flex items-center justify-center flex-col w-1/2 mb-10">
        <img className="w-56 h-56" src={computerImg} alt="computer" />
      </div>

      <div className="w-full max-w-xl space-y-10">
        <div>
          <label className="block text-2xl font-sansation text-details2">
            Usuario asignado:
          </label>
          <p className="mt-2 block w-full rounded-lg bg-details text-white text-xl py-2 px-3 border-b-2 border-cuaternary">
            {assignedUser
              ? `${assignedUser.name} ${assignedUser.surnames} (ID: ${assignedUser.id})`
              : "No asignado"}
          </p>
        </div>

        <div>
          <label className="block text-2xl font-sansation text-details2">
            Mesa asignada:
          </label>
          <p className="mt-2 block w-full rounded-lg bg-details text-white text-xl py-2 px-3 border-b-2 border-cuaternary">
            {assignedBoard
              ? `Mesa ID: ${assignedBoard.id} - Aula: ${assignedBoard.classroom_name}`
              : "No asignada"}
          </p>
        </div>
      </div>
    </div>
  );
}
