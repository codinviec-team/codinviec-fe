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

export const timeAgo = (dateString: string): string => {
  const created = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - created.getTime();

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "Vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  if (days === 1) return "1 ngày trước";
  return `${days} ngày trước`;
};
