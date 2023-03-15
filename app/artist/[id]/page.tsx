import getAllArtist from "@/lib/getAllArtists";
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
    <article className="md:max-w-5xl md:mx-auto">
      {artist && (
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col justify-center items-center">
            <h2 className="font-bold text-2xl mb-2">{artist.stageName}</h2>
            <img
              src={artist.profileImg}
              alt={artist.stageName}
              className="rounded-full h-[200px] w-[200px] md:h-[300px] md:w-[300px] object-cover"
            />
          </div>
          <div className=" ">
            <h3>Upcoming Events</h3>
          </div>
        </div>
      )}
    </article>
  );
}

// export async function generateStaticParams() {
//   const data = await getAllArtist();
//   return data.map((artist: Artist) => ({ id: artist.id }));
// }
