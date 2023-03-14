import prisma from "@/prisma/client";

export default async function GetAllVenues() {
  const venues = await prisma.venue.findMany({}, { next: { revalidate: 60 } });
  if (!venues) throw new Error("Failed to fetch venues");
  return venues;
}
