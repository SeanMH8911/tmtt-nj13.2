"use client";

import { User } from "@/types/typings";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

type Props = {
  user: User;
};

function UserListingProfile({ user }: Props) {
  const router = useRouter();
  const [updateUser, setUpdateUser] = useState(user);

  const updateUserRole = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("updating user profile");
    try {
      const body = {
        ...updateUser,
      };
      const response = await fetch(`/user`, {
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
        toast.success("Your profile has been updated");
      }
      if (result.result.role === "Artist") {
        router.push(`/dashboard/profile/createArtistProfile`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center text-center m-2">
        <Toaster />
        <p className="text-2xl p-4">
          Are you an artist/entertainer, or a venue owner?
        </p>
      </div>
      <div>
        <div className="mt-4">
          <div className="flex flex-col justify-center">
            <form onSubmit={updateUserRole} className="space-y-2 mt-4">
              <div>
                <label>Full Name:</label>
                <input
                  onChange={(e) => {
                    setUpdateUser({
                      ...updateUser,
                      name: e.target.value,
                    });
                  }}
                  className="input-container"
                  type="text"
                  value={updateUser.name}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  onChange={(e) => {
                    setUpdateUser({
                      ...updateUser,
                      email: e.target.value,
                    });
                  }}
                  className="input-container"
                  type="email"
                  value={updateUser.email}
                />
              </div>
              <div>
                <label>User ID:</label>
                <input
                  className="input-container text-gray-500/70"
                  type="text"
                  value={user.id}
                  readOnly
                />
              </div>
              <div>
                <label>Are you an artist or venue owner?</label>
                <select
                  autoFocus
                  name="option"
                  defaultValue={updateUser.role}
                  onChange={(e) => {
                    setUpdateUser({
                      ...updateUser,
                      role: e.target.value,
                    });
                  }}
                  placeholder="Category"
                  className="input-container"
                  required={true}
                >
                  <option value=""></option>
                  <option value="Artist">Artist</option>
                  <option value="VenueOwner">Venue Owner</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-myCharcoal text-white rounded-lg py-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserListingProfile;
