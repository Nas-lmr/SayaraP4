import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedStripePaymentIntent from "./components/Redirection.tsx";
import { UserContextProvider } from "./context/UserContext.tsx";
import "./index.css";
import MainLayout from "./layouts/MainLayout.tsx";
import BookingPage from "./pages/BookingPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import NotificationPage from "./pages/NotificationPage.tsx";
import LoginPage from "./pages/profil/LoginPage.tsx";
import OwnerTripHistoricPage from "./pages/profil/OwnerTripHistoricPage.tsx";
import OwnerTripReservationHistoricPage from "./pages/profil/OwnerTripReservationHistoricPage.tsx";
import RegisterPage from "./pages/profil/RegisterPage.tsx";
import ReservationHistoricPage from "./pages/profil/ReservationHistoricPage.tsx";
import ProfilPage from "./pages/ProfilPage.tsx";
import ConfirmationTrajetPage from "./pages/reservations/ConfirmationTrajetPage.tsx";
import ItinerairePage from "./pages/reservations/ItinerairePage.tsx";
import NewJourneyPage from "./pages/reservations/NewJourneyPage.tsx";
import ResultPage from "./pages/reservations/ResultPage.tsx";
import TchatPage from "./pages/TchatPage.tsx";
import TestsEvents from "./pages/Tets.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/messagerie",
        element: <TchatPage />,
      },
      {
        path: "/notifications",
        element: <NotificationPage />,
      },
      {
        path: "/profil",
        element: <ProfilPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/trajet",
        element: <BookingPage />,
      },

      {
        path: "/trajet/nouveau-trajet",
        element: <NewJourneyPage />,
      },
      {
        path: "/trajet/resultats",
        element: <ResultPage />,
      },
      {
        path: "/trajet/nouveau-trajet/itineraire",
        element: <ItinerairePage />,
      },
      {
        path: "/trajet/nouveau-trajet/confirmation",
        element: <ConfirmationTrajetPage />,
      },

      {
        path: "/trajet/reservation/:id/infos-trajet",
        element: <ProtectedStripePaymentIntent amount={undefined} />,
      },

      {
        path: "/trajet/reservation/historique",
        element: <ReservationHistoricPage />,
      },
      {
        path: "/trajet/mes-trajets",
        element: <OwnerTripHistoricPage />,
      },
      {
        path: "/trajet/mes-trajets/historique/:id",
        element: <OwnerTripReservationHistoricPage />,
      },
    ],
  },
  {
    path: "/sse",
    element: <TestsEvents />,
  },
]);

const rootElement = document.getElementById("root");

if (rootElement !== null) {
  const root = createRoot(rootElement);
  root.render(
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
} else {
  console.error(
    "Élément racine introuvable. Assurez-vous que l'élément avec l'ID 'root' est présent dans votre HTML."
  );
}
