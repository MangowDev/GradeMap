import React from "react";
import placeholderUser from "../../assets/placeholder-images/profilepicture.png";
import { Link } from "react-router-dom";

export default function SubjectUser({ user }) {
  const hasComputer = user.computer_id && user.computer_id !== "N/A";
  const hasClassroom = user.classroom?.name && user.classroom?.name !== "Sin asignar";

  const disabledTextClass = "text-white cursor-default no-underline";

  return (
    <Link
      to={`/user/read/${user.id}`}
      className="w-full flex flex-row items-center text-white rounded-lg bg-secondary border-2 border-details hover:bg-[#25294fa8] space-x-10 p-7"
    >
      <div className="w-1/3 flex flex-col items-center justify-end space-y-5 border-r-2 border-r-details2">
        <div
          className="w-50 h-50 border-4 rounded-full border-details2 bg-center"
          style={{
            backgroundImage: `url(${placeholderUser})`,
            backgroundSize: "140%",
          }}
        ></div>
        <span className="text-xl font-bold">
          {user.name} {user.surnames}
        </span>
      </div>
      <div className="w-2/3 flex flex-col items-center justify-between">
        <div className="w-full flex flex-row space-y-10 mt-6 justify-between text-xl">
          <div className="flex flex-col space-y-4">
            <span>Id: {user.id}</span>
            <span>Username: {user.username}</span>
            <span>Email: {user.email}</span>
          </div>
          <div className="flex flex-col space-y-4">
            {hasComputer ? (
              <Link to={`/computer/read/${user.computer_id}`}>
                <span>
                  Computer:{" "}
                  <span className="text-primary hover:underline hover:cursor-pointer">
                    {user.computer_id}
                  </span>
                </span>
              </Link>
            ) : (
              <span>
                Computer: <span className={disabledTextClass}>N/A</span>
              </span>
            )}
            {hasClassroom ? (
              <Link to={`/classroom/read/${user.classroom.id}`}>
                <span>
                  Classroom:{" "}
                  <span className="text-primary hover:underline hover:cursor-pointer">
                    {user.classroom.name}
                  </span>
                </span>
              </Link>
            ) : (
              <span>
                Classroom: <span className={disabledTextClass}>Sin asignar</span>
              </span>
            )}
            <span>DNI: {user.dni}</span>
          </div>
        </div>
        <Link to={`/user/grades/${user.id}`}>
          <button className="mt-9 text-xl text-primary px-5 py-2 rounded-lg hover:bg-details/60 transition 300 hover:cursor-pointer">
            Ver calificaciones
          </button>
        </Link>
      </div>
    </Link>
  );
}
