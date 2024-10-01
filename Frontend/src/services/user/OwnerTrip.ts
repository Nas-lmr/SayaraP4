export const fetchOwnerTripReservationHistoric = async (
  id: string | undefined
) => {
  try {
    const response = await fetch(`http://localhost:3310/ownerTrip/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: responseData.data,
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

export const fetchOwnerTrip = async (id: string | undefined) => {
  try {
    const response = await fetch(
      `http://localhost:3310/ownerTrip/owner/${id}`,
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
        data: responseData.data,
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
