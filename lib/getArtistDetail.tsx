import prisma from "@/prisma/client";

type Props = {
  slug: string;
};

export default async function getArtistDetail({ slug }: Props) {
  const data = await prisma.artist.findUnique({
    where: {
      id: slug,
    },
    include: {
      bookings: true,
    },
  });
  return data;
}
