<template>
  <div class="search">
    <JobSearchForm
      :keywords="keywordsParam"
      :location="locationParam"
    />
    <div class="search__results-wrapper">
      <JobSearchResultSummary class="search__job-search-result-summary" />
    </div>
  </div>
</template>

<script>
import JobSearchForm from "@/components/JobSearchForm";
import JobSearchResultSummary from "@/components/JobSearchResultSummary";

export default {
  name: "Search",
  components: {
    JobSearchForm,
    JobSearchResultSummary
  },
  computed: {
    keywordsParam() {
      return this.$route.params.keywords;
    },
    locationParam() {
      return this.$route.params.location;
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  
  &__results-wrapper {
    display: flex;
    flex-direction: column;
    min-width: 300px;
    width: 100%;
    background: $backgroundColor;
  }

  &__job-search-result-summary {
    max-width: 80%;
    align-self: center;
  }
}
</style>