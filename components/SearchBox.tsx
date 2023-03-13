"use client";

import { Venue } from "@/types/typings";

// type Props ={
//     venues :Venue
// }

function SearchBox() {
  return (
    <input
      type="text"
      placeholder="Search for an artist or venue..."
      className="input-container max-w-[300px] mx-auto"
    />
  );
}

export default SearchBox;
