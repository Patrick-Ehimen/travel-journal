import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";

// This component wraps around any component that requires the user to be authenticated.
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirects the user to the home page if they are not authenticated.
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  // Renders children components only if the user is authenticated, otherwise renders nothing.
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
