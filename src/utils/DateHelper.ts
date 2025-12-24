import dayjs from "dayjs";

export const LOCALDATETIME_FORMAT = "YYYY-MM-DDTHH:mm:ss";
export const DDMMYYYY_FORMAT = "DD/MM/YYYY";

export const formatToLocalDateTime = (date: any) => {
  if (!date) return null;
  return dayjs(date).format(LOCALDATETIME_FORMAT);
};

export const formatToDDMMYYYY = (date: any) => {
  if (!date) return null;
  return dayjs(date).format(DDMMYYYY_FORMAT);
};
