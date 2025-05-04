import React from "react";
import { Link as RouterLink } from "react-router-dom";

export default function NavLink({ icon: Icon, to, label, size = 26, mobile }) {
  return (
    <RouterLink
      to={to}
      className={`flex flex-row font-sansation items-center ${
        mobile ? "text-lg" : "text-2xl"
      } space-x-3 text-white hover:text-primary transition-colors duration-200`}
    >
      <Icon size={mobile ? 20 : size} />
      <span>{label}</span>
    </RouterLink>
  );
}