import { Link } from "react-router-dom"; // Import Link component for navigation
import PageNav from "../components/PageNav"; // Import PageNav component for page navigation
import styles from "./Homepage.module.css"; // Import CSS module for Homepage

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      {" "}
      {/* // Main container with homepage styling */}
      {/* // Navigation bar component */}
      <PageNav />
      <section>
        {" "}
        {/* // Section for the main content */}
        <h1>
          {" "}
          {/* // Main heading You travel the world. */}
          <br />
          {/* // Line break for better formatting WorldWise keeps track of
          your adventures. */}
        </h1>
        <h2>
          {" "}
          {/* // Subheading with additional information A world map that tracks your
          footsteps into every city you can think of. Never forget your
          wonderful experiences, and show your friends how you have wandered the
          world. */}
        </h2>
        <Link to="/login" className="cta">
          {" "}
          {/* // Link to the login page with CTA class Start tracking now // Call to
          action text */}
        </Link>
      </section>
    </main>
  );
}
