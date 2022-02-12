
export default {
  buildJobAdvertObject(title, description, location, url, provider, postDate, salary, logo) {
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
  },
  buildSalaryObject(isEstimate, min, max) {
    return {
      isEstimate,
      min,
      max
    };
  }
};