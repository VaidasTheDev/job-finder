
import jobService from "@/services/jobService";
import GlassdoorMapper from "@/services/mappers/GlassdoorMapper";
import ReedMapper from "@/services/mappers/ReedMapper";

export default {
  async getJobAdverts({ commit }, payload) {
    commit("setJobAdvertsLoading", true);
    const reedPromise = jobService.getReedJobs(payload.keywords, payload.location, payload.distanceInMiles, payload.pageNumber)
    reedPromise
      .then(response => {
        commit("setReedJobAdverts", parseReedResults(response.data));
      });

    const glassdoorPromise = jobService.getGlassdoorJobs(payload.keywords, payload.location, payload.distanceInMiles, payload.pageNumber);
    glassdoorPromise
      .then(response => {
        const glassdoorRawResult = response.data;

        if (glassdoorRawResult.success) {
          const glassdoorNormalisedResult = parseGlassdoorResults(glassdoorRawResult.response);
          commit("setGlassdoorJobAdverts", glassdoorNormalisedResult);
        } else {
          console.error("Failed to retrieve Glassdoor results");
        }
      });

    Promise.all([reedPromise, glassdoorPromise])
      .finally(() => commit("setJobAdvertsLoading", false));
  },
  async getReedJobAdverts({ commit }, payload) {
    commit("setJobAdvertsLoading", true);
    jobService.getReedJobs(payload.keywords, payload.location, payload.distanceInMiles, payload.pageNumber)
      .then(response => {
        const reedNormalisedResult = parseReedResults(response.data);
        commit("setReedJobAdverts", reedNormalisedResult);
      })
      .finally(() => commit("setJobAdvertsLoading", false));
  },
  async getGlassdoorJobAdverts({ commit }, payload) {
    commit("setJobAdvertsLoading", true);
    jobService.getGlassdoorJobs(payload.keywords, payload.location, payload.distanceInMiles, payload.pageNumber)
      .then(response => {
        const glassdoorRawResult = response.data;
        if (glassdoorRawResult.success) {
          const glassdoorNormalisedResult = parseGlassdoorResults(glassdoorRawResult.response);
          commit("setGlassdoorJobAdverts", glassdoorNormalisedResult);
        } else {
          console.error("Failed to retrieve Glassdoor results");
        }
      })
      .finally(() => commit("setJobAdvertsLoading", false));
  }
};

function parseGlassdoorResults(rawResult) {
  return jobService.buildJobSearchResultObject(
    rawResult.totalRecordCount,
    GlassdoorMapper.convertGlassdoorJobListings(rawResult.jobListings)
  );
}

function parseReedResults(rawResult) {
  return jobService.buildJobSearchResultObject(
    rawResult.totalResults,
    ReedMapper.convertReedJobListings(rawResult.results)
  );
}