'use client'

import CreateArtistProfile from "@/components/CreateArtistProfile"


function page() {
  return (
    <div className="flex justify-center">
       <section className="max-w-2xl">
         <CreateArtistProfile />
       </section>
    </div>
  )
}

export default page