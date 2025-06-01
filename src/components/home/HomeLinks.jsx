import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaComputer, FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { MdGrade, MdOutlineSubject } from "react-icons/md";
import { SiGoogleclassroom, SiAirtable } from "react-icons/si";

const iconMap = {
  FaUsers: FaUsers,
  FaComputer: FaComputer,
  MdGrade: MdGrade,
  SiGoogleclassroom: SiGoogleclassroom,
  SiAirtable: SiAirtable,
  MdOutlineSubject: MdOutlineSubject,
};

export default function HomeLinks({ link, text, side, icon }) {
  const IconComponent = iconMap[icon];

  const isLeft = side === "left";
  const textAlign = isLeft ? "text-right" : "text-left";
  const rounded = isLeft ? "rounded-l-lg" : "rounded-r-lg";
  const hoverTranslate = isLeft ? "hover:-translate-x-2" : "hover:translate-x-2";
  const ArrowIcon = isLeft ? FaArrowLeft : FaArrowRight;

  return (
    <Link to={link}>
      <div
        className={`
          group
          flex flex-row items-center justify-between
          py-6 px-6 w-full bg-cuaternary text-white
          ${textAlign} ${rounded}
          transition duration-300 ease-in-out
          ${hoverTranslate} hover:bg-details hover:text-tertiary
        `}
      >
        {/* Flecha a la izquierda si side left */}
        {isLeft && (
          <ArrowIcon
            className={`
              text-2xl text-tertiary opacity-0 transform transition-all duration-300 ease-in-out
              group-hover:opacity-100 group-hover:-translate-x-1
            `}
          />
        )}

        <div className={`flex items-center space-x-5 ${isLeft ? "flex-row-reverse space-x-reverse" : ""}`}>
          {IconComponent && <IconComponent className="text-4xl" />}
          <h1 className="text-2xl font-semibold">{text}</h1>
        </div>

        {!isLeft && (
          <ArrowIcon
            className={`
              text-2xl text-tertiary opacity-0 transform transition-all duration-300 ease-in-out
              group-hover:opacity-100 group-hover:translate-x-1
            `}
          />
        )}
      </div>
    </Link>
  );
}
