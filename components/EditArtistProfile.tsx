'use client'

import { User } from "@/types/typings"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

type Props = 
{
    user: User,
}

function EditArtistProfile({user}: Props) {
  console.log(user);
  const artist = user.artist
    const router = useRouter()
    const [updateArtist, setUpdateArtist] = useState(artist)
    

const updateUserRole = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const body = { 
        ...updateArtist}
      await fetch(`/user`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then((response) => {
     if (response.status === 200) {
      }
        })
      } catch (error) {
        console.error(error)
    }

  }
  return (
    <>
        <div className="">
            <div className="flex flex-col justify-center">
                    <form onSubmit= {updateUserRole} className="space-y-2 mt-4">
                        <div>
                            <div>
                              <div>
                                <label>Stage Name:</label>
                                <input 
                                onChange={e => {setUpdateArtist({
                                ...updateArtist,
                                stageName: e.target.value
                                })}}
                                className="input-container" 
                                type="text" 
                                value={updateArtist.stageName}/>
                              </div>
                              <div>
                                <label>Address:</label>
                                <input 
                                onChange={e => {setUpdateArtist({
                                ...updateArtist,
                                address: e.target.value
                                })}}
                                className="input-container" 
                                type="text" 
                                value={updateArtist.address}/>
                              </div>
                              <div>
                                <label>Contact No:</label>
                                <input 
                                onChange={e => {setUpdateArtist({
                                ...updateArtist,
                                contactNumber: e.target.value
                                })}}
                                className="input-container" 
                                type="text" 
                                value={updateArtist.contactNumber}/>
                              </div>
                              <div>
                                <label>Facebook Link:</label>
                                <input 
                                onChange={e => {setUpdateArtist({
                                ...updateArtist,
                                facebookLink: e.target.value
                                })}}
                                className="input-container" 
                                type="text" 
                                value={updateArtist.facebookLink}/>
                              </div>
                              <div>
                                <label>Instagram Link:</label>
                                <input 
                                onChange={e => {setUpdateArtist({
                                ...updateArtist,
                                instagramLink: e.target.value
                                })}}
                                className="input-container" 
                                type="text" 
                                value={updateArtist.instagramLink}/>
                              </div>
                              <div>
                                <label>Twitter Link:</label>
                                <input 
                                onChange={e => {setUpdateArtist({
                                ...updateArtist,
                                twitterLink: e.target.value
                                })}}
                                className="input-container" 
                                type="text" 
                                value={updateArtist.twitterLink}/>
                              </div>
                              <div>
                                <label>Website:</label>
                                <input 
                                onChange={e => {setUpdateArtist({
                                ...updateArtist,
                                websiteLink: e.target.value
                                })}}
                                className="input-container" 
                                type="text" 
                                value={updateArtist.websiteLink}/>
                              </div>
                              <div>
                                <label> Available for hire?</label>
                                <select 
                                autoFocus
                                name="option"
                                defaultValue={updateArtist.avaiableForHire} 
                                onChange={e => {setUpdateArtist({
                                    ...updateArtist,
                                    avaiableForHire: e.target.value
                                })}}
                                placeholder="Category"
                                className="input-container"
                                required={true}
                                > 
                                    <option value=""></option>
                                    <option value="True">Yes</option>
                                    <option value="False">No</option>
                                </select>
                              </div>
                            </div>
                        </div>
                        <button 
                        type="submit"
                        className="w-full bg-myCharcoal text-white rounded-lg py-2">Submit</button>
                    </form>
                </div>
        </div>
    </>
  )
}

export default EditArtistProfile