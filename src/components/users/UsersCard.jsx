import React, { useEffect, useState } from "react"; 
import placeholderUser from "../../assets/placeholder-images/profilepicture.png";

export default function UsersCard({ user, classroomCache }) {
  const [isLoading, setIsLoading] = useState(true);
  const classroom = classroomCache[user.id];

  useEffect(() => {
    if (classroom) {
      setIsLoading(false);
    }
  }, [classroom]);

  if (isLoading) {
    return (
      <div className="flex flex-row mx-6 my-2 items-center justify-center">
        <div className="flex flex-col w-60 max-w-60 text-white font-rubik items-center p-4 pt-2 justify-center bg-lightblue2 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <p className="text-lg text-center font-rubik text-white">Loading...</p>
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
          <h3
            className="text-xl text-center text-tertiary"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
          >
            {user.name} {user.surnames}
          </h3>

          <h4
            className="text-lg"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
          >
            {classroom?.name ?? "Sin clase asignada"}
          </h4>
          <h4
            className="text-lg first-letter:uppercase"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
          >
            {user.role ?? "N/A"}
          </h4>
        </div>
      </div>
    </div>
  );
}
