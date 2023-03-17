import { Day } from "@/types/typings";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

function OperatingTimes({
  openHours,
  setOpenHours,
  addSecondTimeSlot,
  setAddSecondTimeSlot,
}: any) {
  function showDayOfWeek(i: any) {
    if (i === 0) return "Sunday";
    if (i === 1) return "Monday";
    if (i === 2) return "Tuesday";
    if (i === 3) return "Wednesday";
    if (i === 4) return "Thursday";
    if (i === 5) return "Friday";
    if (i === 6) return "Saturday";
  }

  function handleInputChange(
    dayIndex: number,
    timeIndex: number,
    e: ChangeEvent
  ) {
    const { name, value } = e.target;
    const newOpenHours = [...openHours];
    const timeValue = value === "" ? null : value;
    newOpenHours[dayIndex].timePeriods[timeIndex][name] = timeValue;
    setOpenHours(newOpenHours);
  }

  return (
    <div className="bg-myBlue/50 p-1 rounded-lg mt-2">
      <button
        type="button"
        onClick={() => setAddSecondTimeSlot(!addSecondTimeSlot)}
      >
        {addSecondTimeSlot ? "Remove second timeslot" : "+ Second time slot"}
      </button>
      <hr />
      {openHours.map((day: Day, index: number) => (
        <div key={day.day} className=" items-center  ">
          <div className=" flex items-center">
            <label className="text-2xl ml-1">{showDayOfWeek(day.day)}</label>
          </div>

          <div className=" space-x-2 space-y-2 ">
            <>
              <input
                className="input-container max-w-[90px] m-0"
                type="time"
                name="openTime"
                value={day.timePeriods[0].openTime}
                onChange={(e) => handleInputChange(index, 0, e)}
              />
              <input
                className="input-container max-w-[90px] m-0"
                type="time"
                name="closingTime"
                value={day.timePeriods[0].closingTime}
                onChange={(e) => handleInputChange(index, 0, e)}
              />

              {addSecondTimeSlot && (
                <>
                  <input
                    className="input-container max-w-[90px] m-0"
                    type="time"
                    name="openTime"
                    value={day.timePeriods[1].openTime}
                    onChange={(e) => handleInputChange(index, 1, e)}
                  />
                  <input
                    className="input-container max-w-[90px] m-0"
                    type="time"
                    name="closingTime"
                    value={day.timePeriods[1].closingTime}
                    onChange={(e) => handleInputChange(index, 1, e)}
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

export default OperatingTimes;
