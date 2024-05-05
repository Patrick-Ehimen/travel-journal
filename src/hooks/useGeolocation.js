import { useState } from "react";

// Custom hook to manage geolocation state
export function useGeolocation(defaultPosition = null) {
  // State to track loading status
  const [isLoading, setIsLoading] = useState(false);
  // State to store the current position
  const [position, setPosition] = useState(defaultPosition);
  // State to store any errors
  const [error, setError] = useState(null);

  // Function to get the current geolocation
  function getPosition() {
    // Check if geolocation is supported by the browser
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    // Set loading state to true
    setIsLoading(true);
    // Request the current position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // Update position state with the new position
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        // Set loading state to false
        setIsLoading(false);
      },
      (error) => {
        // Update error state with the error message
        setError(error.message);
        // Set loading state to false
        setIsLoading(false);
      }
    );
  }

  // Return the states and the getPosition function
  return { isLoading, position, error, getPosition };
}
