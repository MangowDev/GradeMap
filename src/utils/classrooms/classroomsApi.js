export const fetchClassrooms = async () => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}classrooms/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch classrooms");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    return [];
  }
};

export const fetchBoards = async () => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}classrooms`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch classrooms");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    return [];
  }
};

export const getClassroomById = async (id) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}classrooms/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch classroom");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching classroom with ID ${id}:`, error);
    throw error;
  }
};

export const createClassroom = async (classroomData) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}classrooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(classroomData),
    });

    if (!response.ok) {
      throw new Error("Failed to create classroom");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating classroom:", error);
    throw error;
  }
};

export const updateClassroom = async (id, classroomData) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}classrooms/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(classroomData),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el aula");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error actualizando el aula con ID ${id}:`, error);
    throw error;
  }
};

export const deleteClassroom = async (id) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}classrooms/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al borrar el aula");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error borrando el aula con ID ${id}:`, error);
    throw error;
  }
};
