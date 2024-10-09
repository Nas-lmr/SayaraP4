import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

export default function TestEvents() {
  const [test, setTest] = useState<string | null>(null);
  const { decodedToken } = useUserContext();
  const ownerId = decodedToken?.id;

  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:3310/notifications/sse/${ownerId}`
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
  }, [ownerId]);

  return (
    <>
      <h1>Notifications</h1>
      <div>{test ? test : "No notifications yet"}</div>
    </>
  );
}
