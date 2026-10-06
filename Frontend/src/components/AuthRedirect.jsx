import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AuthRedirect() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
}
