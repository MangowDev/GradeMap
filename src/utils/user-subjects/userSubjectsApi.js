export const getSubjectsForUser = async (userId) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}user-subjects/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Failed to fetch subjects for user");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching subjects for user ${userId}:`, error);
    return null;
  }
};

export const getUsersForSubject = async (subjectId) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}user-subjects/subject/${subjectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch users for subject");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching users for subject ${subjectId}:`, error);
    throw error;
  }
};

export const attachSubjectToUser = async (userId, subjectId) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}user-subjects/attach`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, subjectId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to attach subject to user");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error attaching subject ${subjectId} to user ${userId}:`, error);
    throw error;
  }
};

export const detachSubjectFromUser = async (userId, subjectId) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}user-subjects/detach`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, subjectId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to detach subject from user");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error detaching subject ${subjectId} from user ${userId}:`, error);
    throw error;
  }
};

export const syncSubjectsForUser = async (userId, subjectIds) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}user-subjects/sync`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, subjectIds }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to sync subjects for user");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error syncing subjects for user ${userId}:`, error);
    throw error;
  }
};
