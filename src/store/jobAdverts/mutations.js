
export default {
  setSearchKeywords(state, keywords) {
    state.jobSearchKeywords = keywords;
  },
  setJobAdvertsLoading(state, loading) {
    state.jobAdvertsLoading = loading;
  },
  setReedJobAdverts(state, reedJobAdverts) {
    state.reedJobAdverts = reedJobAdverts;
  },
  setGlassdoorJobAdverts(state, glassdoorJobAdverts) {
    state.glassdoorJobAdverts = glassdoorJobAdverts;
  }
};