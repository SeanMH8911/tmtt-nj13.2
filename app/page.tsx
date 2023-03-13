import SearchBox from "@/components/SearchBox";
import Venues from "@/components/venue/Venues";
import GetAllVenues from "@/lib/getAllVenues";
import GetAllArtists from "@/lib/getAllArtists";
import { Suspense } from "react";
import ShowArtists from "@/components/artist/ShowArtists";

export const revalidate = 100;

export default async function Home() {
  const venues = await GetAllVenues();
  const artists = await GetAllArtists();
  return (
    <main className=" mx-auto flex flex-col justify-center items-center">
      {/* <SearchBox /> */}
      <div>
        <section className="p-5">
          <h2 className="text-2xl font-bold p-4">Artists</h2>
          <Suspense fallback={<p>Loading artists...</p>}>
            {artists && <ShowArtists artists={artists} />}
          </Suspense>
        </section>
        <div>{/* <ShowMapHome venues={venues}/> */}</div>
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
