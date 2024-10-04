const getRooms = async () => {
  const response = await fetch('http://localhost:3310/rooms');
  const jsonResponse = await response.json();
  const {data}: any = await jsonResponse;
  return data;
}

export {getRooms};