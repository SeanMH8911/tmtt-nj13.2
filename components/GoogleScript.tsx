"use client";
import { Coordinates } from "@/types/typings";
import { LoadScript } from "@react-google-maps/api";
import React from "react";
import ShowMap from "./venue/ShowMapDetailed";

const libraries = ["places"];

function GoogleScript({ lat, lng }: Coordinates) {
  return (
    <>
      <LoadScript
        googleMapsApiKey="AIzaSyBtx6X2LcZwZ-H-eZlskR_G4wXuMAZCnLE"
        libraries={libraries}
      >
        <ShowMap lat={lat} lng={lng} />
      </LoadScript>
    </>
  );
}

export default GoogleScript;
