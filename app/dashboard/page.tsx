import UserListings from "../../components/user/UserListings";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import prisma from "@/prisma/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Booking, Venue } from "@/types/typings";
import getUser from "@/lib/getUser";
import AddBooking from "@/components/artist/AddBooking";
import GetAllVenues from "@/lib/getAllVenues";
import dayjs from "dayjs";
import DeleteBooking from "@/components/artist/DeleteBooking";
import { formatDate, formatTime } from "@/lib/formatters";

async function userListings() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  } else {
    const data = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      include: {
        venue: true,
      },
    });

    return data;
  }
}
async function dashboard() {
  const listings = await userListings();
  const venues = listings.venue;
  const user = await getUser();
  const allVenues = await GetAllVenues();
  const bookings = user.artist.bookings;

  if (user.role === "VenueOwner") {
    return (
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
    );
  }

  if (user.role === "Artist") {
    return (
      <div className="p-2 max-w-5xl mx-auto mt-5">
        <h1 className="mb-3 text-2xl">My Bookings</h1>
        <div className="w-full ">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-center">
                <th className="border md:px-4 py-2">Venue Title</th>
                <th className="border md:px-4 py-2">Date</th>
                <th className="border md:px-4 py-2">Start Time</th>
                <th className="border md:px-4 py-2">End Time</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking: Booking) => (
                <tr key={booking.id} className="text-center">
                  <td className="border md:px-4 py-2">{booking.venueTitle}</td>
                  <td className="border md:px-4 py-2">
                    {formatDate(booking.date)}
                  </td>
                  <td className="border md:px-4 py-2">
                    {formatTime(booking.start)}
                  </td>
                  <td className="border md:px-4 py-2">
                    {formatTime(booking.end)}
                  </td>
                  <td className="border md:px-4 py-2">
                    <DeleteBooking id={booking.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <div className="">
            <AddBooking allVenues={allVenues} />
          </div>
        </div>
      </div>
    );
  }

  if (user.role === "User") {
    return (
      <div className="max-w-5xl mx-auto mt-5">
        <h1>My Account</h1>
      </div>
    );
  }
}

export default dashboard;
