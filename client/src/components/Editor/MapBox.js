import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const API_KEY = "4rAtnLcj3zyVW8EqkV0m";

export default function Map() {
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
      center: [location.lat, location.lng],
      zoom: zoom,
    });
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    new maplibregl.Marker({color: "#FF0000"})
      .setLngLat([139.7525,35.6846])
      .addTo(map.current);
  }, [location, zoom]);

  return (
    <div className="relative w-96 rounded-md border-none" style={{height: 460}}>
      <div ref={mapContainerRef} className="w-full h-full absolute"></div>
    </div>
  );
}
