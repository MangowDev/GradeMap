const token = localStorage.getItem("auth_token");

export const fetchGrades = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/grades", {
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
  try {
    const response = await fetch(
      `http://localhost:8000/api/grades/details`,
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
  try {
    const response = await fetch("http://127.0.0.1:8000/api/grades", {
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
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/grades/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(gradeData),
    });

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
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/grades/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch grade");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching grade with ID ${id}:`, error);
    throw error;
  }
};


export const deleteGrade = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/grades/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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