import React from "react";
import subjectImg from "../../../assets/page_images/subject.png";

export default function ReadOnlySubjectForm({ subject }) {
  return (
    <div className="flex flex-col items-center justify-center font-rubik px-10 py-20">
      <div className="flex items-center justify-center flex-col w-1/2 mb-10">
        <img className="w-72 h-56" src={subjectImg} alt="subject" />
      </div>

      <div className="w-full max-w-xl space-y-10">
        <div>
          <label className="block text-2xl font-sansation text-details2">
            Nombre de la asignatura:
          </label>
          <input
            type="text"
            value={subject.name || ""}
            disabled
            className="mt-2 block w-full rounded-lg bg-details text-white text-xl py-2 px-3 border-b-2 border-cuaternary cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}
