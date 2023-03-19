import EditVenue from "@/components/venue/EditVenue";
import getVenueDetail from "@/lib/getVenueDetail";
import { Time } from "@/types/typings";

type Props = {
  params: {
    slug: string;
  };
};

async function editVenuePage({ params }: Props) {
  const slug = params.slug;
  const data = await getVenueDetail({ slug });

  return (
    <div className="max-w-2xl mx-auto">
      <EditVenue venue={JSON.parse(JSON.stringify(data))} />
    </div>
  );
}
export default editVenuePage;
