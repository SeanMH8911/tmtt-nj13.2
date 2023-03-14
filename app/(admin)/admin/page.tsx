import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import CreateVenue from "../../../components/venue/CreateVenue";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// redirect('/api/auth/signin')

async function Admin() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  if (session?.user?.role === "Admin") {
    return (
      <div>
        <section className="max-w-[400px] mx-auto">
          <CreateVenue />
        </section>
      </div>
    );
  } else redirect("/api/auth/signin");
}

export default Admin;
