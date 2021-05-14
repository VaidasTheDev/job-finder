
import { isNil } from "lodash";
import jobService from "@/services/jobService";

const GLASSDOOR_BASE_URL = "http://www.glassdoor.co.uk";

export default {
  async getJobAdverts({ commit }, formData, pageNumber) {
    commit("setJobAdvertsLoading", true);
    const parsedPageNumber = pageNumber || 0;
    const reedPromise = jobService.getReedJobs(formData.keywords, formData.location, formData.distanceInMiles, parsedPageNumber); // gives 100 adverts per page
    const glassdoorPromise = jobService.getGlassdoorJobs(formData.keywords, formData.location, formData.distanceInMiles, parsedPageNumber); // gives 30 adverts per page
    
    Promise.all([reedPromise, glassdoorPromise])
      .then(response => {
        const reedRawResult = response[0].data;
        const reedNormalisedResult = buildJobSearchResultObject(
          reedRawResult.totalResults,
          convertReedJobListings(reedRawResult.results)
        );
        commit("setReedJobAdverts", reedNormalisedResult);

        const glassdoorRawResult = response[1].data;

        if (glassdoorRawResult.success) {
          const rawData = glassdoorRawResult.response;
          const glassdoorNormalisedResult = buildJobSearchResultObject(
            rawData.totalRecordCount,
            convertGlassdoorJobListings(rawData.jobListings)
          );
          commit("setGlassdoorJobAdverts", glassdoorNormalisedResult);
        } else {
          console.error("Failed to retrieve Glassdoor results");
        }
        commit("setJobAdvertsLoading", false);
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

    const minSalary = listing.minimumSalary;
    const maxSalary = listing.maximumSalary;
    const salary = !isNil(minSalary) && !isNil(maxSalary)
      ? buildSalaryObject(false, parseInt(minSalary), parseInt(maxSalary))
      : null;

    return buildJobAdvertObject(
      listing.jobTitle,
      listing.jobDescription,
      listing.locationName,
      listing.jobUrl,
      'Reed',
      date,
      salary
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

    const salaryEstimate = listing.salaryEstimate;
    const salary = !isNil(salaryEstimate)
      ? buildSalaryObject(true, parseInt(salaryEstimate[salaryEstimate.minSalaryRange]), parseInt(salaryEstimate[salaryEstimate.maxSalaryRange]))
      : null;

    return buildJobAdvertObject(
      listing.jobTitle,
      listing.descriptionFragment,
      listing.location,
      `${GLASSDOOR_BASE_URL}${listing.jobViewUrl}`,
      'Glassdoor',
      date,
      salary,
      listing.squareLogo
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

function buildJobAdvertObject(title, description, location, url, provider, postDate, salary, logo) {
  return {
    job: {
      title,
      description,
      location,
      postDate,
      salary,
      logo
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
    location: undefined,
    postDate: undefined,
    salary: undefined,
    logo: undefined
  },
  url: undefined, // Origin website url to open the job advert
  provider: undefined // Origin website
};

const COMMON_SALARY_OBJECT = {
  isEstimate: Boolean,
  min: Number,
  max: Number
};

function buildSalaryObject(isEstimate, min, max) {
  return {
    isEstimate,
    min,
    max
  };
}