import prisma from "@/prisma/client";

export async function checkBooking(
  date: string,
  timeFrom: string,
  timeTill: string,
  venueId: number
) {
  const formattedDate = new Date(`${date}T${timeFrom}:00Z`).toISOString();
  const start = new Date(`${date}T${timeFrom}:00`).toISOString();
  const end = new Date(`${date}T${timeTill}:00`).toISOString();
  console.log(venueId, formattedDate, start, end);

  const bookings = await prisma.booking.findMany({
    where: {
      venueId: venueId,
      OR: [
        {
          start: {
            lte: start,
          },
          end: {
            gte: start,
          },
        },
        {
          start: {
            lte: end,
          },
          end: {
            gte: end,
          },
        },
      ],
    },
  });

  return bookings.length > 0;
}
