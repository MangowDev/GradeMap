import React from "react";
import { Link } from "react-router-dom";

export default function SubjectInfo({ data, users }) {
  return (
    <div className="flex flex-col space-y-8 font-rubik items-center justify-center w-full px-10 py-8 border-b-2 border-primary">
      <div>
        <img
          src={data.image || "/placeholder.png"}
          alt={data.name}
          className="w-64 h-64 object-cover rounded-lg border-3 border-details"
        />
      </div>
      <div>
        <span
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          className="text-3xl text-primary font-sansation font-bold"
        >
          {data.name}
        </span>
      </div>
      <div
        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
        className="relative font-rubik w-full flex flex-row items-center justify-around"
      >
        <span className="text-2xl text-details2">Id: {data.id}</span>

        <span className="absolute left-1/2 transform -translate-x-1/2 text-2xl text-details2">
          Alumnos matriculados: {users.length}
        </span>

        <span className="text-2xl text-details2">
          Profesor:{" "}
          <Link to={`/user/read/${data.teacher.id}`}>
            <span className="text-primary hover:cursor-pointer hover:underline">
              {data.teacher.name} {data.teacher.surnames}
            </span>
          </Link>
        </span>
      </div>
    </div>
  );
}
