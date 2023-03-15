"use client";
import { Venue } from "@/types/typings";
import React, { useState } from "react";
import GoogleMap from "./GoogleMap";

type Props = {
  venues: Venue[];
};
function ViewMap({ venues }: Props) {
  const [viewMap, setViewMap] = useState(false);

  function handleClick() {
    setViewMap((current) => !current);
  }
  return (
    <div className="w-full">
      <button type="button" onClick={handleClick}>
        Show Map
      </button>
      {viewMap && <GoogleMap venues={venues} />}
    </div>
  );
}

export default ViewMap;
