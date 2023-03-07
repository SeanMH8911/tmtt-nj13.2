import UserListings from "../../components/UserListings"
import { redirect } from "next/navigation"
import { getServerSession } from 'next-auth/next'
import prisma from "@/prisma/client"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { Venue } from "@/types/typings"

async function userListings(){ 
  const session = await getServerSession(authOptions)
  if (!session){
    redirect('/api/auth/signin')
  } else {
    const data = await prisma.user.findUnique({
        where: {
            email: session?.user?.email,
        },
        include: {
            venue : true,
        },
        })
        
        return data
  }
  
}
 async function dashboard() {
  const listings = await userListings()
  const venues = listings.venue
  return (
    <div className="">
      <h1 className="mx-2 p-2 text-2xl">My Listings</h1>
        {venues && venues.map((venue: Venue) => (
          <div key={venue.id} className="max-w-[300px]">
            {/* @ts-expect-error Server Component  */}
            <UserListings venue={venue} />
          </div>
        ))}
    </div>
  
  )
}

export default dashboard