import Link from "next/link";

async function UserListings({venue}: any) {
  
  return (
          <Link key={venue.id} href={`/venue/${venue.id}`}>
          <div className='bg-gray-700 rounded-lg m-1   text-white' key={venue.id}>
            <div className="p-4">
              <h1>{venue.title}</h1>
            </div>
          </div>
        </Link>
  )
}

export default UserListings