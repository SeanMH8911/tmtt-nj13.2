import { authOptions } from '@/pages/api/auth/[...nextauth]'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth/next'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(
  request: Request
  ) {
         try{
            const result = await prisma.venue.findMany()
        return  NextResponse.json(result, {status: 200})
    } catch(err){
        console.log(err);
        return  NextResponse.json({err: err})
    }
}


export async function POST(
    request: Request,
) {
    
    const session = await getServerSession( authOptions)
    if(!session) return NextResponse.json({message: "Sign in to create a venue"})
    
   try {
     const prismaUser = await prisma.user.findUnique({
        where: {
            email: session?.user.email
        }
    })
    const body = await request.json()
    const result = await prisma.venue.create({
        data: {
            title: body.title,
            images: body.images,
            userId: prismaUser.id,
            lat: body.lat,
            lng: body.lng,
            postalCode: body.postalCode,
            fullAddress: body.fullAddress,
            streetName: body.road,
            locality: body.locality,
            Area: body.area,
            Country: body.country,
            venueCategory: body.category,
        }
    })
    console.log(result);
    
            return NextResponse.json({result})
        } catch(error){
        console.log(error);
            return NextResponse.json({error: error})
    }    
}
            

            

// export async function PUT(
//     request: Request,
//     {params} : Params
// ) {
//     const slug = params.slug
    
//     const session = await getServerSession( authOptions)
//     if(!session) return NextResponse.json({message: "Sign in to update your venues"})
    
//    try {
//     const body = await request.json()
//     console.log(body);
    
//     const result = await prisma.venue.update({
//         where:{
//             id: slug
//         },
//         data: {
//             title: body.title,
//             images: body.images,
//             lat: body.lat,
//             lng: body.lng,
//             postalCode: body.postalCode,
//             fullAddress: body.fullAddress,
//             streetName: body.road,
//             locality: body.locality,
//             Area: body.area,
//             Country: body.country,
//             venueCategory: body.category,
//         }
//     })
//     console.log(result);
    
//             return NextResponse.json({result})
//         } catch(error){
//         console.log(error);
//             return NextResponse.json({error: error})
//     }    
// }