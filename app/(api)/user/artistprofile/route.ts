import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Sign in to update your profile" });

  try {
    const prismaUser = await prisma.user.findUnique({
      where: {
        id: session?.user.userId,
      },
    });
    const body = await request.json();
    console.log(body);

    const result = await prisma.artist.create({
      data: {
        userId: prismaUser.id,
        profileImg: body.imageUrl,
        stageName: body.stageName,
        address: body.address,
        contactNumber: body.contactNumber,
        facebookLink: body.facebookLink,
        instagramLink: body.instagramLink,
        youtubeLink: body.youtubeLink,
        websiteLink: body.websiteLink,
        avaiableForHire: body.avaiableForHire,
        contactEmail: body.contactEmail,
        streetName: body.road,
        locality: body.locality,
        area: body.area,
        country: body.country,
        postalCode: body.postalCode,
        description: body.description,
        genres: body.genres,
      },
    });
    console.log(result);

    return NextResponse.json({
      result,
      status: 200,
      message: "You have succesfully created your artist profile",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}
export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Sign in to update your profile" });

  try {
    const prismaUser = await prisma.user.findUnique({
      where: {
        id: session?.user.userId,
      },
      include: {
        artist: true,
      },
    });
    const body = await request.json();
    console.log(prismaUser);
    const result = await prisma.artist.update({
      where: {
        userId: prismaUser.id,
      },
      data: {
        profileImg: body.imageUrl,
        stageName: body.stageName,
        address: body.address,
        contactNumber: body.contactNumber,
        facebookLink: body.facebookLink,
        instagramLink: body.instagramLink,
        youtubeLink: body.youtubeLink,
        websiteLink: body.websiteLink,
        avaiableForHire: body.avaiableForHire,
        contactEmail: body.contactEmail,
        streetName: body.road,
        locality: body.locality,
        area: body.area,
        country: body.country,
        postalCode: body.postalCode,
        description: body.description,
        genres: body.genres,
      },
    });
    console.log(result);

    return NextResponse.json({ result, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}
