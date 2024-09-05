import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import MainLayout from "./layouts/MainLayout.tsx";
import BookingPage from "./pages/BookingPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import NotificationPage from "./pages/NotificationPage.tsx";
import LoginPage from "./pages/profil/LoginPage.tsx";
import RegisterPage from "./pages/profil/RegisterPage.tsx";
import ProfilPage from "./pages/ProfilPage.tsx";
import NewJourneyPage from "./pages/reservations/NewJourneyPage.tsx";
import ResultPage from "./pages/reservations/ResultPage.tsx";
import TchatPage from "./pages/TchatPage.tsx";

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
    ],
  },
]);

const rootElement = document.getElementById("root");

if (rootElement !== null) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error(
    "Élément racine introuvable. Assurez-vous que l'élément avec l'ID 'root' est présent dans votre HTML."
  );
}
