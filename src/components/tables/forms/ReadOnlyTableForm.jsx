import React, { useEffect, useState } from "react";
import tableImg from "../../../assets/page_images/table.png";
import { fetchClassrooms } from "../../../utils/classrooms/classroomsApi";

export default function ReadOnlyTableForm({ board }) {
  const [classrooms, setClassrooms] = useState([]);

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

  const classroom = classrooms.find((c) => c.id === board.classroom_id);

  return (
    <div className="flex flex-col items-center justify-center font-rubik px-10 py-20">
      <div className="flex items-center justify-center flex-col w-1/2 mb-10">
        <img className="w-64 h-64" src={tableImg} alt="table" />
      </div>

      <div className="w-full max-w-xl space-y-10">
        <div>
          <label className="block text-2xl font-sansation text-details2">
            Aula asignada:
          </label>
          <input
            type="text"
            value={
              classroom
                ? `${classroom.name} (ID: ${classroom.id})`
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
