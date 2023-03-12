import { Venue } from "@/types/typings";
import Image from "next/image";
import Link from "next/link";
type Props = {
  venues: Venue[];
};
function Venues({ venues }: Props) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {venues.map((venue: any) => (
        <Link key={venue.id} href={`/venue/${venue.id}`}>
          <div className="m-4 max-w-[400px]">
            <div className="relative w-full h-[200px] object-cover">
              <Image
                className="rounded-lg"
                src={venue.images[0]}
                fill={true}
                priority={true}
                alt="img"
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
              />
            </div>
            <div className="pl-1">
              <h1 className="text-lg font-medium">{venue.title}</h1>
              <p className="text-sm">{venue.locality}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Venues;
