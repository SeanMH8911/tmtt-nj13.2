import EditVenue from "@/components/venue/EditVenue";
import prisma from "@/prisma/client";

type Props = {
  params: {
    slug: string;
  };
};

async function editVenuePage({ params }: Props) {
  const slug = params.slug;
  const data = await prisma.venue.findUnique({
    where: {
      id: slug,
    },
  });

  const allVenuesWithDatesAsString = {
    ...data,
    createdAt: data.createdAt.toString(),
    updatedAt: data.updatedAt.toString(),
  };
  return (
    <div className="max-w-2xl mx-auto">
      <EditVenue venue={allVenuesWithDatesAsString} />
    </div>
  );
}
export default editVenuePage;
