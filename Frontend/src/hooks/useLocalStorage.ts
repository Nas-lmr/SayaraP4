// import { useEffect, useState } from "react";

// // Fonction pour récupérer la valeur du localStorage
// function getStorageValue<T>(key: string, defaultValue: T): T {
//   // Récupère la valeur du localStorage associée à la clé
//   const saved = localStorage.getItem(key);

//   // Vérifie si la valeur est un objet JSON
//   if (saved && (saved.startsWith("{") || saved.startsWith("["))) {
//     return JSON.parse(saved);
//   }

//   // Retourne la valeur du localStorage ou la valeur par défaut fournie
//   return (saved !== null ? saved : defaultValue) as T;
// }

// // Hook personnalisé useLocalStorage
// const useLocalStorage = <T>(key: string, defaultValue: T) => {
//   // Utilise useState avec une valeur initiale récupérée du localStorage
//   const [value, setValue] = useState<T>(() =>
//     getStorageValue(key, defaultValue)
//   );

//   useEffect(() => {
//     // Si la valeur est nulle, on supprime la clé du localStorage
//     if (value === null) {
//       localStorage.removeItem(key);
//     } else {
//       // Sinon, on met à jour le localStorage avec la nouvelle valeur
//       const storedVal =
//         typeof value === "object" ? JSON.stringify(value) : String(value);
//       localStorage.setItem(key, storedVal);
//     }
//   }, [value, key]);

//   return [value, setValue] as const;
// };

// // Exporte le hook personnalisé useLocalStorage pour l'utiliser ailleurs dans l'application
// export default useLocalStorage;
