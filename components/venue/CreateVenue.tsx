"use client";
import React, { useEffect, useState } from "react";
import { useS3Upload } from "next-s3-upload";
import { useRouter } from "next/navigation";
import SearchForm from "./SearchForm";
import OperatingTimes from "../OperatingTimes";
import { LoadScriptNext } from "@react-google-maps/api";
import { toast, Toaster } from "react-hot-toast";

const libraries = ["places"];

const Venue = () => {
  const router = useRouter();
  const [manualEntry, setManualEntry] = useState(false);
  const [fullAddress, setFullAddress] = useState<string>("");
  const [propertyNumber, setPropertyNumber] = useState("");
  const [road, setRoad] = useState("");
  const [locality, setLocality] = useState("");
  const [area, setArea] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [postalCode, setPostalCode] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const { uploadToS3 } = useS3Upload();
  const [addSecondTimeSlot, setAddSecondTimeSlot] = useState(false);
  // prettier-ignore
  const [openHours, setOpenHours] = useState([
  { day: 0, isOpen: true, timePeriods: [{ openTime: '', closingTime: '' }, { openTime: '', closingTime: '' }] },
  { day: 1, isOpen: true, timePeriods: [{ openTime: '', closingTime: '' }, { openTime: '', closingTime: '' }] },
  { day: 2, isOpen: true, timePeriods: [{ openTime: '', closingTime: '' }, { openTime: '', closingTime: '' }] },
  { day: 3, isOpen: true, timePeriods: [{ openTime: '', closingTime: '' }, { openTime: '', closingTime: '' }] },
  { day: 4, isOpen: true, timePeriods: [{ openTime: '', closingTime: '' }, { openTime: '', closingTime: '' }] },
  { day: 5, isOpen: true, timePeriods: [{ openTime: '', closingTime: '' }, { openTime: '', closingTime: '' }] },
  { day: 6, isOpen: true, timePeriods: [{ openTime: '', closingTime: '' }, { openTime: '', closingTime: '' }] },
    ]);

  const addressProps = {
    propertyNumber,
    setPropertyNumber,
    road,
    setRoad,
    locality,
    setLocality,
    area,
    setArea,
    country,
    setCountry,
    fullAddress,
    setFullAddress,
    lat,
    lng,
    setLat,
    setLng,
    postalCode,
    setPostalCode,
    title,
    setTitle,
  };
  const handleFilesChange = async ({ target }: any) => {
    const files = Array.from(target.files);
    for (let index = 0; index < files.length; index++) {
      const file: any = files[index];
      const { url } = await uploadToS3(file);
      setUrls((current) => [...current, url]);
      setImages((current) => [...current, url]);
    }
  };

  const addressEntry = () => {
    setManualEntry((current) => !current);
  };

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Creating Venue...");
    try {
      const body = {
        title,
        images,
        lat,
        lng,
        postalCode,
        fullAddress,
        road,
        locality,
        area,
        country,
        category,
        openHours,
      };
      const response = await fetch(`/venues`, {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === 200) {
        toast.dismiss();
        toast.success("Venue successfully created!");
      }
    } catch (error) {
      console.error(error);
    }
    router.push("/dashboard");
  };

  useEffect(() => {
    console.log(openHours);
  }, [openHours]);

  return (
    <div className="flex flex-col my-2">
      <Toaster />
      <div>
        <LoadScriptNext
          googleMapsApiKey="AIzaSyBtx6X2LcZwZ-H-eZlskR_G4wXuMAZCnLE"
          // @ts-ignore
          libraries={libraries}
        >
          <SearchForm {...addressProps} />
        </LoadScriptNext>
      </div>
      <form className="flex flex-col mt-5 " onSubmit={submitData}>
        <input
          hidden={true}
          autoFocus
          onChange={(e) => setFullAddress(e.target.value)}
          placeholder=""
          type="text"
          value={fullAddress}
          className="input-container"
        />
        <button type="button" onClick={addressEntry} className="mt-2">
          Enter address manually
        </button>
        {manualEntry && (
          <div>
            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Business Name"
              type="text"
              value={title}
              className="input-container"
            />

            <input
              onChange={(e) => setRoad(e.target.value)}
              autoFocus
              placeholder="Street name"
              type="text"
              className="input-container mt-2"
              value={road}
              required={true}
            />
            <input
              onChange={(e) => setLocality(e.target.value)}
              autoFocus
              placeholder="Locality"
              type="text"
              className="input-container mt-2"
              value={locality}
              required={true}
            />
            <input
              onChange={(e) => setArea(e.target.value)}
              autoFocus
              placeholder="Area"
              type="text"
              className="input-container mt-2"
              value={area}
              required={true}
            />
            <input
              onChange={(e) => setPostalCode(e.target.value)}
              autoFocus
              placeholder="Postal Code"
              type="text"
              className="input-container mt-2"
              value={postalCode}
              required={true}
            />
            <input
              onChange={(e) => setCountry(e.target.value)}
              autoFocus
              placeholder="Country"
              type="text"
              className="input-container mt-2 "
              value={country}
              required={true}
            />
          </div>
        )}
        <label className="mt-2">Category</label>
        <select
          autoFocus
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          value={category}
          className="input-container"
          required={true}
        >
          <option value=""></option>
          <option value="Restaurant">Restaurant</option>
          <option value="Bar">Bar</option>
        </select>
        <div>
          <OperatingTimes
            openHours={openHours}
            setOpenHours={setOpenHours}
            addSecondTimeSlot={addSecondTimeSlot}
            setAddSecondTimeSlot={setAddSecondTimeSlot}
          />
        </div>
        <label className="mt-2">Upload Images</label>
        <input
          type="file"
          name="file"
          required={true}
          multiple={true}
          id="file_input"
          className="relative m-0  block w-full min-w-0 flex-auto cursor-pointer rounded-lg border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-200 dark:focus:bg-transparent"
          onChange={handleFilesChange}
        />
        <div className="flex mt-2 space-x-2">
          {urls &&
            urls.map((url, i) => {
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
          Create
        </button>
      </form>
    </div>
  );
};

export default Venue;
