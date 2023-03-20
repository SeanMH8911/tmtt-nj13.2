import dayjs from "dayjs";

export function formatDayOfWeek(i: number) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[i];
}

export function formatDate(date: string | number | Date | dayjs.Dayjs) {
  const formattedDate = dayjs(date).format("dddd, D MMMM YYYY");
  return formattedDate;
}
export function formatTime(time: string | number | Date | dayjs.Dayjs) {
  const timeString = new Date(`${time}`).toLocaleTimeString("en-gb", {
    timeZone: "GMT",
    hourCycle: "h12",
    hour: "numeric",
    minute: "numeric",
  });
  const formattedTime = timeString.split(" ");
  return formattedTime.join("");
}
export function formatTimeInput(
  time: string | number | Date | dayjs.Dayjs | null
) {
  const timeString = new Date(`${time}`).toLocaleTimeString("en-gb", {
    timeZone: "GMT",
    hour: "numeric",
    minute: "numeric",
  });
  const formatTime = timeString.split(" ");
  return formatTime;
}

export function formatToIso(time: string | number | Date | dayjs.Dayjs | null) {
  if (time) {
    const timeString = time.toString();
    return timeString;
  }
}
