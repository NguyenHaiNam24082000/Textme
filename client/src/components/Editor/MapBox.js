import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import useGeoLocation from "../../hooks/useGeoLocation";
import { Button, CloseButton } from "@mantine/core";

const API_KEY = "4rAtnLcj3zyVW8EqkV0m";

export default function Map({ setOpenedShareLocation, setEmbed }) {
  const geolocation = useGeoLocation();
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
      center: [location.lng, location.lat],
      zoom: zoom,
    });
    map.current.addControl(new maplibregl.NavigationControl(), "top-left");
  }, [location, zoom]);

  useEffect(() => {
    if (
      geolocation.coordinates?.lng === "" ||
      geolocation.coordinates?.lat === ""
    )
      return;
    new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([geolocation.coordinates.lng, geolocation.coordinates.lat])
      .addTo(map.current);
    const flyToMyLocation = setTimeout(() => {
      map.current.flyTo({
        center: [geolocation.coordinates.lng, geolocation.coordinates.lat],
        zoom: 12,
      });
    }, 1500);
    return () => {
      clearTimeout(flyToMyLocation);
    };
  }, [geolocation]);

  return (
    <div className="relative w-full rounded-md border-none h-56">
      <CloseButton
        className="absolute top-[10px] right-[10px] z-[100]"
        onClick={setOpenedShareLocation}
      />
      <div
        ref={mapContainerRef}
        className="w-full h-full absolute rounded-md"
      ></div>
      <Button
        className="absolute bottom-[10px] left-[10px] z-[100]"
        onClick={() => {
          setEmbed([
            {
              type: "map",
              map: {
                latitude: geolocation.coordinates.lat,
                longitude: geolocation.coordinates.lng,
                zoom: 12,
              },
            },
          ]);
        }}
      >
        Send
      </Button>
    </div>
  );
}
