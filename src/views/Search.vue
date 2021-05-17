<template>
  <div class="search">
    <div class="search__toolbar-wrapper">
      <JobSearchToolbar
        class="search__job-search-toolbar"
        :keywords="initialKeywords"
        :location="initialLocation"
        :trigger-on-mount="shouldTriggerOnMount"
        @submit="onJobSearchSubmit"
      />
    </div>
    <div class="search__results-wrapper" v-if="hasDataBeenRequested">
      <JobSearchResultSummary
        class="search__job-search-result-summary"
        :keywords="submittedFormData.keywords"
      />
    </div>
  </div>
</template>

<script>
import isNil from "lodash";
import JobSearchToolbar from "@/components/JobSearchToolbar";
import JobSearchResultSummary from "@/components/JobSearchResultSummary";

export default {
  name: "Search",
  components: {
    JobSearchToolbar,
    JobSearchResultSummary
  },
  data() {
    return {
      submittedFormData: null,
      hasDataBeenRequested: false
    };
  },
  computed: {
    initialKeywords() {
      return this.$route.params.keywords;
    },
    initialLocation() {
      return this.$route.params.location;
    },
    shouldTriggerOnMount() {
      return !isNil(this.keywordsParam) && !isNil(this.locationParam);
    }
  },
  methods: {
    onJobSearchSubmit(submittedFormData) {
      this.submittedFormData = submittedFormData;
      this.hasDataBeenRequested = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.search {

  &__toolbar-wrapper {
    background: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    justify-content: center;
    min-width: 300px;
    width: 100%;
  }

  &__job-search-toolbar {
    width: 80%;
  }
  
  &__results-wrapper {
    display: flex;
    flex-direction: column;
    min-width: 300px;
    width: 100%;
  }

  &__job-search-result-summary {
    max-width: 80%;
    align-self: center;
  }
}
</style>