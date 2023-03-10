import { Artist } from '@/types/typings';
import Link from 'next/link';
import React from 'react'

type Props = {
    artists: Artist[]
}

export default function ShowArtists({artists}: Props) {
  return (
     <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
        {artists.map((artist: any) => (
        <Link key={artist.id} href={`/artist/${artist.id}`}>
          <div className='bg-gray-700 rounded-lg m-1 text-white' >
            <div className='p-4'>
            <h1>{artist.stageName}</h1>
            </div>
            <div className="relative w-full h-[200px] object-cover">
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}