
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

    const parts = listing.date.split("/");
    const dt = new Date(parseInt(parts[2], 10),
                      parseInt(parts[1], 10) - 1,
                      parseInt(parts[0], 10));
    const date = dt.toLocaleDateString(
      getLang(),
      {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );

    return buildJobAdvertObject(
      listing.jobTitle,
      listing.jobDescription,
      listing.locationName,
      listing.jobUrl,
      'Reed',
      date
    );
  });
}

function getLang() {
  if (navigator.languages != undefined) 
    return navigator.languages[0]; 
  return navigator.language;
}

function convertGlassdoorJobListings(listings) {
  return listings.map(listing => {
    const date = new Date(listing.discoveryDate).toLocaleDateString(
      getLang(),
      {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );

    return buildJobAdvertObject(
      listing.jobTitle,
      listing.descriptionFragment,
      listing.location,
      `${GLASSDOOR_BASE_URL}${listing.jobViewUrl}`,
      'Glassdoor',
      date
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

function buildJobAdvertObject(title, description, location, url, provider, postDate) {
  return {
    job: {
      title,
      description,
      location,
      postDate
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