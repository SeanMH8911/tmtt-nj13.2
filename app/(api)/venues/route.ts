import { authOptions } from '@/pages/api/auth/[...nextauth]'
import prisma from '@/prisma/client'
import { OpeningTime, Time } from '@/types/typings'
import { getServerSession } from 'next-auth/next'
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
    console.log(body);
    
    const openingTimeData = {
    create: body.openHours.map((time:Time ) => ({
        dayOfWeek: time.day,
        openTime: time.timePeriods[0].openTime ? new Date(`2000-01-01T${time.timePeriods[0].openTime}:00Z`) : null,
        closeTime: time.timePeriods[0].closingTime ? new Date(`2000-01-01T${time.timePeriods[0].closingTime}:00Z`) : null,
        midOpenTime: time.timePeriods[1].openTime ? new Date(`2000-01-01T${time.timePeriods[1].openTime}:00Z`) : null,
        midCloseTime: time.timePeriods[1].closingTime ? new Date(`2000-01-01T${time.timePeriods[1].closingTime}:00Z`) : null,
    })),
    };

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
            area: body.area,
            country: body.country,
            venueCategory: body.category,
            openingTime: openingTimeData,
        },
    })
    
            return NextResponse.json({result})
        } catch(error){
        console.log(error);
            return NextResponse.json({error: error})
    }    
}
