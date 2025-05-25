import React, { useEffect, useState } from "react";
import placeholderUser from "../../assets/placeholder-images/profilepicture.png";

export default function UsersCard({ user, classroomCache, isPlaceholder = false }) {
  const [isLoading, setIsLoading] = useState(true);
  const classroom = classroomCache?.[user?.id];

useEffect(() => {
  if (classroom !== undefined || isPlaceholder) {
    setIsLoading(false);
  }
}, [classroom, isPlaceholder]);


  if (isLoading) {
    return (
      <div className="flex flex-row mx-6 my-2 items-center justify-center">
        <div className="flex flex-col w-60 max-w-60 text-white font-rubik items-center p-4 py-11 justify-center bg-lightblue2 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.5)] animate-pulse">
          <div className="w-40 h-40 bg-lightblue rounded-full mb-4"></div>
          <div className="h-5 w-32 bg-lightblue rounded mb-2"></div>
          <div className="h-4 w-24 bg-lightblue rounded mb-1"></div>
          <div className="h-4 w-20 bg-lightblue rounded"></div>
        </div>
      </div>
    );
  }

  if (isPlaceholder) {
    return (
      <div className="flex flex-row mx-6 my-2">
        <div className="flex flex-col w-60 max-w-60 text-white font-rubik items-center p-4 pt-2 justify-center bg-lightblue2 opacity-60 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <img
            className="w-40 h-40 border-b-3 border-lightblue opacity-50"
            src={placeholderUser}
            alt="placeholder"
          />
          <div className="flex flex-col items-center space-y-2 justify-center py-2">
            <h3 className="text-xl text-center font-sansation text-primary">
              Usuario Placeholder
            </h3>
            <h4 className="text-lg">Clase desconocida</h4>
            <h4 className="text-lg">Rol N/A</h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row mx-6 my-2">
      <div className="flex flex-col w-60 max-w-60 text-white font-rubik items-center p-4 pt-2 justify-center bg-lightblue2 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
        <img
          className="w-40 h-40 border-b-3 border-lightblue"
          src={placeholderUser}
          alt="user-img"
        />
        <div className="flex flex-col items-center space-y-2 justify-center py-2">
          <h3 className="text-xl text-center font-sansation text-primary" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
            {user.name} {user.surnames}
          </h3>
          <h4 className="text-lg" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
            {classroom?.name ?? "Sin clase asignada"}
          </h4>
          <h4 className="text-lg first-letter:uppercase" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
            {user.role ?? "N/A"}
          </h4>
        </div>
      </div>
    </div>
  );
}
