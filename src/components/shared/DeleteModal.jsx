import React, { useState } from "react";

export function DeleteModal({ isOpen, onClose, item, onSuccess, onConfirm }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      await onConfirm(item.id);
      setLoading(false);
      if (onSuccess) onSuccess(item.id);
      onClose();
    } catch (err) {
      setLoading(false);
      setError("Hubo un error al eliminar el elemento.");
      console.error(err);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 z-50"
      onClick={onClose}
    >
      <div
        className="bg-secondary font-rubik text-white p-10 py-10 rounded-2xl w-2/5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl mb-12 text-center font-sansation font-bold">
          ¿Estás seguro?
        </h2>
        <p className="mb-6 text-xl text-center">
          Estás a punto de eliminar el siguiente campo:
        </p>
        <div className="mb-6 text-xl text-center">
          <strong>
            {item?.name || "Campo"} ({item?.id})
          </strong>
        </div>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <div className="flex justify-around gap-6">
          <button
            className="bg-red-500 text-white text-lg py-3 px-8 rounded-lg hover:bg-red-600 hover:cursor-pointer transition disabled:opacity-50"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
          <button
            className="bg-tertiary text-black text-lg py-3 px-8 rounded-lg hover:cursor-pointer hover:bg-yellow-300 transition"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
