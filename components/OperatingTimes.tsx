import { formatDayOfWeek } from "@/lib/formatters";
import { Day } from "@/types/typings";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

function OperatingTimes({
  openHours,
  setOpenHours,
  addSecondTimeSlot,
  setAddSecondTimeSlot,
}: any) {
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
            <label className="text-2xl ml-1">{formatDayOfWeek(day.day)}</label>
          </div>

          <div className="flex flex-col md:flex-row md:items-center  md:space-x-1 space-y-2 md:space-y-0">
            <div className="flex items-center space-x-2">
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
              {addSecondTimeSlot && window.innerWidth < 400 && (
                <p>First slot</p>
              )}
            </div>

            {addSecondTimeSlot && (
              <div className="flex items-center space-x-2">
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
                {addSecondTimeSlot && window.innerWidth < 400 && (
                  <p>Second slot</p>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OperatingTimes;
