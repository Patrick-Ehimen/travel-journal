import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const BASE_URL = "http://localhost:9000"; // Base URL for the API

const CitiesContext = createContext(); // Creating a React context for city data

const initialState = {
  cities: [], // Initial empty array for cities
  isLoading: false, // Loading state indicator
  currentCity: {}, // State for a currently selected city
  error: "", // Field for storing any error information
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true }; // Set isLoading true during data fetching

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload, // Load cities into state
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload }; // Set currentCity with fetched city data

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload], // Add new city to cities array
        currentCity: action.payload, // Set newly created city as currentCity
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload), // Remove city from the list
        currentCity: {}, // Reset currentCity since it might be deleted
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload, // Update error state with provided error message
      };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []); // Fetch cities when the component mounts

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return; // Avoid fetching if the city is already loaded
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentCity.id]
  ); // Fetch detailed information for a single city

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  } // Function to create a new city

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  } // Function to delete a city

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  ); // Context provider that passes down city data and actions
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
} // Custom hook to use the Cities context

export { CitiesProvider, useCities }; // Exporting CitiesProvider and useCities hook
