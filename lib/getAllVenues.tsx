import prisma from "@/prisma/client"

export default async function GetAllVenues(){
      const venues = await prisma.venue.findMany()
      if(!venues) throw new Error('Failed to fetch venues')
  return venues
}