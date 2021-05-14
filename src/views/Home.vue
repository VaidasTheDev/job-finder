<template>
  <div class="home">
    <h1>Job Explorer</h1>
    <div class="home__form">
      <InputField
        class="large-field"
        input-id="home__search-input-field"
        label="Keywords"
        help-text="You may provide a position title or company name, for example"
        @update="onKeywordsUpdate"
      />
      <InputField
        input-id="home__search-location-input-field"
        label="Location"
        @update="onLocationUpdate"
        help-text="You may provide a postcode, town or city name"
      />
      <InputField
        input-id="home__search-distance-input-field"
        label="Distance"
        type="number"
        help-text="Distance in miles"
        @update="onDistanceInMilesUpdate"
      />
      <Button type="button" label="Search" @click="submit" :loading="true" />
      <template v-if="anyJobAdvertsPresent">
        <Divider align="center">
          Results
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
        <Divider align="center" />
        <JobAdvert
          v-for="(advert, i) in jobAdverts"
          :key="i"
          :data="advert"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { isNil, isEmpty } from "lodash";
import Button from "primevue/button";
import Divider from "primevue/divider";
import store from "@/store";
import InputField from "@/ui/InputField";
import ResultSummary from "@/components/ResultSummary";
import JobAdvert from "@/components/JobAdvert";

export default {
  name: "Home",
  components: {
    InputField,
    Button,
    Divider,
    ResultSummary,
    JobAdvert
  },
  data() {
    return {
      formData: {
        keywords: null,
        location: null,
        distanceInMiles: null
      }
    };
  },
  computed: {
    ...mapGetters(["jobAdvertsLoading", "reedJobAdverts", "glassdoorJobAdverts"]),
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
  },
  methods: {
    onKeywordsUpdate(value) {
      this.formData.keywords = value;
    },
    onLocationUpdate(value) {
      this.formData.location = value;
    },
    onDistanceInMilesUpdate(value) {
      this.formData.distanceInMiles = parseInt(value);
    },
    submit() {
      store.dispatch("getJobAdverts", this.formData);
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-content: center;

  &__form {
    width: fit-content;
    align-self: center;
    min-width: 300px;
    width: 50%;
  }
}
</style>