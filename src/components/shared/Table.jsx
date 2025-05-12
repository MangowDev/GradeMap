import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaArrowAltCircleUp, FaArrowAltCircleDown, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Table({ data, columns: columnsProp }) {
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      ...columnsProp,
      {
        header: "Acciones",
        id: "actions",
        cell: ({ row }) => (
          <div className="flex gap-3 flex-row items-center text-white text-lg">
            <FaEye
              className="cursor-pointer hover:text-tertiary transition"
              size={21}
              title="Ver"
              onClick={() => console.log("Ver", row.original)}
            />
            <Link to={`/user/edit/${row.original.id}`}>
              <FaEdit
                className="cursor-pointer hover:text-yellow-400 transition"
                size={21}
                title="Editar"
              />
            </Link>
            <FaTrash
              className="cursor-pointer hover:text-red-500 transition"
              size={21}
              title="Eliminar"
              onClick={() => console.log("Eliminar", row.original)}
            />
          </div>
        ),
      },
    ],
    [columnsProp]
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full font-rubik table-auto border-2 border-details2">
        <thead
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          className="bg-lightblue text-primary text-xl font-sansation border-b-2 border-details2"
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-10 py-4 text-left select-none"
                >
                  <div className="flex items-center gap-3">
                    <span
                      onClick={header.column.getToggleSortingHandler()}
                      className="relative inline-block cursor-pointer transition-colors duration-200 ease-in-out hover:text-tertiary
                        after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-tertiary
                        after:scale-x-0 after:origin-center after:transition-transform after:duration-200 hover:after:scale-x-100"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </span>
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === "asc" ? (
                        <FaArrowAltCircleUp />
                      ) : (
                        <FaArrowAltCircleDown />
                      )
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
              className={`${
                index % 2 === 0
                  ? "bg-lightblue text-white text-lg"
                  : "bg-lightblue2 text-white text-lg"
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-10 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
