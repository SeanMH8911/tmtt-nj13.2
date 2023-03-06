'use client'

import { Venue } from "@/types/typings"

type Props ={
    venues :Venue
}

function SearchBox({venues}: Props) {
    
  return (
    <div>
        <input type="text"
        placeholder="Search for venue"
        />
    </div>
  )
}

export default SearchBox