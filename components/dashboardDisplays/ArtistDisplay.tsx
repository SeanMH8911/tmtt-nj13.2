"use client";
import { formatDate, formatTime } from "@/lib/formatters";
import { Venue } from "@/types/typings";
import { Booking } from "@prisma/client";
import Link from "next/link";
import React from "react";
import CreateBooking from "../artist/CreateBooking";
import DeleteBooking from "../artist/DeleteBooking";

type Props = {
  allVenues: Venue[];
  bookings: Booking[];
};

async function getData() {
  const data = await fetch("/bookings/mybookings");
  const response = await data.json();
  return response;
}

export default function ArtistDisplay({ allVenues, bookings }: Props) {
  const user = getData();
  console.log(user);

  const allVenuesWithDatesAsString = allVenues.map((venue: Venue) => {
    return {
      ...venue,
      createdAt: venue.createdAt.toString(),
      updatedAt: venue.updatedAt.toString(),
    };
  });
  return (
    <div className="p-2 max-w-5xl mx-auto mt-5">
      <Link href={"/dashboard/profile/editMyProfile"}>
        <button
          type="button"
          className="bg-myCharcoal px-2 py-1 rounded-lg text-white mb-3"
        >
          Edit Profile
        </button>
      </Link>
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
            {bookings &&
              bookings.map((booking: Booking) => (
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
          <CreateBooking allVenues={allVenuesWithDatesAsString} />
        </div>
      </div>
    </div>
  );
}
