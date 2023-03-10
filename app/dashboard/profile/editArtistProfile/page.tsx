import EditArtistProfile from '@/components/artist/EditArtistProfile'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import React from 'react'


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
async function EditArtistProfilePage() {
    const user = await getUser()
  return (
    <div className=''>
        <section className='max-w-2xl mx-auto'>
            <EditArtistProfile user={user} />
        </section>
    </div>
  )
}

export default EditArtistProfilePage