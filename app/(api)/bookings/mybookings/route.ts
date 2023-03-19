import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  try {
    const prismaUser = await prisma.artist.findUnique({
      where: {
        userId: session?.user.userId,
      },
    });

    const bookings = await prisma.booking.findMany({
      where: {
        artistId: prismaUser.id,
      },
    });
    console.log(bookings);

    return NextResponse.json({ bookings, status: 200 });
  } catch (error) {}
}
