const token = localStorage.getItem("auth_token");

export const fetchSubjects = async () => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/subjects`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Failed to fetch subjects");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return null;
  }
};

export const getSubjectById = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/subjects/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch subject");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching subject with ID ${id}:`, error);
    throw error;
  }
};

export const createSubject = async (subjectData) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/subjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(subjectData),
    });

    if (!response.ok) {
      throw new Error("Failed to create subject");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating subject:", error);
    throw error;
  }
};

export const updateSubject = async (id, subjectData) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/subjects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(subjectData),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la asignatura");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error actualizando la asignatura con ID ${id}:`, error);
    throw error;
  }
};



export const deleteSubject = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/subjects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al borrar la asignatura");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error borrando la asignatura con ID ${id}:`, error);
    throw error;
  }
};