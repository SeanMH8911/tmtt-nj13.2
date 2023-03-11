import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Sign in to add an event" });

  try {
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
    const body = await request.json();
    console.log(body);

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
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}
