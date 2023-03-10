import UserListingProfile from "@/components/user/UserListingProfile"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import prisma from "@/prisma/client"
import { getServerSession } from "next-auth"



const getUser = async () => {
    const session = await getServerSession(authOptions)
    const user = prisma.user.findUnique({
        where: {
            id: session.user.userId
        },
        include: {
            artist: true
        }
    })
    return user
}
 async function Profile() {
    //  Can not get api call to work as route has no session being passed to it
    // *****************************************************
    // const session = await getServerSession(authOptions)
    // const data = await fetch(`${process.env.NEXTAUTH_URL}/user`)
    // const user = await data.json()
    // console.log(user);
    const user = await getUser()
    
  return (
    <div className="flex justify-center">
        <section className="max-w-2xl">
            <UserListingProfile user={user}/>
        </section>
    </div>
  )
}

export default Profile