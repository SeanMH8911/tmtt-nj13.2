import EditArtistProfile from "@/components/artist/EditArtistProfile";
import getUser from "@/lib/getUser";
import React from "react";

async function EditArtistProfilePage() {
  const user = await getUser();
  return (
    <div className="">
      <section className="max-w-2xl mx-auto">
        <EditArtistProfile user={user} />
      </section>
    </div>
  );
}

export default EditArtistProfilePage;
