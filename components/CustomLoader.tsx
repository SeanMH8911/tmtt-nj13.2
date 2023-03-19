"use client";

import { BeatLoader } from "react-spinners";

export default function CustomLoader() {
  return (
    <div className="w-full h-full  flex justify-center items-center">
      <BeatLoader color="#F26419" />
    </div>
  );
}
