import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/client"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"


export async function GET(
  request: Request
  ) {
         try{
    
        const result = await prisma.openingTime.findMany()
        return  NextResponse.json(result, {status: 200})
    } catch(err){
        console.log(err);
        return  NextResponse.json({err: err})
    }
}


export async function POST(
    request: Request,
) {
    // const session = await getServerSession( authOptions)
    // if(!session) return NextResponse.json({message: "Sign in to create a venue"})

    
   try{
        const body = await request.json()
    console.log(body);
    const result = await prisma.openingTime.create({
        data: {
                venueId:body.venueId,
                dayOfWeek: body.dayOfWeek,
                openTime: body.openTime,
                closeTime: body.closeTime
        }
    })
    console.log(result);
    
            return NextResponse.json({body})}
            catch (error){
                console.log(error);
                
            }
}
