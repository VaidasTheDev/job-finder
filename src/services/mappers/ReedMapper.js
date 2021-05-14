
import { isNil } from "lodash";
import LangUtil from "@/utils/LangUtil";
import JobMapper from "@/services/mappers/JobMapper";

export default {
  convertReedJobListings(listings) {
    return listings.map(listing => {
      const parts = listing.date.split("/");
      const dt = new Date(parseInt(parts[2], 10),
                        parseInt(parts[1], 10) - 1,
                        parseInt(parts[0], 10));
      const date = dt.toLocaleDateString(
        LangUtil.getLang(),
        {
          day: "numeric",
          month: "long",
          year: "numeric"
        }
      );
  
      const minSalary = listing.minimumSalary;
      const maxSalary = listing.maximumSalary;
      const salary = !isNil(minSalary) && !isNil(maxSalary)
        ? JobMapper.buildSalaryObject(false, parseInt(minSalary), parseInt(maxSalary))
        : null;
  
      return JobMapper.buildJobAdvertObject(
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
};