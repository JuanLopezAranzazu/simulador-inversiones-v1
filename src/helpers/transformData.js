import { MAX_LENGTH } from "./global";

export const truncateText = (text) => {
  return text.length > MAX_LENGTH ? text.slice(0, MAX_LENGTH) + "..." : text;
};
