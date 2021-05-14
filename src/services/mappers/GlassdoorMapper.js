
import { isNil } from "lodash";
import LangUtil from "@/utils/LangUtil";
import JobMapper from "@/services/mappers/JobMapper";

const GLASSDOOR_BASE_URL = "http://www.glassdoor.co.uk";

export default {
  convertGlassdoorJobListings(listings) {
    return listings.map(listing => {
      const date = new Date(listing.discoveryDate).toLocaleDateString(
        LangUtil.getLang(),
        {
          day: "numeric",
          month: "long",
          year: "numeric"
        }
      );
  
      const salaryEstimate = listing.salaryEstimate;
      const salary = !isNil(salaryEstimate)
        ? JobMapper.buildSalaryObject(true, parseInt(salaryEstimate[salaryEstimate.minSalaryRange]), parseInt(salaryEstimate[salaryEstimate.maxSalaryRange]))
        : null;
  
      return JobMapper.buildJobAdvertObject(
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
};