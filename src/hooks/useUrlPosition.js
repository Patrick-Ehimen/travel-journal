import { useSearchParams } from "react-router-dom"; // Import useSearchParams hook from react-router-dom

// Custom hook to extract latitude and longitude from the URL search parameters
export function useUrlPosition() {
  const [searchParams] = useSearchParams(); // Retrieve search parameters from the URL
  const lat = searchParams.get("lat"); // Get latitude value from search parameters
  const lng = searchParams.get("lng"); // Get longitude value from search parameters

  return [lat, lng]; // Return the latitude and longitude as an array
}
