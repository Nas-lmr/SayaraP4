import { useState, useEffect } from "react";

export default function TestEvents() {
  const [test, setTest] = useState<string | null>(null);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3310/notifications/sse/1");

    eventSource.onmessage = function ({ data }) {
      console.log(data,"testets");
      
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
  }, []);

  return (
    <>
      <h1>Notifications</h1>
      <div>{test ? test : "No notifications yet"}</div>
    </>
  );
}
