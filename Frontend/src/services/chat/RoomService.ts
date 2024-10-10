const getRooms = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/rooms`);
  const jsonResponse = await response.json();
  const { data }: any = await jsonResponse;
  return data;
};

export { getRooms };
