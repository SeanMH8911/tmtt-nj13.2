import UserListings from "../../components/UserListings"
import { redirect } from "next/navigation"
import { getServerSession } from 'next-auth/next'
import prisma from "@/prisma/client"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

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
            Venue : true,
        },
        })
        
        return data
  }
  
}
 async function dashboard() {
  const listings = await userListings()
  console.log(listings.role);
  
  const venues = listings.Venue
  return (
    <div className="">
      <h1 className="mx-2 p-2 text-2xl">My Listings</h1>
        {venues.map((venue: any) => (
          <div key={venue.id} className="max-w-[300px]">
            {/* @ts-expect-error Server Component  */}
            <UserListings venue={venue} />
          </div>
        ))}
    </div>
  
  )
}

export default dashboard