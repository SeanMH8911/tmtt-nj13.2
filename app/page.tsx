import SearchBox from '@/components/SearchBox';
import SearchForm from '@/components/SearchForm';
import ShowMapHome from '@/components/ShowMapHome';
import Venues from '@/components/Venues';
import GetAllVenues from '@/lib/getAllVenues';
import GetAllArtists from '@/lib/getAllArtists';
import prisma from '@/prisma/client';
import { Venue } from '@/types/typings';
import { Suspense } from 'react';
import ShowArtists from '@/components/ShowArtists';

export const revalidate = 100;

// async function getData(){
//   const venues = await prisma.venue.findMany()
//   return venues
// }


export default async function Home() {
const venues = await GetAllVenues()
const artists = await GetAllArtists()
console.log(artists);

  return (
   <main>
        <SearchBox/>
      <section className='p-5'>
        <Suspense fallback={<p>Loading feed...</p>}>
          {venues && <Venues venues={venues} />}
        </Suspense>
      </section>
      <div>
        {/* <ShowMapHome venues={venues}/> */}
      </div>
      <section className='p-5'>
        <Suspense fallback={<p>Loading feed...</p>}>
        {artists && <ShowArtists artists={artists}/>}
        </Suspense>
      </section>
   </main>
  )
}

