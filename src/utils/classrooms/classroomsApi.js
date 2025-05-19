const token = localStorage.getItem("auth_token");

export const fetchClassrooms = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/classrooms", {
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
  try {
    const response = await fetch("http://localhost:8000/api/classrooms", {
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
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/classrooms/${id}`);

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
