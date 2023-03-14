import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function getUser() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");
  const user = await prisma.user.findUnique(
    {
      where: {
        id: session?.user.userId,
      },
      include: {
        venue: {
          include: {
            openingTime: true,
          },
        },
        artist: {
          include: {
            bookings: true,
          },
        },
      },
    },
    { next: { revalidate: 60 } }
  );
  if (!user) throw new Error(" Could not find your account");
  return user;
}
