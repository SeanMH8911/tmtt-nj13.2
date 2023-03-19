import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Venue } from "@/types/typings";
import getUser from "@/lib/getUser";
import GetAllVenues from "@/lib/getAllVenues";
import ArtistDisplay from "@/components/dashboardDisplays/ArtistDisplay";
import UserDisplay from "@/components/dashboardDisplays/UserDisplay";
import AdminDisplay from "@/components/dashboardDisplays/AdminDisplay";
import VenueOwnerDisplay from "@/components/dashboardDisplays/VenueOwnerDisplay";

export default async function dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");
  const user = await getUser();
  const venues: Venue[] = user.venue;
  const allVenues = await GetAllVenues();
  const bookings = user?.artist?.bookings ?? [];

  // General User Dashboard
  if (user.role === "User") {
    return <UserDisplay />;
  }

  // Admin dashboard
  if (user.role === "Admin") {
    return <AdminDisplay venues={venues} />;
  }

  // VenueOwner Dashboard
  if (user.role === "VenueOwner") {
    return <VenueOwnerDisplay venues={venues} />;
  }

  // Artist Dashboard
  if (user.role === "Artist") {
    return <ArtistDisplay allVenues={allVenues} bookings={bookings} />;
  }
}
