import React from "react";

export default function MapButtonList({
  top,
  info,
  left,
  right,
  bottom,
  totalComputers,
  totalUsers,
  selectedBoard,
  onUserClick,
  isLoading,
  onAddComputerClick,
  onDeleteClick,
}) {
  
  const teacherName = info?.teacher?.name ?? "No asignado";
  const tableCount = info?.boards?.length ?? 0;

  const selectedComputers = selectedBoard?.computers || [];
  const maxSize = selectedBoard?.size || 0;

  return (
    <div
      className={`absolute 
        ${top || ""} 
        ${left || ""} 
        ${right || ""} 
        ${bottom || ""} 
        bg-lightblue text-white w-80 h-65 px-4 py-2 border-2 border-lightblue2 rounded overflow-y-auto`}
    >
      <div className="flex flex-col w-full items-left justify-center">
        <h3 className="text-2xl text-center text-tertiary font-bold font-sansation w-full border-b-2 py-1 mb-5">
          {info?.name || "Aula"}
        </h3>

        <div className="w-full flex flex-col font-rubik space-y-2">
          {isLoading ? (
            <div className="w-full pt-12 flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
            </div>
          ) : selectedBoard ? (
            <>
              <span>
                <strong>Mesa:</strong>{" "}
                {selectedBoard?.id ? `Mesa ${selectedBoard.id}` : "Sin nombre"}
              </span>
              <span>
                <strong>Tamaño:</strong> {selectedComputers.length} / {maxSize}
              </span>

              {selectedComputers.length > 0 ? (
                selectedComputers.map((comp) => (
                  <span
                    key={comp.id}
                    className="block max-w-full truncate whitespace-nowrap overflow-hidden"
                  >
                    <strong>Ordenador {comp.id}:</strong>{" "}
                    {comp.user ? (
                      <span
                        onClick={() => onUserClick(comp.user, comp)}
                        className="text-tertiary hover:underline hover:cursor-pointer"
                      >
                        {comp.user.name} {comp.user.surnames}
                      </span>
                    ) : (
                      <span
                        onClick={() => onUserClick(null, comp)}
                        className="text-tertiary hover:underline hover:cursor-pointer"
                      >
                        Sin usuario
                      </span>
                    )}
                  </span>
                ))
              ) : (
                <span>No hay ordenadores asignados.</span>
              )}

              <div className="mt-1 flex flex-col items-center justify-center space-y-2">
                <button
                  disabled={selectedComputers.length >= maxSize}
                  onClick={() => onAddComputerClick && onAddComputerClick()}
                  className={`px-3 py-1 rounded-md font-sansation font-bold cursor-pointer text-tertiary hover:bg-white/30 ${
                    selectedComputers.length >= maxSize &&
                    "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Añadir ordenador
                </button>

                <button
                  disabled={selectedComputers.length === 0}
                  onClick={() => onDeleteClick && onDeleteClick()}
                  className="px-3 py-1 rounded-md font-sansation font-bold cursor-pointer text-tertiary hover:bg-white/30"
                >
                  Eliminar ordenador
                </button>
              </div>
            </>
          ) : (
            <>
              <span>
                <strong>Profesor:</strong> {teacherName}
              </span>
              <span>
                <strong>Número de mesas:</strong> {tableCount}
              </span>
              <span>
                <strong>Número de ordenadores:</strong> {totalComputers}
              </span>
              <span>
                <strong>Número de usuarios:</strong> {totalUsers}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
