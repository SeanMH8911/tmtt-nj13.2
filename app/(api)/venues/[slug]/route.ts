import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/client";
import { Time } from "@/types/typings";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: Params) {
  const slug = params.slug;

  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Sign in to update your venues" });

  try {
    const body = await request.json();

    const openingTimeData = body.openingTime.map((time: Time) => {
      return {
        where: { id: time.id },
        data: {
          openTime: time.openTime,
          closeTime: time.closeTime,
          midOpenTime: time.midOpenTime,
          midCloseTime: time.midCloseTime,
        },
      };
    });
    const result = await prisma.venue.update({
      where: {
        id: slug,
      },
      data: {
        title: body.title,
        images: body.images,
        lat: body.lat,
        lng: body.lng,
        postalCode: body.postalCode,
        fullAddress: body.fullAddress,
        streetName: body.road,
        locality: body.locality,
        area: body.area,
        country: body.country,
        venueCategory: body.category,
        openingTime: {
          updateMany: openingTimeData,
        },
      },
    });
    return NextResponse.json({
      result,
      status: 200,
      message: "You have successfully updated your venue",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}
