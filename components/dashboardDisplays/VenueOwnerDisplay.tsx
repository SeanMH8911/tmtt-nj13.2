import { Venue } from "@/types/typings";
import React from "react";

type Props = {
  venues: Venue[];
};
export default function VenueOwnerDisplay({ venues }: Props) {
  return (
    <div>
      <div className="max-w-5xl mx-auto mt-5">
        <h1 className="mx-2 p-2 text-2xl">My Listings</h1>
        {venues &&
          venues.map((venue: Venue) => (
            <div key={venue.id} className="max-w-[300px]">
              {/* @ts-expect-error Server Component  */}
              <UserListings venue={venue} />
            </div>
          ))}
      </div>
    </div>
  );
}
