import EditVenue from "@/components/EditVenue"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import prisma from "@/prisma/client"
import { getServerSession } from "next-auth"
import Link from "next/link"
type Props = {
    params: {
        slug: string
    }
    
}

async function editVenuePage({params}: Props) {
    const session = await getServerSession(authOptions)
    const slug = params.slug
    const data = await prisma.venue.findUnique({
            where: {
                id: slug
            }
        })
        return (
            <div>
                <EditVenue venue={data} />
            </div>
        )
    }
        export default editVenuePage
