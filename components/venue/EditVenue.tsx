"use client";
import React, { useEffect, useState } from "react";
import { useS3Upload } from "next-s3-upload";
import { Venue } from "@/types/typings";
import { useRouter } from "next/navigation";
import EditOperatingTimes from "../EditOperatingTimes";
import { OpeningTime } from "@prisma/client";
import { formatDayOfWeek, formatTime } from "@/lib/formatters";
import { toast, Toaster } from "react-hot-toast";

type Props = {
  venue: Venue;
};

const EditVenue = ({ venue }: Props) => {
  const router = useRouter();

  const [venueDetail, setVenueDetail] = useState(venue);
  const [images, setImages] = useState<string[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const { uploadToS3 } = useS3Upload();
  const [addSecondTimeSlot, setAddSecondTimeSlot] = useState(false);
  const [editOpeningTimes, setEditOpeningTimes] = useState(false);

  const handleFilesChange = async ({ target }: any) => {
    const files = Array.from(target.files);
    for (let index = 0; index < files.length; index++) {
      const file: any = files[index];
      const { url } = await uploadToS3(file);
      setUrls((current) => [...current, url]);
      setImages((current) => [...current, url]);
    }
  };
  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Updating venue...");
    try {
      const body = {
        ...venueDetail,
        images,
      };
      console.log(body);

      const response = await fetch(`/venues/${venue.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === 200) {
        toast.dismiss();
        toast.success(result.message);
        router.push(`/dashboard`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(venueDetail);
  }, [venueDetail]);
  return (
    <div className="flex flex-col my-2 text-gray-500/70 p-2">
      <div>
        <Toaster />
      </div>
      <form className="flex flex-col mt-5 " onSubmit={submitData}>
        <input
          hidden={true}
          autoFocus
          onChange={(e) => {
            setVenueDetail({
              ...venueDetail,
              fullAddress: e.target.value,
            });
          }}
          placeholder=""
          type="text"
          value={venueDetail.fullAddress}
          className="input-container-edit "
        />
        <div>
          <input
            autoFocus
            onChange={(e) => {
              setVenueDetail({
                ...venueDetail,
                title: e.target.value,
              });
            }}
            placeholder="Business Name"
            type="text"
            value={venueDetail.title}
            className="input-container-edit "
          />

          <input
            onChange={(e) => {
              setVenueDetail({
                ...venueDetail,
                streetName: e.target.value,
              });
            }}
            autoFocus
            placeholder="Street name"
            type="text"
            className="input-container-edit  mt-2"
            value={venueDetail.streetName}
            required={true}
          />
          <input
            onChange={(e) => {
              setVenueDetail({
                ...venueDetail,
                locality: e.target.value,
              });
            }}
            autoFocus
            placeholder="Locality"
            type="text"
            className="input-container-edit  mt-2"
            value={venueDetail.locality}
            required={true}
          />
          <input
            onChange={(e) => {
              setVenueDetail({
                ...venueDetail,
                area: e.target.value,
              });
            }}
            autoFocus
            placeholder="Area"
            type="text"
            className="input-container-edit  mt-2"
            value={venueDetail.area}
            required={true}
          />
          <input
            onChange={(e) => {
              setVenueDetail({
                ...venueDetail,
                postalCode: e.target.value,
              });
            }}
            autoFocus
            placeholder="Postal Code"
            type="text"
            className="input-container-edit  mt-2"
            value={venueDetail.postalCode}
            required={true}
          />
          <input
            onChange={(e) => {
              setVenueDetail({
                ...venueDetail,
                country: e.target.value,
              });
            }}
            autoFocus
            placeholder="Country"
            type="text"
            className="input-container-edit  mt-2 "
            value={venueDetail.country}
            required={true}
          />
        </div>
        <label className="mt-2">Category</label>
        <select
          autoFocus
          onChange={(e) => {
            setVenueDetail({
              ...venueDetail,
              venueCategory: e.target.value,
            });
          }}
          placeholder="Category"
          value={venueDetail.venueCategory}
          className="input-container-edit "
          required={true}
        >
          <option value=""></option>
          <option value="Restaurant">Restaurant</option>
          <option value="Bar">Bar</option>
        </select>
        <div>
          <div className="bg-myBlue rounded-lg p-2 my-2 text-myCharcoal font-bold  max-w-[400px] mx-auto">
            {/* OpeningTimes with edit button  */}
            <div className="flex justify-between items-center">
              <h3 className="py-1 text-2xl">Opening Times</h3>
              <button type="button" onClick={() => setEditOpeningTimes(true)}>
                Edit
              </button>
            </div>
            <hr />
            <ul className="space-y-1">
              {venueDetail.openingTime &&
                venueDetail.openingTime.map((times: OpeningTime) => (
                  <div key={times.id} className="flex justify-between">
                    <p key={times.id}>{formatDayOfWeek(times.dayOfWeek)}:</p>{" "}
                    <p>
                      {times.openTime !== null
                        ? formatTime(times.openTime)
                        : `Closed`}
                      {times.closeTime !== null && `-`}
                      {times.closeTime !== null
                        ? formatTime(times.closeTime)
                        : null}
                      {times.midOpenTime !== null && ", "}
                      {times.midOpenTime !== null
                        ? formatTime(times.midOpenTime)
                        : null}
                      {times.midCloseTime !== null && `-`}
                      {times.midCloseTime !== null
                        ? formatTime(times.midCloseTime)
                        : null}
                    </p>
                  </div>
                ))}
            </ul>
          </div>
          {/* editable opening times  */}
          {editOpeningTimes && (
            <EditOperatingTimes
              venueDetail={venueDetail}
              setVenueDetail={setVenueDetail}
              addSecondTimeSlot={addSecondTimeSlot}
              setAddSecondTimeSlot={setAddSecondTimeSlot}
            />
          )}
        </div>
        <label className="mt-2">Upload Images</label>
        <input
          type="file"
          name="file"
          multiple={true}
          id="file_input"
          className="relative m-0  block w-full min-w-0 flex-auto cursor-pointer rounded-lg border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-200 dark:focus:bg-transparent"
          onChange={handleFilesChange}
        />
        <div className="flex mt-2 space-x-2">
          {venueDetail.images &&
            venueDetail.images.map((url, i) => {
              return (
                <img
                  className="object-cover w-20 h-20"
                  key={i}
                  src={url}
                  alt={url}
                />
              );
            })}
        </div>
        <button
          className="bg-myYellow h-[40px] rounded-lg mt-2"
          type="submit"
          value="Create"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditVenue;
