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
              {(artist.bookings?.length > 0 && (
                <p className="text-sm text-gray-600/80">
                  Next event: {artist.bookings[0].venueTitle} on{" "}
                  {formatTime(artist.bookings[0].start)}
                </p>
              )) || <p>No upcoming events</p>}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function ArtistSkeleton() {
  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
    <div className="flex flex-col justify-center items-center">
      <img
        className="rounded-full w-[200px] h-[200px] object-cover"
        src=""
        alt=""
      />
      <div className="text-center">
        <h1 className="font-medium text-2xl"></h1>
        <p className="text-sm text-gray-600/80"></p>
      </div>
    </div>
  </div>;
}
