const token = localStorage.getItem("auth_token");
export const fetchComputersWithDetails = async () => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/computers/details`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Failed to fetch computers");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching computers:", error);
    return null;
  }
};

export const createComputer = async (computerData) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/computers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(computerData),
    });

    if (!response.ok) {
      throw new Error("Failed to create computer");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateComputer = async (id, computerData) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/computers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(computerData),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el ordenador");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error actualizando el ordenador con ID ${id}:`, error);
    throw error;
  }
};

export const deleteComputer = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/computers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al borrar el ordenador");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error borrando el ordenador con ID ${id}:`, error);
    throw error;
  }
};

export const getComputerById = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/computers/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch computer");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching computer with ID ${id}:`, error);
    throw error;
  }
};

