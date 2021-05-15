<template>
  <div class="job-search-result-summary" v-if="anyJobAdvertsPresent">
    <h1 class="job-search-result-summary__title">
      {{ $t("labels.jobSearchResults") }}
      for
      <span class="job-search-result-summary__keywords">
        {{ jobSearchKeywords }}
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
      Displaying <b>{{ DEFAULT_PAGE_SIZE }}</b> adverts from each data provider per page.
    </p>
    <div class="job-search-result-summary__job-adverts">
      <JobAdvert
        v-for="(advert, i) in jobAdverts"
        :key="i"
        :data="advert"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { isNil, isEmpty } from "lodash";
import Divider from "primevue/divider";
import ResultSummary from "@/components/ResultSummary";
import JobAdvert from "@/components/JobAdvert";
import { DEFAULT_PAGE_SIZE } from "@/constants/pageConstants"

export default {
  name: "JobSearchResultSummary",
  components: {
    Divider,
    ResultSummary,
    JobAdvert
  },
  data() {
    return {
      DEFAULT_PAGE_SIZE
    };
  },
  computed: {
    ...mapGetters(["jobSearchKeywords", "reedJobAdverts", "glassdoorJobAdverts"]),
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
    padding: 2rem 0;
  }
}
</style>