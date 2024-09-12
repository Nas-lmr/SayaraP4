export const kilometersFormat = (meters: number | null) => {
  if (!meters) return null;
  const kilometers = Math.floor(meters / 1000);
  return `${kilometers}`;
};

export const formatDuration = (seconds: number | null) => {
  if (!seconds) return null;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};
export const capitalizeFirstLetter = (str: string) => {
  if (!str) return ""; // Si la chaîne est vide ou indéfinie
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
