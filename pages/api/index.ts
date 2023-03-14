import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: {
      id: "clf12m6c50000bz5kqtpor4k8",
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
  });
  console.log(user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
