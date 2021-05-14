<template>
  <div class="job-search-form">
    <InputField
      class="large-field"
      input-id="job-search-form__search-input-field"
      :label="$t('home.search.form.keywords.label')"
      :help-text="$t('home.search.form.keywords.helper')"
      @update="onKeywordsUpdate"
    />
    <InputField
      input-id="job-search-form__search-location-input-field"
      :label="$t('home.search.form.location.label')"
      :help-text="$t('home.search.form.location.helper')"
      @update="onLocationUpdate"
    />
    <InputField
      input-id="job-search-form__search-distance-input-field"
      type="number"
      :label="$t('home.search.form.distance.label')"
      :help-text="$t('home.search.form.distance.helper')"
      @update="onDistanceInMilesUpdate"
    />
    <Button type="button" label="Search" @click="submit" :disabled="jobAdvertsLoading" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Button from "primevue/button";
import InputField from "@/ui/InputField";
import store from "@/store";

export default {
  name: "JobSearchForm",
  components: {
    Button,
    InputField
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
    ...mapGetters(["jobAdvertsLoading"])
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
.job-search-form {
  display: flex;
  flex-direction: column;
  align-content: center;
}
</style>