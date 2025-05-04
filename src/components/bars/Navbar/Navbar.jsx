import React from "react";
import { FaBook, FaComputer, FaUserGroup } from "react-icons/fa6";
import { GrNotes } from "react-icons/gr";
import { FaChalkboard } from "react-icons/fa";
import { MdOutlineTableRestaurant } from "react-icons/md";
import NavLink from "./NavLink";
import NavbarLogo from "./NavbarLogo";
import NavUser from "./NavUser";

export default function Navbar() {
  return (
    <nav className="relative flex items-center justify-center w-full h-34 px-5 bg-cuaternary border-b border-primary">
      <div className="flex flex-row items-center space-x-20">
        <div className="flex flex-row space-x-10">
          <NavLink icon={FaUserGroup} to="/users" label="Users" />
          <NavLink icon={FaComputer} to="/computers" label="Computers" />
          <NavLink icon={GrNotes} to="/grades" label="Grades" />
        </div>

        <div className="flex flex-row">
          <NavbarLogo />
        </div>

        <div className="flex flex-row space-x-10">
          <NavLink icon={FaChalkboard} to="/classrooms" label="Classroom" />
          <NavLink
            icon={MdOutlineTableRestaurant}
            to="/tables"
            label="Tables"
          />
          <NavLink icon={FaBook} to="/subjects" label="Subjects" />
        </div>
      </div>
      <NavUser />
    </nav>
  );
}
