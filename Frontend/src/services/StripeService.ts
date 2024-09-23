// Définition des types pour les items dans le panier
export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

// Typage des arguments et du retour de la fonction
export const createPaymentIntent = async (
  cart: CartItem[],
  currency: string
): Promise<Response> => {
  // Formater les produits à partir du panier
  const products = cart.map((item) => ({
    item: item.id,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
  }));

  // Envoyer la requête pour créer un Payment Intent
  return fetch("http://localhost:9090/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      products,
      currency,
    }),
  });
};
