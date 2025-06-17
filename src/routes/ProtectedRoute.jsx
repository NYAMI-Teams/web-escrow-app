import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to='/' replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    if (decoded.exp && decoded.exp < now) {
      localStorage.removeItem("accessToken");
      return <Navigate to='/' replace />;
    }
  } catch (err) {
    console.error("Token tidak valid:", err);
    localStorage.removeItem("accessToken");
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
