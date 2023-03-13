import CreateArtistProfile from "@/components/artist/CreateArtistProfile";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");
  return (
    <div className="flex justify-center">
      <section className="max-w-2xl">
        <CreateArtistProfile />
      </section>
    </div>
  );
}

export default page;
