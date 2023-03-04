import Image from 'next/image'
import Link from 'next/link'
type Props ={
    venues :any
}
function Venues({venues}: Props) {
  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
        {venues.map((venue: any) => (
        <Link key={venue.id} href={`/venue/${venue.id}`}>
          <div className='bg-gray-700 rounded-lg m-1 text-white' >
            <div className='p-4'>
            <h1>{venue.title}</h1>
            </div>
            <div className="relative w-full h-[200px] object-cover">
            <Image 
                  className="rounded-b-lg"
              src={venue.images[0]}
              fill={true}
              priority={true}
              alt="img"
              sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
            />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Venues