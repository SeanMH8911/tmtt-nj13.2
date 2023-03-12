import prisma from "@/prisma/client";

export default async function getAllArtist() {
  const artist = await prisma.artist.findMany({
    include: {
      bookings: true,
    },
  });
  console.log(artist);
  if (!artist) throw new Error(" Could not find any artists");
  return artist;
}
