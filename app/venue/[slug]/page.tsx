import ShowMap from "@/components/ShowMapDetailed"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import prisma from "@/prisma/client"
import { getServerSession } from "next-auth"
import Link from "next/link"
type Props = {
    params: {
        slug: string
    }
}

async function VenueDetail({params}: Props) {
    const session = await getServerSession(authOptions)
    
    const slug = params.slug
    const data = await prisma.venue.findUnique({
            where: {
                id: slug
            }
        })
    const address = data.fullAddress

        


  return (
    <div className="flex flex-col lg:flex-row justify-between ">
        <div className="p-2.5 lg:p-10 lg:w-1/2">
            <div className="flex justify-between"> 
                <h1 className="font-bold">{data.title}</h1>
                { session?.user?.userId === data?.userId  && 
                <Link href={`dashboard/editvenue/${data.id}`} className="text-gray-400 font-bold ">Edit</Link>
                }
            </div>
            <div className=" ">
                {data.zipCode}{address}
                <img 
                src={data.images[0]}
                alt={data.title}
                />
                {/* <SimpleMap lng={data.lng} lat={data.lat} /> */}
            </div>
            <div>
                <h3>Opening Times</h3>
                {/* <ul>
                    {openingTimes && openingTimes.map((times) => (
                        <li></li>
                    ))}
                </ul> */}
            </div>
        </div>
        <div className="p-2.5 lg:p-10 justify-start lg:w-1/2">
            <h3>Entertainment</h3>
            <div className="lg:p-10">
                <ShowMap  lat={data.lat} lng={data.lng}/>
            </div>
        </div>
    </div>
  )
}

export default VenueDetail