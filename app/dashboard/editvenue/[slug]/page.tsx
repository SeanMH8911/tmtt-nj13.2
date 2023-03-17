import EditVenue from "@/components/venue/EditVenue";
import getVenueDetail from "@/lib/getVenueDetail";

type Props = {
  params: {
    slug: string;
  };
};

async function editVenuePage({ params }: Props) {
  const slug = params.slug;
  const data = await getVenueDetail({ slug });

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
