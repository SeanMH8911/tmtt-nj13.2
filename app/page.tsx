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
    <main>
      <SearchBox />
      <section className="p-5">
        <Suspense fallback={<p>Loading feed...</p>}>
          {venues && <Venues venues={venues} />}
        </Suspense>
      </section>
      <div>{/* <ShowMapHome venues={venues}/> */}</div>
      <section className="p-5">
        <Suspense fallback={<p>Loading feed...</p>}>
          {artists && <ShowArtists artists={artists} />}
        </Suspense>
      </section>
    </main>
  );
}
