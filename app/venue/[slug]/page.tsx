import { formatDate, formatTime } from "@/lib/formatters";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/client";
import { Booking, OpeningTime } from "@/types/typings";
import { getServerSession } from "next-auth";
import Link from "next/link";

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
      },
    },
  });
  return data;
}

async function VenueDetail({ params }: Props) {
  const session = await getServerSession(authOptions);
  const data = await getData({ params });

  function showDayOfWeek(i: any) {
    if (i === 0) return "Sunday";
    if (i === 1) return "Monday";
    if (i === 2) return "Tuesday";
    if (i === 3) return "Wednesday";
    if (i === 4) return "Thursday";
    if (i === 5) return "Friday";
    if (i === 6) return "Saturday";
  }
  function timeFormat(i: any) {
    const timeString = new Date(`${i}`).toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
    return timeString;
  }

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
              <img src={data.images[0]} alt={data.title} />
            </div>
          </div>
          <div className="p-2.5 lg:p-10 justify-start lg:w-1/2">
            <div>
              <h3>Upcoming Events</h3>
              <div className="mt-5">
                {data.bookings?.length > 0 && (
                  <div>
                    {data.bookings
                      .filter((booking: Booking) => {
                        // Compare the booking date with the current date
                        const bookingDate = new Date(booking.date);
                        return bookingDate > now;
                      })
                      .map((booking: Booking) => (
                        <div className="flex" key={booking.id}>
                          <p className="bg-myBlue p-2 ">
                            {booking.artist.stageName},{" "}
                            {formatDate(booking.date)} from{" "}
                            {formatTime(booking.start)} until{" "}
                            {formatTime(booking.end)}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="bg-myBlue rounded-lg p-2 my-2 max-w-[300px] text-myCharcoal font-bold">
                <h3 className="py-1 text-2xl">Opening Times</h3>
                <hr />
                <ul className="space-y-1">
                  {data.openingTime &&
                    data.openingTime.map((times: OpeningTime) => (
                      <div key={times.id} className="flex justify-between">
                        <p key={times.id}>{showDayOfWeek(times.dayOfWeek)}:</p>{" "}
                        <p>
                          {timeFormat(times.openTime)} -{" "}
                          {timeFormat(times.closeTime)}{" "}
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

export default VenueDetail;
