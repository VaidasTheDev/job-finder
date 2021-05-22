
import jobService from "@/services/jobService";
import GlassdoorMapper from "@/services/mappers/GlassdoorMapper";
import ReedMapper from "@/services/mappers/ReedMapper";

export default {
  async getJobAdverts({ commit }, payload) {
    commit("setJobAdvertsLoading", true);
    const reedPromise = jobService.getReedJobs(payload.keywords, payload.location, payload.distanceInMiles, payload.pageNumber);
    const glassdoorPromise = jobService.getGlassdoorJobs(payload.keywords, payload.location, payload.distanceInMiles, payload.pageNumber);
    
    Promise.all([reedPromise, glassdoorPromise])
      .then(response => {
        const reedRawResult = response[0].data;
        const reedNormalisedResult = jobService.buildJobSearchResultObject(
          reedRawResult.totalResults,
          ReedMapper.convertReedJobListings(reedRawResult.results)
        );
        commit("setReedJobAdverts", reedNormalisedResult);

        const glassdoorRawResult = response[1].data;

        if (glassdoorRawResult.success) {
          const rawData = glassdoorRawResult.response;
          const glassdoorNormalisedResult = jobService.buildJobSearchResultObject(
            rawData.totalRecordCount,
            GlassdoorMapper.convertGlassdoorJobListings(rawData.jobListings)
          );
          commit("setGlassdoorJobAdverts", glassdoorNormalisedResult);
        } else {
          console.error("Failed to retrieve Glassdoor results");
        }
        commit("setJobAdvertsLoading", false);
      });
  }
};