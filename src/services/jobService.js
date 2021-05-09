import axiosClient from "@/configs/axiosConfig";

export default {
  async getReedJobs(keywords, location, distance) {
    return await axiosClient.get(
      `/reed/api/1.0/search?keywords=${keywords}&locationName=${location}&distanceFromLocation=${distance}`
    );
  }
};