export const fetchUserClassroom = async () => {
  const token = localStorage.getItem("auth_token");

  try {
    const response = await fetch(
      `http://localhost:8000/api/computers`,
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