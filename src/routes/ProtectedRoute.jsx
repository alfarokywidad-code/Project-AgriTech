import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { MyContext } from "../utils/MyContext";

export default function ProtectedRoute({ children, roles }) {
  const { currentUser } = useContext(MyContext);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}