export const fetchUsername = async () => {
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("auth_token");

  if (!userId || !token) {
    console.error("No user ID or token found");
    return null;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    return data.username;
  } catch (error) {
    console.error("Error fetching username:", error);
    return null;
  }
};
