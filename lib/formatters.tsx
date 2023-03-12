import dayjs from "dayjs";

export function formatDate(date: string | number | Date | dayjs.Dayjs) {
  const formattedDate = dayjs(date).format("dddd, D MMMM YYYY");
  return formattedDate;
}
export function formatTime(time: string | number | Date | dayjs.Dayjs) {
  const formattedTime = dayjs(time).format("HH:mma");
  return formattedTime;
}
