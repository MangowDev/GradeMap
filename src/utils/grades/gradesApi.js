export const fetchGrades = async () => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}grades`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener las notas");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error obteniendo las notas:", error);
    return [];
  }
};

export const fetchGradesWithDetails = async () => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}grades/details`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Error al obtener las notas");
    }

    return await response.json();
  } catch (error) {
    console.error("Error obteniendo las notas:", error);
    return null;
  }
};

export const createGrade = async (gradeData) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}grades`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(gradeData),
    });

    if (!response.ok) {
      throw new Error("Error al crear la nota");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creando la nota:", error);
    throw error;
  }
};

export const updateGrade = async (id, gradeData) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}grades/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(gradeData),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar la nota");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error actualizando la nota con ID ${id}:`, error);
    throw error;
  }
};

export const getGradeById = async (id) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}grades/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener la nota");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error obteniendo la nota con ID ${id}:`, error);
    throw error;
  }
};

export const getGradeBySubjectId = async (id) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}grades/subject/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener la nota por asignatura");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error obteniendo la nota por asignatura con ID ${id}:`, error);
    throw error;
  }
};

export const deleteGrade = async (id) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}grades/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al borrar la nota");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error borrando la nota con ID ${id}:`, error);
    throw error;
  }
};
