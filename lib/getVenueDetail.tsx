import prisma from "@/prisma/client";

type Props = {
  slug: string;
};

export default async function getVenueDetail({ slug }: Props) {
  const data = await prisma.venue.findUnique(
    {
      where: {
        id: slug,
      },
      include: {
        openingTime: true,
      },
    },
    { next: { revalidate: 60 } }
  );
  return data;
}
