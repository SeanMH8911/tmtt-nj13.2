import { Artist } from "@/types/typings";
import Link from "next/link";
import React from "react";

type Props = {
  artists: Artist[];
};

export default function ShowArtists({ artists }: Props) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {artists.map((artist: Artist) => (
        <Link key={artist.id} href={`/artist/${artist.id}`}>
          <div className="flex flex-col justify-center items-center">
            <img
              className="rounded-full w-[200px] h-[200px] object-cover"
              src={artist.profileImg}
              alt=""
            />
            <div className="p-4">
              <h1 className="font-medium text-2xl">{artist.stageName}</h1>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
