import axiosClient from "@/configs/axiosConfig";

export default {
  getReedJobs(keywords, location, distance) {
    axiosClient.get(
      `/reed/api/1.0/search?keywords=${keywords}&location=${location}&distancefromlocation=${distance}`
    )
    .then(result => {
      console.log(result);
    });
  }
};