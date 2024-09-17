import { format } from "date-fns";

export const kilometersFormat = (meters: number | null) => {
  if (!meters) return null;
  const kilometers = Math.floor(meters / 1000);
  return `${kilometers}`;
};

export const formatDuration = (seconds: number | null) => {
  if (!seconds) return null;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  return `${hours}h${minutes}m`;
};

//METTRE PREMIERE LETTRE EN  MAJ
export const capitalizeFirstLetter = (str: string) => {
  if (!str) return ""; // Si la chaîne est vide ou indéfinie
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// TRANSFORMATION DE L HEURE RECU EN HHhMM
export const formatTimeForDisplay = (time: Date | null): string => {
  // Vérifiez si `time` est une instance de `Date`
  if (!(time instanceof Date) || isNaN(time.getTime())) {
    return "00 h 00"; // Valeur par défaut en cas de valeur non valide
  }

  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");

  return `${hours} h ${minutes}`;
};

export const formatDate = (date: Date | null): string | null => {
  if (!date) return null;
  return format(date, "yyyy-MM-dd");
};
