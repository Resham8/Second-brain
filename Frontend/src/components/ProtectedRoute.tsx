import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../state/useAuthStore";

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
