
export default {
  setJobAdvertsLoading(state, loading) {
    state.jobAdvertsLoading = loading;
  },
  setReedJobAdverts(state, reedJobAdverts) {
    state.reedJobAdverts = reedJobAdverts;
  },
  clearReedJobAdverts(state) {
    state.reedJobAdverts = null;
  },
  setGlassdoorJobAdverts(state, glassdoorJobAdverts) {
    state.glassdoorJobAdverts = glassdoorJobAdverts;
  },
  clearGlassdoorJobAdverts(state) {
    state.glassdoorJobAdverts = null;
  }
};