"use client";

import { Coordinates } from "@/types/typings";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// ********************************************
// ********************************************
// ********************************************
// Markers not showing up needs to be addressed
// And types need to be added
// ********************************************
// ********************************************
// ********************************************

const onLoad = (marker) => {
  console.log("marker: ", marker);
};

function ShowMap({ lat, lng }: Coordinates) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const position = {
    lat: lat,
    lng: lng,
  };
  return (
    <div>
      <GoogleMap
        id="circle-example"
        mapContainerStyle={{
          height: "300px",
          width: "100%",
        }}
        zoom={20}
        center={{
          lat: lat,
          lng: lng,
        }}
      >
        <Marker onLoad={onLoad} position={position} icon={"📍"} />
        {/* 
      </Marker> */}
      </GoogleMap>
    </div>
  );
}

export default ShowMap;
