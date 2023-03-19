import SearchBox from "@/components/SearchBox";
import Venues from "@/components/venue/Venues";
import GetAllVenues from "@/lib/getAllVenues";
import GetAllArtists from "@/lib/getAllArtists";
import { Suspense } from "react";
import ShowArtists, { ArtistSkeleton } from "@/components/artist/ShowArtists";
import ViewMap from "@/components/GoogleFunctions/ViewMap";
import { Venue } from "@/types/typings";
export const revalidate = 100;

export default async function Home() {
  const artists = await GetAllArtists();
  const venues = await GetAllVenues();
  const allVenuesWithDatesAsString = venues.map((venue: Venue) => {
    return {
      ...venue,
      createdAt: venue.createdAt.toString(),
      updatedAt: venue.updatedAt.toString(),
    };
  });
  return (
    <main className=" mx-auto flex flex-col justify-center items-center">
      <ViewMap venues={allVenuesWithDatesAsString} />
      {/* <SearchBox /> */}
      <div>
        <section className="p-5">
          <h2 className="text-2xl font-bold p-4">Artists</h2>
          <Suspense fallback={<ArtistSkeleton />}>
            {artists && <ShowArtists artists={artists} />}
          </Suspense>
        </section>

        <section className="p-5">
          <h2 className="text-2xl font-bold p-4">Venues</h2>
          <Suspense fallback={<p>Loading venues...</p>}>
            {venues && <Venues venues={venues} />}
          </Suspense>
        </section>
      </div>
    </main>
  );
}
