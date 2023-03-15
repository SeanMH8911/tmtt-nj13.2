import dayjs from "dayjs";

export function formatDate(date: string | number | Date | dayjs.Dayjs) {
  const formattedDate = dayjs(date).format("dddd, D MMMM YYYY");
  return formattedDate;
}
export function formatTime(time: string | number | Date | dayjs.Dayjs) {
  console.log(time);

  if (time === null) {
    return "Closed";
  }

  const timeString = new Date(`${time}`).toLocaleTimeString("en-gb", {
    timeZone: "GMT",
    hour12: true,
    hourCycle: "h12",
    hour: "numeric",
    minute: "numeric",
  });
  const formatTime = timeString.split(" ");
  return formatTime;
}
