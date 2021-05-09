import axiosClient from "@/configs/axiosConfig";

export default {
  async getReedJobs(keywords, location, distance) {
    return await axiosClient.get(
      `/reed/api/1.0/search?keywords=${keywords}&locationName=${location}&distanceFromLocation=${distance}`,
      {
        headers: {
          "Authorization": "Basic NmJkY2Y4YWItZjg1MS00NTg1LWE0ZmMtZmE1NDIyMTA4MjAyOg==",
          "Access-Control-Allow-Credentials": "true"
        }
      }
    );
  },
  async getGlassdoorJobs(keywords, location, distance) {
    return await axiosClient.get(
      `/glassdoor/api/api.htm?action=jobs&q=${keywords}&location=${location}&radius=${distance}&userip=192.168.43.42&useragent=Mozilla/%2F4.0&v=1.1&format=json&`
    );
  }
};