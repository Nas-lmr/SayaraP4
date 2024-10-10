import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

export default function TestEvents() {
  const [test, setTest] = useState<string | null>(null);
  const { decodedToken, userData } = useUserContext();

  const ownerId = decodedToken?.id;
  useEffect(() => {
    if (userData) {
      const eventSource = new EventSource(
        `${import.meta.env.VITE_BACKEND_URL}/notifications/sse/${ownerId}`
      );

      eventSource.onmessage = function ({ data }) {
        console.log(data, "testets");

        try {
          const parsedData = JSON.parse(data);
          setTest(`Notification: ${parsedData.message}`);
        } catch (error) {
          console.error("Failed to parse SSE data", error);
        }
      };

      eventSource.onerror = function (event) {
        console.error("SSE connection error:", event);
      };

      return () => {
        eventSource.close();
      };
    } else {
      console.error("Please log in to receive notifications.");
    }
  }, [userData, ownerId]);

  return (
    <>
      <h1>Notifications</h1>
      <div>{test ? test : "No notifications yet"}</div>
    </>
  );
}
