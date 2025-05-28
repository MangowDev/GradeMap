export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to register");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials or failed to log in");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutUser = async (navigate) => {
  const token = localStorage.getItem("auth_token");

  try {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_id");
    navigate("/login");
  }
};
