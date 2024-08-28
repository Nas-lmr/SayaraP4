import { Outlet } from "react-router-dom";
import BottomNavbar from "../components/navigation/BottomNavbar";
import Header from "../components/navigation/Header";

export default function MainLayout() {
  return (
    <>
      <Outlet />
      <Header />
      <BottomNavbar />
    </>
  );
}
