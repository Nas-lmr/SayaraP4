export const formatDateToMySQL = (date: Date | null) => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mois de 0 à 11
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatTimeToMySQL = (
  time: Date | string | null
): string | null => {
  if (!time) return null;

  // Convertir la chaîne en objet Date si nécessaire
  const validTime = typeof time === "string" ? new Date(time) : time;

  if (!(validTime instanceof Date) || isNaN(validTime.getTime())) {
    // Gérer le cas où la conversion a échoué
    console.error("Invalid time value provided:", time);
    throw new Error("Invalid time value provided");
  }

  const hours = String(validTime.getHours()).padStart(2, "0");
  const minutes = String(validTime.getMinutes()).padStart(2, "0");
  const seconds = String(validTime.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};
