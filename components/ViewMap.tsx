"use client";
import { Venue } from "@/types/typings";
import React, { useState } from "react";
import GoogleMap from "./GoogleMap";
import MapWithMarkerClusterer from "./GoogleMap";

const libraries = ["places"];

type Props = {
  venues: Venue[];
};
function ViewMap({ venues }: Props) {
  const [viewMap, setViewMap] = useState(false);
  function handleClick() {
    setViewMap(true);
  }
  return (
    <div className="w-full">
      <button type="button" onClick={handleClick}>
        Show Map
      </button>
      {/* {viewMap && ( */}
      {/* <LoadScript
        googleMapsApiKey="AIzaSyBtx6X2LcZwZ-H-eZlskR_G4wXuMAZCnLE"
        // @ts-ignore
        libraries={libraries}
      > */}
      <GoogleMap venues={venues} />
      {/* </LoadScript> */}
      {/* )} */}
    </div>
  );
}

export default ViewMap;
