import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Context providers for cities and authentication
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

// Route protection component
import ProtectedRoute from "./pages/ProtectedRoute";

// Component imports
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// Lazy loading of components for better performance
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* // Provides authentication context */}
      <CitiesProvider>
        {" "}
        {/* // Provides city data context */}
        <BrowserRouter>
          {" "}
          {/* // Router component for handling navigation */}
          <Suspense fallback={<SpinnerFullPage />}>
            {" "}
            {/* // Handles the loading state while components are being lazily */}
            {/* loaded */}
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              route
              <Route path="pricing" element={<Pricing />} />
              route
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    {" "}
                    {/* // Protects the route to ensure it is accessible only to
                    authenticated users */}
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* Redirects to cities route by default */}
                <Route index element={<Navigate replace to="cities" />} />
                {/* // Cities list route */}
                <Route path="cities" element={<CityList />} />
                {/* // Individual city route */}
                <Route path="cities/:id" element={<City />} />

                {/* Countries list route */}
                <Route path="countries" element={<CountryList />} />
                {/* // Form route */}
                <Route path="form" element={<Form />} />
              </Route>
              {/* // Handles any undefined routes */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
