<template>
  <div class="job-search-result-summary" v-if="anyJobAdvertsPresent">
    <h1 class="job-search-result-summary__title">
      {{ $t("labels.jobSearchResults") }}
      for
      <span class="job-search-result-summary__keywords">
        {{ keywords }}
      </span>
    </h1>
    <Divider align="center">
      {{ $t("home.search.results.summary") }}
    </Divider>
    <ResultSummary
      v-if="anyReedJobAdvertsPresent"
      label="reed.co.uk"
      :total="reedJobAdverts.total"
    />
    <ResultSummary
      v-if="anyGlassdoorJobAdvertsPresent"
      label="glassdoor.co.uk"
      :total="glassdoorJobAdverts.total"
    />
    <Divider align="center">
      {{ $t("home.search.results.label") }}
    </Divider>
    <p class="job-search-result-summary__opportunities-description">
      Displaying maximum <b>{{ DEFAULT_PAGE_SIZE }}</b> adverts from each data provider per page.
    </p>
    <div class="job-search-result-summary__job-adverts">
      <JobAdvert
        v-for="(advert, i) in jobAdverts"
        :key="i"
        :data="advert"
      />
      <Paginator
        class="job-search-result-summary__paginator"
        :rows="DEFAULT_PAGE_SIZE"
        :totalRecords="totalAdvertCount"
        @page="onPageChange($event)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { isNil, isEmpty } from "lodash";
import Divider from "primevue/divider";
import Paginator from "primevue/paginator";
import ResultSummary from "@/components/ResultSummary";
import JobAdvert from "@/components/advert/JobAdvert";
import { DEFAULT_PAGE_SIZE } from "@/constants/pageConstants"

export default {
  name: "JobSearchResultSummary",
  components: {
    Divider,
    Paginator,
    ResultSummary,
    JobAdvert
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      DEFAULT_PAGE_SIZE
    };
  },
  computed: {
    ...mapGetters(["reedJobAdverts", "glassdoorJobAdverts"]),
    jobAdverts() {
      let list = [];

      if (this.anyReedJobAdvertsPresent) {
        list = list.concat(this.reedJobAdverts.jobAdverts);
      }

      if (this.anyGlassdoorJobAdvertsPresent) {
        list = list.concat(this.glassdoorJobAdverts.jobAdverts);
      }

      return list.sort((a, b) => new Date(b.job.postDate) - new Date(a.job.postDate));
    },
    anyJobAdvertsPresent() {
      return !isEmpty(this.jobAdverts);
    },
    anyReedJobAdvertsPresent() {
      return !isNil(this.reedJobAdverts) && !isEmpty(this.reedJobAdverts.jobAdverts);
    },
    anyGlassdoorJobAdvertsPresent() {
      return !isNil(this.glassdoorJobAdverts) && !isEmpty(this.glassdoorJobAdverts.jobAdverts);
    },
    totalAdvertCount() {
      let count = 0;

      if (!isNil(this.reedJobAdverts)) {
        count = count + this.reedJobAdverts.total;
      }

      if (!isNil(this.glassdoorJobAdverts)) {
        count = count + this.glassdoorJobAdverts.total;
      }
      
      return count;
    }
  },
  emits: ["page-change"],
  methods: {
    onPageChange(paginationData) {
      this.$emit("page-change", paginationData.page);
    }
  }
}
</script>

<style lang="scss" scoped>
.job-search-result-summary {

  &__title {
    padding: 2rem 0;
  }

  &__keywords {
    color: $primaryColor;
  }

  &__opportunities-description {
    text-align: left;
  }

  &__job-adverts {
    padding: 1rem 0;
  }

  &__paginator {
    box-shadow: $cardShadow;
    margin-bottom: 1rem;
  }
}
</style>