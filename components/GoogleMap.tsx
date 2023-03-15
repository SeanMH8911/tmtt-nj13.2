"use client";

import { Venue } from "@/types/typings";
import { useEffect, useRef, useState } from "react";
import { loadGoogleMapsApi } from "./GoogleApiLoader";

type Props = {
  venues: Venue[];
};
function GoogleMap({ venues }: Props) {
  const googleMapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (!isMapLoaded) {
      loadGoogleMapsApi().then(() => setIsMapLoaded(true));
    }
  }, [isMapLoaded]);

  useEffect(() => {
    if (!isMapLoaded || !googleMapRef.current) return;
    // Create a new Google Map
    const googleMap = new window.google.maps.Map(googleMapRef.current, {
      center: { lat: 0, lng: 0 },
      zoom: 13,
    });

    // Add markers for each venue
    venues.forEach((venue) => {
      const marker = new window.google.maps.Marker({
        position: { lat: venue.lat, lng: venue.lng },
        map: googleMap,
        title: venue.title,
      });
    });

    // Set the center of the map to the average of all venue coordinates
    const totalLat = venues.reduce((sum, venue) => sum + venue.lat, 0);
    const totalLng = venues.reduce((sum, venue) => sum + venue.lng, 0);
    const avgLat = totalLat / venues.length;
    const avgLng = totalLng / venues.length;
    googleMap.setCenter({ lat: avgLat, lng: avgLng });
  }, [venues, isMapLoaded]);

  return (
    <div
      ref={googleMapRef}
      style={{ width: "100%", height: "500px", marginBottom: "50px" }}
    />
  );
}

export default GoogleMap;
