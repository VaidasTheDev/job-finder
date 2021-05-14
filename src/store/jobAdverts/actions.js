
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
        const reedNormalisedResult = jobService.buildJobSearchResultObject(
          reedRawResult.totalResults,
          convertReedJobListings(reedRawResult.results)
        );
        commit("setReedJobAdverts", reedNormalisedResult);

        const glassdoorRawResult = response[1].data;

        if (glassdoorRawResult.success) {
          const rawData = glassdoorRawResult.response;
          const glassdoorNormalisedResult = jobService.buildJobSearchResultObject(
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
      ? jobService.buildSalaryObject(false, parseInt(minSalary), parseInt(maxSalary))
      : null;

    return jobService.buildJobAdvertObject(
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
      ? jobService.buildSalaryObject(true, parseInt(salaryEstimate[salaryEstimate.minSalaryRange]), parseInt(salaryEstimate[salaryEstimate.maxSalaryRange]))
      : null;

    return jobService.buildJobAdvertObject(
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