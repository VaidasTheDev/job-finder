import jobService from "@/services/jobService";

export default {
  async getJobAdverts({ commit }, formData) {
    jobService.getReedJobs(formData.keywords, formData.location, formData.distanceInMiles)
    .then(response => {
      commit("setJobAdverts", response.data);
    })
  }
};