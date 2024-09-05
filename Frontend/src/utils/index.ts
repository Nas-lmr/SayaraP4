export const verifyUrlNotNull = (url: string) => url !== '' && url !== null && url !== undefined;
/**
 * This method does it call in first step before rendering component with useEffect((), [])
 */
export const isAuthenticated = () => {
  window.addEventListener('storage',() => {
    if(localStorage.user === null || localStorage.user === undefined) {
      window.location.href = '/accueil';
    }
  })
};
