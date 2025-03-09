import useAuthStore from "@/store/authstore";
import { Navigate, Outlet } from "react-router-dom";

function PrivateLayout() {
  const currentUser = useAuthStore().user;
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateLayout;
