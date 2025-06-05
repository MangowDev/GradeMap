const token = localStorage.getItem("auth_token");

export const getSubjectsForUser = async (user_id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}user-subjects/user/${user_id}`,
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
    console.error(`Error fetching subjects for user ${user_id}:`, error);
    return null;
  }
};

export const getUsersForSubject = async (subject_id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}user-subjects/subject/${subject_id}`,
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
    console.error(`Error fetching users for subject ${subject_id}:`, error);
    throw error;
  }
};

export const attachSubjectToUser = async (user_id, subject_id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}user-subjects/attach`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, subject_id }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to attach subject to user");
    }

    return await response.json();
  } catch (error) {
    console.error(
      `Error attaching subject ${subject_id} to user ${user_id}:`,
      error
    );
    throw error;
  }
};

export const detachSubjectFromUser = async (user_id, subject_id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}user-subjects/detach`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id, subject_id }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to detach subject from user");
    }

    return await response.json();
  } catch (error) {
    console.error(
      `Error detaching subject ${subject_id} from user ${user_id}:`,
      error
    );
    throw error;
  }
};

export const syncSubjectsForUser = async (user_id, subject_ids) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}user-subjects/sync`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id, subject_ids }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to sync subjects for user");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error syncing subjects for user ${user_id}:`, error);
    throw error;
  }
};
