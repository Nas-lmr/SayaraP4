export const fetchUserNotification = async (ownerId: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/notifications/${ownerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: responseData,
        message: responseData.message || "Success",
      };
    } else {
      const error =
        responseData.message ||
        "An error occurred while fetching reservations.";
      return { success: false, error };
    }
  } catch (err) {
    console.error("Network error:", err);
    return {
      success: false,
      error: "Network error. Please try again later.",
    };
  }
};
