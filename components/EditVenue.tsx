'use client'
import React, { useEffect, useState } from 'react'
import { useS3Upload } from "next-s3-upload";
import {  Venue } from '@/types/typings';
import { useRouter } from 'next/navigation'

type Props = 
{
    venue: Venue
}

const  EditVenue =  ({venue}: Props) => {
    const router = useRouter()
    console.log(venue);
    const [venueDetail, setVenueDetail] = useState(venue)
    const [images, setImages] = useState<string[]>([])
    const [urls, setUrls] = useState<string[]>([]);
    const { uploadToS3 } = useS3Upload();

  const handleFilesChange = async ({ target }: any) => {
    const files = Array.from(target.files);
    for (let index = 0; index < files.length; index++) {
      const file: any = files[index];
      const { url } = await uploadToS3(file);
      setUrls(current => [...current, url]);
      setImages(current => [...current, url])
    //   setVenueDetail({
    //                 ...venueDetail,
    //                 images: images
    //               })
                  
    }
       
};
  
  const submitData = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const body = { 
        ...venueDetail, images}
      await fetch(`/venues/${venue.id}`, {
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
     router.push(`/dashboard`)
  }

  return (
      <div className="flex flex-col my-2">
        <div>
        </div>
              <form
              className="flex flex-col mt-5 "
              onSubmit={submitData}>
              <input
              hidden={true}
                  autoFocus
                  onChange={e => {setVenueDetail({
                    ...venueDetail,
                    fullAddress: e.target.value
                  })}}
                  placeholder=""
                  type="text"
                  value={venueDetail.fullAddress}
                  className="input-container"
              />
                <div>
              <input
                  autoFocus
                  onChange={e => {setVenueDetail({
                    ...venueDetail,
                    title: e.target.value
                  })}}
                  placeholder="Business Name"
                  type="text"
                  value={venueDetail.title}
                  className="input-container"
              />

              <input
                  onChange={e => {setVenueDetail({
                    ...venueDetail,
                    streetName: e.target.value
                  })}}
                  autoFocus
                  placeholder="Street name"
                  type="text"
                  className="input-container mt-2"
                  value={venueDetail.streetName}
                  required={true}
              />
              <input
                  onChange={e => {setVenueDetail({
                    ...venueDetail,
                    locality: e.target.value
                  })}}
                  autoFocus
                  placeholder="Locality"
                  type="text"
                  className="input-container mt-2"
                  value={venueDetail.locality}
                  required={true}
              />
              <input
                  onChange={e => {setVenueDetail({
                    ...venueDetail,
                    Area: e.target.value
                  })}}
                  autoFocus
                  placeholder="Area"
                  type="text"
                  className="input-container mt-2"
                  value={venueDetail.Area}
                  required={true}
              />
              <input
                  onChange={e => {setVenueDetail({
                    ...venueDetail,
                    postalCode: e.target.value
                  })}}
                  autoFocus
                  placeholder="Postal Code"
                  type="text"
                  className="input-container mt-2"
                  value={venueDetail.postalCode}
                  required={true}
              />
              <input
                  onChange={e => {setVenueDetail({
                    ...venueDetail,
                    Country: e.target.value
                  })}}
                  autoFocus
                  placeholder="Country"
                  type="text"
                  className="input-container mt-2 "
                  value={venueDetail.Country}
                  required={true}
              />
                </div>
              <label className='mt-2'>Category</label>
              <select
                  autoFocus
                  onChange={e => {setVenueDetail({
                    ...venueDetail,
                    venueCategory: e.target.value
                  })}}
                  placeholder="Category"
                  value={venueDetail.venueCategory}
                  className="input-container"
                  required={true}
              >
                <option value=""></option>
                <option value="Restaurant">Restaurant</option>
                <option value="Bar">Bar</option>
              </select>
              <label className='mt-2'>Upload Images</label>
                <input
                    type="file"
                    name="file"
                    multiple={true}
                    id="file_input"
                    className="relative m-0  block w-full min-w-0 flex-auto cursor-pointer rounded-lg border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-200 dark:focus:bg-transparent"
                    onChange={handleFilesChange}
                />
                <div className='flex mt-2 space-x-2'>
                {
                  venueDetail.images &&  venueDetail.images.map((url,i) => { return(
                      <img 
                      className='object-cover w-20 h-20'
                      key={i}
                      src={url}  
                      alt={url}/>
                    )})
                }
                </div>
              <button
              className='bg-myYellow h-[40px] rounded-lg mt-2'
              type="submit"
              value="Create"
              >Create</button>
          </form>
      </div>
  
  )
}

export default EditVenue;