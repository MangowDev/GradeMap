import React from "react";
import computerImg from "../../../assets/page_images/computer.png";

export default function ReadOnlyComputerForm({ computer }) {
  
  const assignedUser = computer.user;
  const assignedBoard = computer.board;
  const classroomName = computer.board?.classroom?.name || "Sin aula";

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
              ? `Mesa ID: ${assignedBoard.id} - Aula: ${classroomName}`
              : "No asignada"}
          </p>
        </div>
      </div>
    </div>
  );
}
