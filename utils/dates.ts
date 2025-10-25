import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(isYesterday);

export enum DateFormats {
  DATE = "DD/MM/YYYY",
  TIME = "HH:mm",
}

export const displayDate = (dateString: string, format: DateFormats) => {
  const date = dayjs(dateString);

  if (date.isToday()) {
    return "Hoy";
  }

  if (date.isYesterday()) {
    return "Ayer";
  }

  if (date.isTomorrow()) {
    return "Mañana";
  }

  return date.format(format);
};

export default dayjs;
