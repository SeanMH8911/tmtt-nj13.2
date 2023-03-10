"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useS3Upload } from "next-s3-upload";

const CreateArtistProfile = () => {
  const [stageName, setStageName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [avaiableForHire, setAvaiableForHire] = useState("");
  const [imageUrl, setImageUrl] = useState();
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = {
        stageName,
        address,
        contactNumber,
        facebookLink,
        instagramLink,
        twitterLink,
        websiteLink,
        avaiableForHire,
        imageUrl,
      };
      await fetch(`/user/artistprofile`, {
        method: "POST",
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then((response) => {
        if (response.status === 200) {
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  let handleFileChange = async (file: File) => {
    let { url }: any = await uploadToS3(file);
    setImageUrl(url);
  };
  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);

  return (
    <div className="flex flex-col my-2">
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
          <FileInput onChange={handleFileChange} />

          <button type="button" onClick={openFileDialog}>
            Upload file
          </button>

          {imageUrl && (
            <img
              className="rounded-full w-[150px] h-[150px] object-cover"
              src={imageUrl}
            />
          )}
          <input
            autoFocus
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Full Address"
            type="text"
            value={address}
            className="input-container"
          />
          <input
            onChange={(e) => setContactNumber(e.target.value)}
            autoFocus
            placeholder="Contact Number"
            type="text"
            className="input-container "
            value={contactNumber}
            required={true}
          />
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
          <input
            onChange={(e) => setTwitterLink(e.target.value)}
            autoFocus
            placeholder="Twitter Link"
            type="text"
            className="input-container "
            value={twitterLink}
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

export default CreateArtistProfile;
