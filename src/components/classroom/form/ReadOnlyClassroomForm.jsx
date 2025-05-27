import React, { useEffect, useState } from "react";
import classroomImg from "../../../assets/page_images/classroom.png";
import { fetchUsers } from "../../../utils/users/usersApi";

export default function ReadOnlyClassroomForm({ classroom }) {
  const [users, setUsers] = useState([]);

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

  const teacher = users.find((u) => u.id === classroom.teacher_id);

  return (
    <div className="flex flex-col items-center justify-center font-rubik px-10 py-20">
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
            value={classroom.name}
            disabled
            className="mt-2 block w-full rounded-lg bg-details text-white text-xl py-2 px-3 border-b-2 border-cuaternary cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-2xl font-sansation text-details2">
            Profesor asignado:
          </label>
          <input
            type="text"
            value={
              teacher
                ? `${teacher.name} ${teacher.surnames} (ID: ${teacher.id})`
                : "Cargando..."
            }
            disabled
            className="mt-2 block w-full rounded-lg bg-details text-white text-xl py-2 px-3 border-b-2 border-cuaternary cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}
