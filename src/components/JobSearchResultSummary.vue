<template>
  <div class="job-search-result-summary">
    <Divider align="center">
      {{ $t("") }}
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
      Available opportunities
    </Divider>
    <p>
      Displaying <b>30</b> adverts from each data provider per page.
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

export default {
  name: "JobSearchResultSummary",
  components: {
    Divider,
    ResultSummary,
    JobAdvert
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