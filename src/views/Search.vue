<template>
  <div class="search">
    <div class="search__toolbar-wrapper">
      <JobSearchToolbar
        class="search__job-search-toolbar"
        :keywords="initialFormData.keywords"
        :location="initialFormData.location"
        :trigger-on-mount="shouldTriggerOnMount"
        :page-number="pageNumber"
        @submit="onJobSearchSubmit"
      />
    </div>
    <div class="search__results-wrapper" v-if="hasDataBeenRequested">
      <div class="search__job-search-result-summary">
        <div class="search__loading-view" v-if="jobAdvertsLoading">
          <JobAdvertSkeleton v-for="i in 3" :key="i" />
        </div>
        <JobSearchResultSummary
          v-else
          :keywords="submittedFormData.keywords"
          @page-change="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { isNil, isEmpty } from "lodash";
import JobSearchToolbar from "@/components/JobSearchToolbar";
import JobSearchResultSummary from "@/components/JobSearchResultSummary";
import JobAdvertSkeleton from "@/components/advert/JobAdvertSkeleton";
import { mapGetters } from "vuex";

export default {
  name: "Search",
  components: {
    JobSearchToolbar,
    JobSearchResultSummary,
    JobAdvertSkeleton
  },
  data() {
    return {
      initialFormData: {
        keywords: null,
        location: null
      },
      submittedFormData: {
        keywords: null,
        location: null
      },
      hasDataBeenRequested: false,
      pageNumber: 1
    };
  },
  computed: {
    ...mapGetters(["jobAdvertsLoading"]),
    shouldTriggerOnMount() {
      return !isNil(this.initialFormData)
        && !isEmpty(this.initialFormData.keywords)
        && !isEmpty(this.initialFormData.location);
    }
  },
  methods: {
    onJobSearchSubmit(submittedFormData) {
      this.submittedFormData = submittedFormData;
      this.hasDataBeenRequested = true;
    },
    setInitialFormData(data) {
      this.initialFormData = {
        keywords: data.keywords,
        location: data.location
      };
    },
    onPageChange(page) {
      this.pageNumber = page + 1;
    }
  },
  beforeMount() {
    const { params } = this.$route;
    if (!isEmpty(params)) {
      this.setInitialFormData(params);
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
    width: 80%;
    align-self: center;
  }

  &__loading-view {
    margin-top: 1.5rem;
  }
}
</style>