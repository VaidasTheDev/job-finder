<template>
  <div class="job-search-result-summary" v-if="anyJobAdvertsPresent">
    <Divider align="center">
      {{ $t("labels.jobSearch") }}
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
    <p>
      Displaying <b>{{ DEFAULT_PAGE_SIZE }}</b> adverts from each data provider per page.
    </p>
    <JobAdvert
      v-for="(advert, i) in jobAdverts"
      :key="i"
      :data="advert"
    />
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
    }
  }
}
</script>

<style lang="scss" scoped>
.job-search-result-summary {

}
</style>