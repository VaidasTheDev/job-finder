import { createStore } from "vuex";
import jobAdvertsStore from "./jobAdverts";

export default createStore({
  state: {
    ...jobAdvertsStore.state
  },
  getters: {
    ...jobAdvertsStore.getters
  },
  mutations: {
    ...jobAdvertsStore.mutations
  },
  actions: {
    ...jobAdvertsStore.actions
  }
});
