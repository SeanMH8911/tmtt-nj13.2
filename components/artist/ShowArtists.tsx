import { Artist } from "@/types/typings";
import dayjs, { Dayjs } from "dayjs";
import Link from "next/link";
import React from "react";

type Props = {
  artists: Artist[];
};

function formatTime(time: string | number | Date | dayjs.Dayjs) {
  const formattedTime = dayjs(time).format("ddd D, HH:mma");
  return formattedTime;
}

export default function ShowArtists({ artists }: Props) {
  console.dir(artists);

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
            <div className="text-center">
              <h1 className="font-medium text-2xl">{artist.stageName}</h1>
              <p className="text-sm text-gray-600/80">
                Next event: {artist.bookings[0].venueTitle} on{" "}
                {formatTime(artist.bookings[0].start)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
