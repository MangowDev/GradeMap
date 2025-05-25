const token = localStorage.getItem("auth_token");

export const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};


export const fetchRecentUsers = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/users/recent", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recent users");
    }

    const data = await response.json();
    return data.slice(0, 21);
  } catch (error) {
    console.error("Error fetching recent users:", error);
    return [];
  }
};

export const fetchUserClassroom = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/users/${userId}/classroom`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Failed to fetch user classroom");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user classroom:", error);
    return null;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el usuario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error actualizando usuario con ID ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al borrar el usuario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error borrando el usuario con ID ${id}:`, error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/users/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};


export const getUserGrades = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/users/${id}/grades`);

    if (!response.ok) {
      throw new Error("Failed to fetch user grades");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching user grades with ID ${id}:`, error);
    throw error;
  }
};
