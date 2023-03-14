import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session)
    return NextResponse.json({ message: "Please sign in to your account" });

  try {
    const data = await prisma.user.findUnique({
      where: {
        id: session?.user?.userId,
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
  }
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  try {
    const body = await request.json();
    console.log(body);

    const result = await prisma.user.update({
      where: {
        id: session?.user?.userId,
      },
      data: {
        name: body.name,
        email: body.email,
        role: body.role,
      },
    });
    console.log(result);

    return NextResponse.json({ result, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}
