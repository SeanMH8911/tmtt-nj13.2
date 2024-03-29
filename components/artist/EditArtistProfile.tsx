"use client";

import { User } from "@/types/typings";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useS3Upload } from "next-s3-upload";
import { toast, Toaster } from "react-hot-toast";

type Props = {
  user: User;
};

function EditArtistProfile({ user }: Props) {
  const artist = user.artist;
  const router = useRouter();
  const [updateArtist, setUpdateArtist] = useState(artist);
  const [newImage, setNewImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Updating profile...");
    try {
      let body = { ...updateArtist };
      const response = await fetch(`/user/artistprofile/`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.status === 200) {
        toast.dismiss();
        toast.success("Profile updated successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  let handleFileChange = async (file: File) => {
    let { url }: any = await uploadToS3(file);
    setImageUrl(url);
  };
  useEffect(() => {
    if (imageUrl) {
      setUpdateArtist({
        ...updateArtist,
        profileImg: imageUrl,
      });
    }
  }, [imageUrl]);
  return (
    <>
      <Toaster />
      <div className="flex flex-col my-2 max-w-[500px] mx-auto text-gray-500/70">
        <form className="flex flex-col  " onSubmit={updateProfile}>
          <div className="space-y-2">
            <input
              onChange={(e) =>
                setUpdateArtist({
                  ...updateArtist,
                  stageName: e.target.value,
                })
              }
              placeholder="Stage Name"
              type="text"
              value={updateArtist.stageName || ""}
              className="input-container-edit "
            />
            <textarea
              onChange={(e) =>
                setUpdateArtist({
                  ...updateArtist,
                  description: e.target.value,
                })
              }
              placeholder="Enter a short decription about yourself"
              className="w-full p-2  border-2 border-myBlue rounded-[10px] focus:outline-myOrange text-gray-500/70 focus:text-gray-700"
              rows={5}
              value={updateArtist.description || ""}
            />
            <FileInput onChange={handleFileChange} />
            <button
              className="bg-myOrange text-white py-2 px-3 rounded-lg"
              type="button"
              onClick={openFileDialog}
            >
              Update Profile Image
            </button>
            {!newImage && updateArtist.profileImg && (
              <img
                className="rounded-full w-[150px] h-[150px] object-cover"
                src={updateArtist.profileImg}
              />
            )}
            {newImage && imageUrl && (
              <img
                className="rounded-full w-[150px] h-[150px] object-cover"
                src={imageUrl}
              />
            )}
            <div className="md:flex md:gap-2">
              <input
                onChange={(e) =>
                  setUpdateArtist({
                    ...updateArtist,
                    streetName: e.target.value,
                  })
                }
                placeholder="First line of address"
                type="text"
                className="input-container-edit  mt-2 md:w-2/3"
                value={updateArtist.streetName || ""}
                required={true}
              />
              <input
                onChange={(e) =>
                  setUpdateArtist({
                    ...updateArtist,
                    locality: e.target.value,
                  })
                }
                placeholder="Locality (e.g Adeje)"
                type="text"
                className="input-container-edit  mt-2 md:w-1/3"
                value={updateArtist.locality || ""}
                required={true}
              />
            </div>
            <div className="md:flex md:gap-2">
              <input
                onChange={(e) =>
                  setUpdateArtist({
                    ...updateArtist,
                    area: e.target.value,
                  })
                }
                placeholder="Province"
                type="text"
                className="input-container-edit  mt-2"
                value={updateArtist.area || ""}
                required={true}
              />
              <input
                onChange={(e) =>
                  setUpdateArtist({
                    ...updateArtist,
                    postalCode: e.target.value,
                  })
                }
                placeholder="Post Code"
                type="text"
                className="input-container-edit  mt-2"
                value={updateArtist.postalCode || ""}
                required={true}
              />
              <input
                onChange={(e) =>
                  setUpdateArtist({
                    ...updateArtist,
                    country: e.target.value,
                  })
                }
                placeholder="Country"
                type="text"
                className="input-container-edit  mt-2 "
                value={updateArtist.country || ""}
                required={true}
              />
            </div>
            <input
              onChange={(e) =>
                setUpdateArtist({
                  ...updateArtist,
                  contactNumber: e.target.value,
                })
              }
              placeholder="Contact Number"
              type="number"
              className="input-container-edit  "
              value={updateArtist.contactNumber || ""}
              required={true}
            />
            <div className="md:flex md:gap-2">
              <input
                onChange={(e) =>
                  setUpdateArtist({
                    ...updateArtist,
                    facebookLink: e.target.value,
                  })
                }
                placeholder="Facebook Link"
                type="text"
                className="input-container-edit  "
                value={updateArtist.facebookLink || ""}
              />
              <input
                onChange={(e) =>
                  setUpdateArtist({
                    ...updateArtist,
                    instagramLink: e.target.value,
                  })
                }
                placeholder="Instagram Link"
                type="text"
                className="input-container-edit  "
                value={updateArtist.instagramLink || ""}
              />
            </div>
            <div className="md:flex md:gap-2">
              <input
                onChange={(e) =>
                  setUpdateArtist({
                    ...updateArtist,
                    youtubeLink: e.target.value,
                  })
                }
                placeholder="Youtube Link"
                type="text"
                className="input-container-edit  "
                value={updateArtist.youtubeLink || ""}
              />
              <input
                onChange={(e) =>
                  setUpdateArtist({
                    ...updateArtist,
                    websiteLink: e.target.value,
                  })
                }
                placeholder="Website Link"
                type="text"
                className="input-container-edit   "
                value={updateArtist.websiteLink || ""}
              />
            </div>
            <div>
              <label className="">Available for hire?</label>
              <select
                onChange={(e) =>
                  setUpdateArtist({
                    ...updateArtist,
                    avaiableForHire: e.target.value,
                  })
                }
                placeholder="Category"
                value={updateArtist.avaiableForHire || ""}
                className="input-container-edit "
                required={true}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <input
              onChange={(e) =>
                setUpdateArtist({
                  ...updateArtist,
                  contactEmail: e.target.value,
                })
              }
              placeholder="Contact Email"
              type="email"
              className="input-container-edit "
              value={updateArtist.contactEmail || ""}
            />
          </div>
          <button
            className="bg-myYellow h-[40px] rounded-lg mt-2 text-myCharcoal"
            type="submit"
            value="Create"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default EditArtistProfile;
