import { formatDate, formatTime } from "@/lib/formatters";
import { Booking } from "@/types/typings";
import Link from "next/link";
type Props = {
  booking: Booking;
};
export default function UpcomingBookings({ booking }: Props) {
  return (
    <div className="bg-myBlue p-2 rounded-lg my-2">
      <Link href={`venue/${booking.venueId}`}>
        <p>
          Playing at <span className="font-bold">{booking.venueTitle}</span> on{" "}
          {formatDate(booking.date)} {formatTime(booking.start)} -{" "}
          {formatTime(booking.end)}
        </p>
      </Link>
    </div>
  );
}
