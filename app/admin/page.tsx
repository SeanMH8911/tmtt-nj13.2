
import { redirect } from "next/navigation"
import { getServerSession } from 'next-auth/next'
import prisma from "@/prisma/client"
import CreateVenue from '../../components/CreateVenue'
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { loadStaticPaths } from "next/dist/server/dev/static-paths-worker"

    // redirect('/api/auth/signin')

async function Admin() {
const session = await getServerSession(authOptions)
if(!session) redirect('/')
if (session?.user?.role === "Admin"){
  return (
    <div>
        
        <section className='max-w-[400px] mx-auto'>
        <CreateVenue />
      </section>
    </div>
  )
} 
else redirect('/')
}

export default Admin