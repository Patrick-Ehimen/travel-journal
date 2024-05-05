# Project Documentation

## Overview

This project is a web application built using React, designed to track and display cities and countries that a user has visited. It features a dynamic map, authentication, and a responsive design.

## Key Features

- **Interactive Map**: Displays markers for cities that the user has visited.
- **Authentication**: Supports user login to access personalized data.
- **Responsive Design**: Adapts to various screen sizes and devices.
- **City and Country Lists**: View and manage lists of visited cities and countries.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **Leaflet**: JavaScript library for interactive maps.
- **CSS Modules**: For styling components in a modular way.

## Project Structure

- `src/`: Contains all the source code for the application.
  - [components/](file:///Users/apple/Desktop/blockchain-engineer/travel-journal/src/App.jsx#12%2C25-12%2C25): Reusable React components.
  - [contexts/](file:///Users/apple/Desktop/blockchain-engineer/travel-journal/src/App.jsx#5%2C35-5%2C35): React contexts for global state management.
  - [hooks/](file:///Users/apple/Desktop/blockchain-engineer/travel-journal/src/components/Map.jsx#14%2C36-14%2C36): Custom React hooks.
  - [pages/](file:///Users/apple/Desktop/blockchain-engineer/travel-journal/src/App.jsx#9%2C31-9%2C31): Components representing entire pages.
  - [App.jsx](file:///Users/apple/Desktop/blockchain-engineer/travel-journal/src/App.jsx#1%2C1-1%2C1): Root component that sets up routing and context providers.

## Setup and Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Usage

- **Navigating the Map**: Click on the map to add new city markers.
- **Authentication**: Use the login page to access protected routes.
- **Adding Cities**: Use the form to add details about new cities.

## Code Examples

### Adding a City

This example shows how a new city is added using the form component.

```27:72:src/components/Form.jsx
function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  useEffect(
    function () {
      if (!lat && !lng) return;

      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");

          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          console.log(data);

          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else 😉"
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );
```

### Rendering the Map

This snippet demonstrates how the map component is set up.

```18:77:src/components/Map.jsx
function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
```

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests with any new features or fixes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
