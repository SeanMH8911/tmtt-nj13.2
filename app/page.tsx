import SearchBox from '@/components/SearchBox';
import SearchForm from '@/components/SearchForm';
import ShowMapHome from '@/components/ShowMapHome';
import Venues from '@/components/Venues';
import prisma from '@/prisma/client';
import { Venue } from '@/types/typings';
import { Suspense } from 'react';



export const revalidate = 3600; // revalidate every hour
// 
export default async function Home({}: Props) {
//  const venues = await prisma.venue.findMany()
const data = await fetch(`${process.env.NEXTAUTH_URL}/venues`, {method: 'GET'});
const items = await data.json()
const venues = items.result
  return (
   <main>
        <SearchBox venues={venues}/>
      <section className='p-5'>
        <Suspense fallback={<p>Loading feed...</p>}>
          {venues && <Venues venues={venues} />}
        </Suspense>
      </section>
      <div>
        {/* markers not showing up in component below */}
        {/* <ShowMapHome venues={venues}/> */}
      </div>
      <h1></h1>
   </main>
  )
}

