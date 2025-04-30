
export const registerUser = async (userData) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
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
      const response = await fetch("http://127.0.0.1:8000/api/login", {
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
  