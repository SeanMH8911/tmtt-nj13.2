import { formatDate, formatTime } from "@/lib/formatters";
import GetAllVenues from "@/lib/getAllVenues";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/client";
import { Booking, OpeningTime, Time, Venue } from "@/types/typings";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Suspense } from "react";
import { formatDayOfWeek } from "../../../lib/formatters";

type Props = {
  params: {
    slug: string;
  };
};
async function getData({ params }: Props) {
  const slug = params.slug;
  const data = await prisma.venue.findUnique({
    where: {
      id: slug,
    },
    include: {
      openingTime: true,
      bookings: {
        include: {
          artist: true,
        },
        orderBy: [
          {
            date: "asc",
          },
        ],
      },
    },
  });
  return data;
}

export default async function VenueDetail({ params }: Props) {
  const session = await getServerSession(authOptions);
  const data = await getData({ params });
  console.log(data);

  const now = new Date();

  return (
    <>
      {data && (
        <div className="flex flex-col lg:flex-row justify-between ">
          <div className="p-2.5 lg:p-10 lg:w-1/2">
            <div className="flex justify-between">
              <h1 className="font-bold">{data.title}</h1>
              {session?.user?.userId === data?.userId && (
                <Link
                  href={`dashboard/editvenue/${data.id}`}
                  className="text-gray-400 font-bold "
                >
                  Edit
                </Link>
              )}
            </div>
            <div className=" ">
              {data.zipCode}
              {data.fullAddress}
              <Suspense fallback={<p>loading...</p>}>
                <img src={data.images[0]} alt={data.title} />
              </Suspense>
            </div>
          </div>
          <div className="p-2.5 lg:p-10 justify-start lg:w-1/2">
            <div>
              <h3>Upcoming Events</h3>
              <div className="mt-5">
                {data.bookings?.length > 0 ? (
                  <div>
                    {data.bookings
                      .filter((booking: Booking) => {
                        // Compare the booking date with the current date
                        const bookingDate = new Date(booking.date);
                        return bookingDate > now;
                      })
                      .map((booking: Booking) => (
                        <Link href={`/artist/${booking.artistId}`}>
                          <div className="flex" key={booking.id}>
                            <p className="bg-myBlue p-2 ">
                              <span className="font-semibold">
                                {booking.artist.stageName}
                              </span>
                              , {formatDate(booking.date)} from{" "}
                              {formatTime(booking.start)} until{" "}
                              {formatTime(booking.end)}
                            </p>
                          </div>
                        </Link>
                      ))}
                  </div>
                ) : (
                  <p>There are no upcoming events at the moment</p>
                )}
              </div>
            </div>
            <div>
              <div className=" rounded-lg p-2 my-2 font-semibold  max-w-[400px]">
                <h3 className="py-1 text-2xl">Opening Times</h3>
                <hr />
                <ul className="space-y-1">
                  {data.openingTime &&
                    data.openingTime.map((times: OpeningTime) => (
                      <div key={times.id} className="flex justify-between">
                        <p key={times.id}>
                          {formatDayOfWeek(times.dayOfWeek)}:
                        </p>{" "}
                        <p>
                          {times.openTime !== null
                            ? formatTime(times.openTime)
                            : `Closed`}
                          {times.closeTime !== null && `-`}
                          {times.closeTime !== null
                            ? formatTime(times.closeTime)
                            : null}
                          {times.midOpenTime !== null && ", "}
                          {times.midOpenTime !== null
                            ? formatTime(times.midOpenTime)
                            : null}
                          {times.midCloseTime !== null && `-`}
                          {times.midCloseTime !== null
                            ? formatTime(times.midCloseTime)
                            : null}
                        </p>
                      </div>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// export async function generateStaticParams() {
//   const data = await GetAllVenues();
//   return data.map((venue: Venue) => ({ slug: venue.id }));
// }
