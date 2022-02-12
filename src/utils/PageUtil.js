import { isEmpty } from "lodash";
import { DEFAULT_PAGE_SIZE } from "@/constants/pageConstants";

export function isMoreDataRequired(currentData, pageNumber) {
  return isEmpty(currentData) || (DEFAULT_PAGE_SIZE * pageNumber) > currentData.length;
}

