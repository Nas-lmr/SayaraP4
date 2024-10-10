export const fetchOwnerTripReservationHistoric = async (
  ownerId: string | undefined,
  tripId: string | undefined
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/ownerTrip/${ownerId}/${tripId}`,
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

export const fetchOwnerTrip = async (id: string | undefined) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/ownerTrip/${id}`,
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
