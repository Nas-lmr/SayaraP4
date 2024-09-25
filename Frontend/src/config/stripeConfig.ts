import { loadStripe } from "@stripe/stripe-js";

// Charge ta clé publique Stripe depuis les variables d'environnement ou directement ici
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");

export default stripePromise;
