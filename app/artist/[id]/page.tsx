import ArtistLogos from "@/components/artist/ArtistLogos";
import UpcomingBookings from "@/components/artist/UpcomingBookings";
import getAllArtist from "@/lib/getAllArtists";
import getArtistDetail from "@/lib/getArtistDetail";
import { Artist, Booking } from "@/types/typings";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const slug = params.id;
  const artist: Artist = await getArtistDetail({ slug });
  return (
    <article className="md:max-w-5xl md:mx-auto">
      {artist && (
        <div className="flex flex-col justify-center items-center md:items-start md:flex-row">
          <div className="flex flex-col justify-center items-center ">
            <h2 className="font-bold text-3xl mb-2">{artist.stageName}</h2>
            <img
              src={artist.profileImg}
              alt={artist.stageName}
              className="rounded-full h-[240px] w-[240px] md:h-[300px] md:w-[300px] object-cover"
            />
            <div className="flex space-x-2 md:m-5 m-2">
              <ArtistLogos
                facebook={artist.facebookLink}
                instagram={artist.instagramLink}
                youtube={artist.youtubeLink}
                website={artist.websiteLink}
              />
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-semibold mb-2">Upcoming Events</h3>
            {artist.bookings.map((booking: Booking) => (
              <div key={booking.id}>
                <UpcomingBookings booking={booking} />
              </div>
            ))}
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
