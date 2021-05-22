import axiosClient from "@/configs/axiosConfig";
import { DEFAULT_PAGE_SIZE } from "@/constants/pageConstants";

export default {
  async getReedJobs(keywords, location, distance, pageNumber) {
    let offset = 0;
    if (pageNumber > 1) {
      offset = DEFAULT_PAGE_SIZE * parseInt(pageNumber);
    }
    return await axiosClient.get(
      `/reed/api/1.0/search?keywords=${keywords}&locationName=${location}&distanceFromLocation=${distance}&resultsToTake=${DEFAULT_PAGE_SIZE}&resultsToSkip=${offset}`,
      {
        headers: {
          "Authorization": "Basic NmJkY2Y4YWItZjg1MS00NTg1LWE0ZmMtZmE1NDIyMTA4MjAyOg==",
          "Access-Control-Allow-Credentials": "true"
        }
      }
    );
  },
  async getGlassdoorJobs(keywords, location, distance, pageNumber) {
    return await axiosClient.get(
      `/glassdoor/api/api.htm?action=jobs&q=${keywords}&l=${location}&radius=${distance}&userip=192.168.43.42&useragent=Mozilla/%2F4.0&v=1.1&format=json&pn=${pageNumber}&ps=${DEFAULT_PAGE_SIZE}`
    );
  },
  buildJobSearchResultObject(total, jobAdverts) {
    return {
      total,
      jobAdverts
    };
  }
};