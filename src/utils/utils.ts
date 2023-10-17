import dayjs from "dayjs";

/**
 * 格式化时间
 */
export const formatTime = (str: string, format?: string): string => {
  if (!str) {
    return "";
  }
  return dayjs(str).format(format || "YYYY-MM-DD hh:mm:ss");
};