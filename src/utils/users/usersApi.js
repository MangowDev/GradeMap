export const fetchRecentUsers = async () => {
    const token = localStorage.getItem("auth_token");
  
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
    const token = localStorage.getItem("auth_token");
  
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}/classroom`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
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

