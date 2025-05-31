export const fetchBoards = async () => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}boards`, {
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
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}boards/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

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
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}boards`, {
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
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}boards/${id}`, {
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
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}boards/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

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

export const getBoardDetails = async (id) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}boards/${id}/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch board details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching board details with ID ${id}:`, error);
    throw error;
  }
};

export async function getBoardsBatchDetails(boardIds) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}boards/batch-details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids: boardIds }),
  });

  if (!response.ok) {
    throw new Error("Error fetching multiple board details");
  }

  return response.json();
}


export const deleteBoard = async (id) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}boards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
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
