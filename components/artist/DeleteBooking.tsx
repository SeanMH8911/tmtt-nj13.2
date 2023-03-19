"use client";

import { toast } from "react-hot-toast";

type Props = {
  id: string;
  mutate: any;
};

export default function DeleteBooking({ id, mutate }: Props) {
  async function deleteItem() {
    try {
      toast.loading("Deleting your booking...");
      const body = { id };
      const response = await fetch(`bookings/createBooking`, {
        method: "DELETE",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (response.status === 200) {
        toast.dismiss();
        toast.success(result.message);
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <button
        type="button"
        onClick={deleteItem}
        className="bg-red-500 px-2 text-white rounded-lg"
      >
        X
      </button>
    </div>
  );
}
