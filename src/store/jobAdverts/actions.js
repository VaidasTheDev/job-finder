import jobService from "@/services/jobService";

const GLASSDOOR_BASE_URL = "http://www.glassdoor.co.uk";

export default {
  async getJobAdverts({ commit }, formData) {
    const reedPromise = jobService.getReedJobs(formData.keywords, formData.location, formData.distanceInMiles);
    const glassdoorPromise = jobService.getGlassdoorJobs(formData.keywords, formData.location, formData.distanceInMiles);
    
    Promise.all([reedPromise, glassdoorPromise])
      .then(response => {
        const reedRawResult = response[0].data;
        const reedNormalisedResult = buildJobSearchResultObject(
          reedRawResult.totalResults,
          convertReedJobListings(reedRawResult.results)
        );
        commit("setReedJobAdverts", reedNormalisedResult);

        const glassdoorRawResult = response[1].data.response;
        const glassdoorNormalisedResult = buildJobSearchResultObject(
          glassdoorRawResult.totalRecordCount,
          convertGlassdoorJobListings(glassdoorRawResult.jobListings)
        );
        commit("setGlassdoorJobAdverts", glassdoorNormalisedResult);
      });
  }
};

// Local 3rd party data conversions (TODO: move to a separate place)
function convertReedJobListings(listings) {
  return listings.map(listing => {
    return buildJobAdvertObject(
      listing.jobTitle,
      listing.jobDescription,
      listing.locationName,
      listing.jobUrl,
      'REED'
    );
  });
}

function convertGlassdoorJobListings(listings) {
  return listings.map(listing => {
    return buildJobAdvertObject(
      listing.title,
      listing.descriptionFragment,
      listing.location,
      `${GLASSDOOR_BASE_URL}${listing.jobViewUrl}`,
      'GLASSDOOR'
    );
  });
}

// Generic functions (TODO: move to backend at a later point)
function buildJobSearchResultObject(total, jobAdverts) {
  return {
    total,
    jobAdverts
  };
}

function buildJobAdvertObject(title, description, location, url, provider) {
  return {
    job: {
      title,
      description,
      location
    },
    url,
    provider
  };
}

// Sample object structures

const COMMON_JOB_SEARCH_RESULT_OBJECT = {
  total: 0,
  jobAdverts: []
};

const COMMON_JOB_ADVERT_OBJECT = {
  job: {
    title: undefined,
    description: undefined,
    location: undefined
  },
  url: undefined, // Origin website url to open the job advert
  provider: undefined // Origin website
};