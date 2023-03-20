"use client";
import { Booking, Venue } from "@/types/typings";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
type Props = {
  allVenues: Venue[];
  mutate: any;
  data: Booking[];
};

export default function CreateBooking({ allVenues, mutate }: Props) {
  const [bookingForm, setBookingForm] = useState(false);
  const [date, setDate] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTill, setTimeTill] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVenues, setFilteredVenues] = useState(() => allVenues);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [venueId, setVenueId] = useState("");

  function openBookingForm() {
    setBookingForm((current) => !current);
  }
  useEffect(() => {
    setFilteredVenues(
      allVenues?.filter((venue) =>
        venue.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [allVenues, searchTerm]);

  function handleVenueClick(venue: Venue) {
    setSearchTerm(venue.title);
    setVenueId(venue.id);
    setDropdownOpen(false);
  }

  function handleSearchTermChange(event: ChangeEvent) {
    setSearchTerm(event.target.value);
    setFilteredVenues(
      allVenues?.filter((venue) =>
        venue.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.loading("Processing Booking...");
    try {
      const body = {
        venueId,
        date,
        timeFrom,
        timeTill,
        searchTerm,
      };

      const response = await fetch(`/bookings/createBooking`, {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.status === 409) {
        toast.error("booking already exists!");
      } else {
        toast.dismiss();
        toast.success("booking successfully created!");
        setSearchTerm("");
        setDate("");
        setTimeFrom("");
        setTimeTill("");
        setVenueId("");
        setBookingForm(false);
        mutate();
      }
    } catch (error) {
      console.error(error);
      toast.error("There was a problem creating the booking, please try again");
    }
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <Toaster />
      <button
        onClick={openBookingForm}
        type="button"
        className="bg-myOrange rounded-lg py-2 px-3"
      >
        Add Booking
      </button>
      {bookingForm && (
        <div>
          <form className="md:flex gap-1" onSubmit={handleSubmit}>
            <div>
              <label>Search for a venue:</label>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                className="input-container"
                placeholder="Search for a venue"
                required={true}
              />
              {dropdownOpen && (
                <div className="dropdown-menu">
                  {filteredVenues?.map((venue) => (
                    <p
                      key={venue.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleVenueClick(venue)}
                    >
                      {venue.title}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label>Date:</label>
              <input
                className="input-container"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required={true}
                min={today}
              />
            </div>
            <div>
              <label>Time from:</label>
              <input
                className="input-container"
                type="time"
                value={timeFrom || "21:30"}
                onChange={(e) => setTimeFrom(e.target.value)}
                required={true}
              />
            </div>
            <div>
              <label>Time to:</label>
              <input
                className="input-container"
                type="time"
                value={timeTill || "23:00"}
                onChange={(e) => setTimeTill(e.target.value)}
                required={true}
              />
            </div>
            <div className="flex justify-center items-end">
              <button
                type="submit"
                value="create"
                className=" w-full md:w-auto my-2 text-white font-medium text-lg bg-myBlue rounded-lg px-4 md:m-0 h-[40px] hover:bg-myCharcoal"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
