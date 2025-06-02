import React from "react";
import placeholderUser from "../../assets/placeholder-images/profilepicture.png";

export default function UserGradeInfo({ user, grades, subjects }) {
  const trabajos = grades.filter((g) => g.type.toLowerCase() === "trabajo");
  const examenes = grades.filter((g) => g.type.toLowerCase() === "examen");

  const avg = (arr) =>
    arr.length
      ? (
          arr.reduce((sum, g) => sum + parseFloat(g.grade), 0) / arr.length
        ).toFixed(2)
      : "N/A";

  const mediaTrabajos = avg(trabajos);
  const mediaExamenes = avg(examenes);
  const mediaGlobal = avg(grades);

  const asignaturas = subjects.length
    ? subjects.map((s) => s.name)
    : grades.length
    ? [...new Set(grades.map((g) => g.subject?.name || "Desconocida"))]
    : ["No hay asignaturas"];

  return (
    <div className="flex flex-row font-rubik items-center justify-center w-full px-10 py-8 rounded-lg border-details border-2 bg-cuaternary">
      <div className="flex items-center justify-center flex-col w-1/3">
        <div
          className="w-72 h-72 border-4 rounded-full border-details2 bg-center"
          style={{
            backgroundImage: `url(${placeholderUser})`,
            backgroundSize: "140%",
          }}
        ></div>
      </div>
      <div className="flex flex-col w-2/3">
        <div className="flex flex-row items-center justify-start space-x-15">
          <div className="flex flex-col space-y-8 w-full">
            <div>
              <span className="text-2xl font-rubik text-white">
                Nombre: {user.name}
              </span>
            </div>
            <div>
              <span className="text-2xl font-rubik text-white">
                Nombre de usuario: {user.username}
              </span>
            </div>
            <div>
              <span className="text-2xl font-rubik text-white">DNI: {user.dni}</span>
            </div>
          </div>
          <div className="flex flex-col w-full space-y-8">
            <div>
              <span className="text-2xl font-rubik text-white">
                Asignaturas:{" [ "}
                {asignaturas.length > 0
                  ? asignaturas.join(", ")
                  : "No hay asignaturas"}{" "}
                {" ] "}
              </span>
            </div>
            <div>
              <span className="text-2xl font-rubik text-white">
                Media trabajos: {mediaTrabajos}
              </span>
            </div>
            <div>
              <span className="text-2xl font-rubik text-white">
                Media exámenes: {mediaExamenes}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-end mt-10">
          <span className="text-2xl font-rubik text-primary">
            Media global: {mediaGlobal}
          </span>
        </div>
      </div>
    </div>
  );
}
