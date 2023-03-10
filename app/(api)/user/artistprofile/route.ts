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
        twitterLink: body.twitterLink,
        websiteLink: body.websiteLink,
        avaiableForHire: body.avaiableForHire,
      },
    });
    console.log(result);

    return NextResponse.json({ result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}
