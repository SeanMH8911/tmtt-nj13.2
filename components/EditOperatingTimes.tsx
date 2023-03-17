import { formatDayOfWeek, formatTimeInput } from "@/lib/formatters";
import { OpeningTime, Venue } from "@/types/typings";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
type SetAddSecondTimeSlot = React.Dispatch<React.SetStateAction<boolean>>;
type Props = {
  venueDetail: Venue;
  addSecondTimeSlot: boolean;
  setAddSecondTimeSlot: SetAddSecondTimeSlot;
  setVenueDetail: any;
};

export default function EditOperatingTimes({
  venueDetail,
  addSecondTimeSlot,
  setAddSecondTimeSlot,
  setVenueDetail,
}: Props) {
  const handleInputChange = (e: ChangeEvent, dayIndex: number) => {
    const { name, value } = e.target;
    const secTime = value.replace(/am|pm/i, "");
    const newValue = new Date(`1970-01-01T${secTime}:00.000Z`);
    const openingTime = [...venueDetail.openingTime];
    const currentDay: OpeningTime = openingTime[dayIndex];
    const currentSlot = currentDay;
    currentSlot[name as keyof typeof currentSlot] = newValue;

    setVenueDetail((prevState: Venue) => ({ ...prevState, openingTime }));
  };

  return (
    <div className="bg-myBlue/50 p-1 rounded-lg mt-2">
      <button
        type="button"
        onClick={() => setAddSecondTimeSlot(!addSecondTimeSlot)}
      >
        {addSecondTimeSlot ? "Remove second timeslot" : "+ Second time slot"}
      </button>
      <hr />

      {venueDetail.openingTime.map((day: OpeningTime, i: number) => (
        <div key={day.id} className=" items-center  ">
          <div className=" flex items-center">
            <label className="text-2xl ml-1">
              {formatDayOfWeek(day.dayOfWeek)}
            </label>
          </div>
          <div className="space-x-2 space-y-2 ">
            <>
              <input
                className="input-container max-w-[90px] m-0"
                type="time"
                name="openTime"
                value={formatTimeInput(day.openTime) || ""}
                onChange={(e) => handleInputChange(e, i)}
              />
              <input
                className="input-container max-w-[90px] m-0"
                type="time"
                name="closeTime"
                value={formatTimeInput(day.closeTime) || ""}
                onChange={(e) => handleInputChange(e, i)}
              />

              {addSecondTimeSlot && (
                <>
                  <input
                    className="input-container max-w-[90px] m-0"
                    type="time"
                    name="midOpenTime"
                    value={formatTimeInput(day.midOpenTime) || ""}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                  <input
                    className="input-container max-w-[90px] m-0"
                    type="time"
                    name="midCloseTime"
                    value={formatTimeInput(day.midCloseTime) || ""}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </>
              )}
            </>
          </div>
        </div>
      ))}
    </div>
  );
}
