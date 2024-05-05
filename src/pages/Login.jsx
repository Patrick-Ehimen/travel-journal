import { useEffect, useState } from "react"; // React hooks for state and effects
import { useNavigate } from "react-router-dom"; // Hook for navigation
import Button from "../components/Button"; // Reusable button component
import PageNav from "../components/PageNav"; // Navigation component for pages
import { useAuth } from "../contexts/FakeAuthContext"; // Context hook for authentication
import styles from "./Login.module.css"; // CSS module for styling

export default function Login() {
  // State hooks for managing email and password inputs
  const [email, setEmail] = useState("jack@example.com"); // Default email for development
  const [password, setPassword] = useState("qwerty"); // Default password for development

  const { login, isAuthenticated } = useAuth(); // Destructuring authentication-related functions and state
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Trigger login function if email and password are provided
    if (email && password) login(email, password);
  }

  // Effect hook to redirect user when authenticated
  useEffect(
    function () {
      // Navigate to the app main page if authenticated
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate] // Dependencies for the effect
  );

  // Render the login form
  return (
    <main className={styles.login}>
      <PageNav /> {/* Navigation bar */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
            value={email} // Controlled component for email
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
            value={password} // Controlled component for password
          />
        </div>

        <div>
          <Button type="primary">Login</Button>{" "}
          {/* Submit button for the form */}
        </div>
      </form>
    </main>
  );
}
