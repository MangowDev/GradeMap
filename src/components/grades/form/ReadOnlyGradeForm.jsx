import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../../utils/users/usersApi";
import { fetchSubjects } from "../../../utils/subjects/subjectsApi";
import gradeImg from "../../../assets/page_images/grade.png";

export default function ReadOnlyGradeForm({ gradeData }) {
  const [user, setUser] = useState(null);
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, subjectsData] = await Promise.all([
          fetchUsers(),
          fetchSubjects(),
        ]);

        const matchedUser = usersData.find((u) => u.id === gradeData.user_id);
        const matchedSubject = subjectsData.find((s) => s.id === gradeData.subject_id);

        setUser(matchedUser);
        setSubject(matchedSubject);
      } catch (err) {
        console.error("Error al cargar usuarios o asignaturas:", err);
      }
    };

    fetchData();
  }, [gradeData]);

  return (
    <div className="flex flex-col font-rubik items-center justify-center w-full px-20 py-20">
      <div className="w-full max-w-4xl space-y-8">
        <div className="flex items-center justify-center flex-col w-full mb-10">
          <img className="w-64 h-64" src={gradeImg} alt="grade-img" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xl font-medium font-sansation text-details2">
              Valor de nota:
            </label>
            <input
              type="number"
              value={gradeData.grade}
              readOnly
              className="mt-2 font-rubik block w-full rounded-lg bg-details text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary"
            />
          </div>

          <div>
            <label className="block text-xl font-medium font-sansation text-details2">
              Tipo:
            </label>
            <input
              type="text"
              value={gradeData.type}
              readOnly
              className="mt-2 font-rubik block w-full rounded-lg bg-details text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary"
            />
          </div>

          <div>
            <label className="block text-xl font-medium font-sansation text-details2">
              Nombre:
            </label>
            <input
              type="text"
              value={gradeData.name}
              readOnly
              className="mt-2 font-rubik block w-full rounded-lg bg-details text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary"
            />
          </div>

          <div>
            <label className="block text-xl font-medium font-sansation text-details2">
              Usuario:
            </label>
            <input
              type="text"
              value={user ? `${user.name} ${user.surnames} (ID: ${user.id})` : "Cargando..."}
              readOnly
              className="mt-2 font-rubik block w-full rounded-lg bg-details text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary"
            />
          </div>

          <div>
            <label className="block text-xl font-medium font-sansation text-details2">
              Asignatura:
            </label>
            <input
              type="text"
              value={subject ? `${subject.name} (ID: ${subject.id})` : "Cargando..."}
              readOnly
              className="mt-2 font-rubik block w-full rounded-lg bg-details text-xl py-2 px-2 border-b-2 text-white border-cuaternary focus:outline-cuaternary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
