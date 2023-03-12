import { checkBooking } from "@/lib/checkBooking";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Sign in to add an event" });

  try {
    const body = await request.json();
    // Check if the booking already exists
    const existingBooking = await checkBooking(
      body.date,
      body.timeFrom,
      body.timeTill,
      body.venueId
    );
    console.log(existingBooking);
    if (existingBooking) {
      console.log("There is already a booking");

      return NextResponse.json({
        message: "The booking already exists",
        existingBooking,
        status: 409,
      });
    } else {
      const prismaUser = await prisma.user.findUnique({
        where: {
          id: session?.user.userId,
        },
        include: {
          artist: {
            include: {
              bookings: true,
            },
          },
        },
      });

      const result = await prisma.booking.create({
        data: {
          date: new Date(`${body.date}T${body.timeFrom}:00Z`),
          start: new Date(`${body.date}T${body.timeFrom}:00Z`),
          end: new Date(`${body.date}T${body.timeTill}:00Z`),
          venueId: body.venueId,
          venueTitle: body.searchTerm,
          artistId: prismaUser.artist.id,
        },
      });
      console.log(result);

      return NextResponse.json({ result });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "an error occurred" });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const prismaUser = await prisma.user.findUnique({
      where: {
        id: session?.user.userId,
      },
      include: {
        artist: {
          include: {
            bookings: true,
          },
        },
      },
    });
    console.log(prismaUser);

    const body = await request.json();
    const booking = await prisma.booking.delete({
      where: {
        artistId: prismaUser.artistId,
        id: body.id,
      },
    });
    console.log(booking);
    return NextResponse.json({
      booking,
      status: 200,
      message: "Booking has been succesfully deleted!",
    });
  } catch (error) {
    console.log(error);
  }
}
