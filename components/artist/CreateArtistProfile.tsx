"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useS3Upload } from "next-s3-upload";
import { toast, Toaster } from "react-hot-toast";

const CreateArtistProfile = () => {
  const router = useRouter();
  const [stageName, setStageName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [road, setRoad] = useState("");
  const [locality, setLocality] = useState("");
  const [area, setArea] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState([]);
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [avaiableForHire, setAvaiableForHire] = useState("");
  const [imageUrl, setImageUrl] = useState();
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Creating Artist Profile...");
    try {
      const body = {
        contactEmail,
        road,
        locality,
        area,
        country,
        postalCode,
        stageName,
        contactNumber,
        facebookLink,
        instagramLink,
        youtubeLink,
        websiteLink,
        avaiableForHire,
        imageUrl,
        description,
        genres,
      };
      const response = await fetch(`/user/artistprofile`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      if (result.status === 200) {
        toast.dismiss();
        toast.success(result.message);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "There was a problem creating your profile, please try again"
      );
    }
  };
  let handleFileChange = async (file: File) => {
    let { url }: any = await uploadToS3(file);
    setImageUrl(url);
  };

  return (
    <div className="flex flex-col my-2 max-w-[500px] mx-auto">
      <Toaster />
      <form className="flex flex-col  " onSubmit={submitData}>
        <div className="space-y-2">
          <input
            autoFocus
            onChange={(e) => setStageName(e.target.value)}
            placeholder="Stage Name"
            type="text"
            value={stageName}
            className="input-container"
          />
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a short decription about yourself"
            className="w-full p-2  border-2 border-myBlue rounded-[10px] focus:outline-myOrange"
            rows={5}
            value={description}
          />
          <FileInput onChange={handleFileChange} />
          <button
            className="bg-myOrange text-white py-2 px-3 rounded-lg"
            type="button"
            onClick={openFileDialog}
          >
            Add Profile Image
          </button>
          {imageUrl && (
            <img
              className="rounded-full w-[150px] h-[150px] object-cover"
              src={imageUrl}
            />
          )}
          <div className="md:flex md:gap-2">
            <input
              onChange={(e) => setRoad(e.target.value)}
              autoFocus
              placeholder="First line of address"
              type="text"
              className="input-container mt-2 md:w-2/3"
              value={road}
              required={true}
            />
            <input
              onChange={(e) => setLocality(e.target.value)}
              autoFocus
              placeholder="Locality (e.g Adeje)"
              type="text"
              className="input-container mt-2 md:w-1/3"
              value={locality}
              required={true}
            />
          </div>
          <div className="md:flex md:gap-2">
            <input
              onChange={(e) => setArea(e.target.value)}
              autoFocus
              placeholder="Province"
              type="text"
              className="input-container mt-2"
              value={area}
              required={true}
            />
            <input
              onChange={(e) => setPostalCode(e.target.value)}
              autoFocus
              placeholder="Post Code"
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
          <input
            onChange={(e) => setContactNumber(e.target.value)}
            autoFocus
            placeholder="Contact Number"
            type="number"
            className="input-container "
            value={contactNumber}
            required={true}
          />
          <div className="md:flex md:gap-2">
            <input
              onChange={(e) => setFacebookLink(e.target.value)}
              autoFocus
              placeholder="Facebook Link"
              type="text"
              className="input-container "
              value={facebookLink}
              required={true}
            />
            <input
              onChange={(e) => setInstagramLink(e.target.value)}
              autoFocus
              placeholder="Instagram Link"
              type="text"
              className="input-container "
              value={instagramLink}
              required={true}
            />
          </div>
          <div className="md:flex md:gap-2">
            <input
              onChange={(e) => setYoutubeLink(e.target.value)}
              autoFocus
              placeholder="Youtube Link"
              type="text"
              className="input-container "
              value={youtubeLink}
              required={true}
            />
            <input
              onChange={(e) => setWebsiteLink(e.target.value)}
              autoFocus
              placeholder="Website Link"
              type="text"
              className="input-container  "
              value={websiteLink}
              required={true}
            />
          </div>
          <div>
            <label className="">Available for hire?</label>
            <select
              autoFocus
              onChange={(e) => setAvaiableForHire(e.target.value)}
              placeholder="Category"
              value={avaiableForHire}
              className="input-container"
              required={true}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <input
            onChange={(e) => setContactEmail(e.target.value)}
            autoFocus
            placeholder="Contact Email"
            type="email"
            className="input-container  "
            value={contactEmail}
          />
          {/* Genres not sure if to add of not */}
          {/* <div>
            <select multiple={true} name="" id="">
              <option value={""}>Pop Music</option>
              <option value={""}>Rock</option>
            </select>
          </div> */}
        </div>
        <button
          className="bg-myYellow h-[40px] rounded-lg mt-2"
          type="submit"
          value="Create"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreateArtistProfile;
