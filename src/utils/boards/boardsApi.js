const token = localStorage.getItem("auth_token");

export const fetchBoards = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/boards", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch boards");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching boards:", error);
    return [];
  }
};



export const fetchBoardsWithDetails = async () => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/boards/details`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Failed to fetch boards");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching boards:", error);
    return null;
  }
};

export const createBoard = async (boardData) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(boardData),
    });

    if (!response.ok) {
      throw new Error("Failed to create board");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating board:", error);
    throw error;
  }
};


export const updateBoard = async (id, boardData) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/boards/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(boardData),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la mesa");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error actualizando la mesa con ID ${id}:`, error);
    throw error;
  }
};

export const getBoardById = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/boards/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch board");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching board with ID ${id}:`, error);
    throw error;
  }
};


export const deleteBoard = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/boards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al borrar la mesa");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error borrando la mesa con ID ${id}:`, error);
    throw error;
  }
};