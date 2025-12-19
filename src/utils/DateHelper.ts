export const LOCALDATETIME_FORMAT = "YYYY-MM-DDTHH:mm:ss";

export const formatToLocalDateTime = (date: any) => {
  if (!date) return null;
  return date.format(LOCALDATETIME_FORMAT);
};
