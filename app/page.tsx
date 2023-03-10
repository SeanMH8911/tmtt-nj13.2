import SearchBox from '@/components/SearchBox';
import SearchForm from '@/components/venue/SearchForm';
import ShowMapHome from '@/components/ShowMapHome';
import Venues from '@/components/venue/Venues';
import GetAllVenues from '@/lib/getAllVenues';
import GetAllArtists from '@/lib/getAllArtists';
import prisma from '@/prisma/client';
import { Venue } from '@/types/typings';
import { Suspense } from 'react';
import ShowArtists from '@/components/artist/ShowArtists';
import getAllOpeningTimes from '@/lib/getAllOpeningTimes';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const revalidate = 100;


export default async function Home() {
const venues = await GetAllVenues()
const artists = await GetAllArtists()
// const openingTimes = await getAllOpeningTimes()
// console.log(openingTimes);

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

