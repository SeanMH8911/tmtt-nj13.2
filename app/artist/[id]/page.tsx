import getArtistDetail from "@/lib/getArtistDetail";
import { Artist } from "@/types/typings";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

function availableForHire(x: boolean | String) {
  if (x) return "Yes";
  if (!x) return "No";
}

export default async function page({ params }: Props) {
  const slug = params.id;
  const artist: Artist = await getArtistDetail({ slug });
  // console.log(artist);

  return (
    <div className="">
      {artist && (
        <div className="flex items-center p-5">
          <img
            src={artist.profileImg}
            alt={artist.stageName}
            className="rounded-full h-[300px] w-[300px] object-cover"
          />
          <div className="p-5">
            <h2>{artist.stageName}</h2>
            <p>
              Available for hire: {availableForHire(artist.avaiableForHire)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
