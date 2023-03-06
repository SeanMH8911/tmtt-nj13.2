import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";



export async function PATCH(
    request: Request,
    {params} : Params
) {
    const slug = params.slug
    
    const session = await getServerSession( authOptions)
    if(!session) return NextResponse.json({message: "Sign in to update your venues"})
    
   try {
    const body = await request.json()
    console.log(body);
    
    const result = await prisma.venue.update({
        where:{
            id: slug
        },
        data: {
            title: body.title,
            images: body.images,
            lat: body.lat,
            lng: body.lng,
            postalCode: body.postalCode,
            fullAddress: body.fullAddress,
            streetName: body.road,
            locality: body.locality,
            area: body.area,
            country: body.country,
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
            

