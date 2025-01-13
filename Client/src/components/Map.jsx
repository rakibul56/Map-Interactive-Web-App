import "leaflet/dist/leaflet.css";
//import PropTypes from "prop-types";
import axios from "axios";
import * as L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

// Custom Hook to get and set the current location get form your device
const useCurrentLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
          // alert("Error getting current location. Please turn on your Location");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return location;
};

const Map = ({ category }) => {
  const [locations, setLocations] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  console.log(category, "category map");
  const currentLocation = useCurrentLocation();

  const colorMapping = {
    school: "blue",
    kindergarten: "green",
    socialwork: "red",
    youthservice: "yellow",
    All: "gray",
  };

  const createIcon = (color) => {
    console.log(`Creating icon with color: ${color}`);
    return new L.Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="${color}" />
        </svg>
      `)}`,
      iconSize: [18, 35],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };
  console.log(createIcon({ school: "blue" }), "Icon");

  useEffect(() => {
    const mapData = async () => {
      const response = await fetch(
        `http://localhost:3001/api/map?filter=${category}`
      );

      const mapData = await response.json();
      console.log(mapData, "mapdata");

      const loc = await Promise.all(
        mapData.map(async (x) => {
          //  const additionalInfo = await fetchGoogleData(
          //    x.geometry.coordinates[1],
          //    x.geometry.coordinates[0]
          //  );

          return {
            latitude: x.geometry.coordinates[0],
            longitude: x.geometry.coordinates[1],
            name: x.name,
            type: x.type,
            uri: x.properties.WWW,
            url: x.properties.URL,
            Bezeichnung: x.properties.BEZEICHNUNG,
            Telefon: x.properties.TELEFON,
            Email: x.properties.EMAIL,
            Strasse: x.properties.STRASSE,
            PLZ: x.properties.PLZ,
            ORT: x.properties.ORT,
            //  additionalInfo,
          };
        })
      );

      setLocations([...loc]);
    };
    mapData();
  }, [category]);

  // Formated the the URI
  const formatUrl = (url) => {
    if (url === undefined || url === null) {
      return "#";
    } else {
      if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
      }
      if (url.startsWith("www")) {
        return `http://${url}`;
      }
      //return url;
    }
  };

  //Fetch Aditional Data from Google
  // const fetchGoogleData = async (lat, lon) => {
  //   const response = await fetch(
  //     `http://localhost:3001/api/googledata?lat=${lat}&lon=${lon}`
  //   );
  //   return response.json();
  // };

  const onSetFavourite = async (e) => {
    console.log(e.Bezeichnung, "LOC FAV");

    const response = await axios.put(
      `http://localhost:3001/api/users/${user._id}`,
      {
        favorite: e.Bezeichnung,
      }
    );
    localStorage.setItem("user", JSON.stringify(response.data));
  };

  const onSetHome = async (loc) => {
    console.log(loc, "and");

    const response = await axios.put(
      `http://localhost:3001/api/users/${user._id}`,
      {
        homeaddress: [loc.latitude, loc.longitude],
      }
    );
    localStorage.setItem("user", JSON.stringify(response.data));
  };

  const ChangeView = ({ center }) => {
    const map = useMap();
    map.setView(center, 15);
    return null;
  };

  return (
    <div className=" w-full h-full">
      <MapContainer
        center={
          currentLocation
            ? [currentLocation.latitude, currentLocation.longitude]
            : [50.7922749102438, 12.88]
        }
        zoom={13}
        className="h-full w-auto"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {currentLocation && (
          <Marker
            position={[currentLocation.latitude, currentLocation.longitude]}
            //icon={createIcon("black") }
          >
            <Popup>
              <p>Your Current Location </p>
              <p>
                lat:{currentLocation.latitude} & lon:{currentLocation.longitude}
              </p>
              <button
                className="justify-center text-white bg-blue-300 p-0.5 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                onClick={() => onSetHome(currentLocation)}
              >
                Set as Home
              </button>
            </Popup>
          </Marker>
        )}

        {locations.map((location, index) => (
          <Marker
            key={location["latitude"] + location["longitude"] + index}
            position={[location.longitude, location.latitude]}
            icon={createIcon(colorMapping[location.name])}
            //onclick={alert()}
            // eventHandlers={{
            //   click: (location) => this.onSetFavourite(location),
            // }}
            //onClick={() => this.onSetFavourite(location)}
          >
            <Popup className="">
              <div>
                <p className="font-bold  text-blue-600">
                  Category: {location.name}
                </p>
                <p className="font-bold  text-black-600">
                  Bezeichnung :
                  {location.Bezeichnung
                    ? location.Bezeichnung
                    : "ohne bezeichnung "}
                </p>

                <a
                  href={location.Telefon}
                  alt={location.Telefon}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telefon:{location.Telefon}
                </a>
                <p>
                  Email:{" "}
                  {location.Email ? location.Email : "Email not Available "}
                </p>

                <p>
                  <a
                    className="underline hover:no-underline 
                   text-blue-600 hover:text-blue-800  
                   visited:text-purple-600"
                    href={formatUrl(location.uri ? location.uri : location.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {location.uri ? location.uri : location.url}
                  </a>
                </p>
                <p>
                  Strasse:{location.Strasse},PLZ:{location.PLZ}, ORT:
                  {location.ORT}
                </p>
                <p>
                  Lat:{location.longitude} & Lon:{location.latitude}
                </p>
                {/* <p>
                  Additional Google Info :
                  {location.additionalInfo.results &&
                  location.additionalInfo.results[0]
                    ? location.additionalInfo.results[0].formatted_address
                    : "No additional information available"}
                </p> */}
                <p>
                  <button
                    className="justify-center text-white bg-blue-300 p-1 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                    onClick={() => onSetFavourite(location)}
                  >
                    Set as Favorite
                  </button>
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
        {currentLocation && (
          <ChangeView
            center={[currentLocation.latitude, currentLocation.longitude]}
          />
        )}
      </MapContainer>
    </div>
  );
};

// Map.propTypes = {
//   category: PropTypes.func.isRequired,
// };

export default Map;
