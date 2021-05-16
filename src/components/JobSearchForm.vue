<template>
  <Card class="job-search-form">
    <template #content>
      <div class="job-search-form__form">
        <InputField
          v-model="formData.keywords"
          class="large-field"
          input-id="job-search-form__search-input-field"
          :label="$t('home.search.form.keywords.label')"
          :placeholder="$t('home.search.form.keywords.placeholder')"
        />
        <InputField
          v-model="formData.location"
          input-id="job-search-form__search-location-input-field"
          :label="$t('home.search.form.location.label')"
          :placeholder="$t('home.search.form.location.placeholder')"
        />
        <InputField
          v-model="formData.distance"
          input-id="job-search-form__search-distance-input-field"
          type="number"
          :label="$t('home.search.form.distance.label')"
          :placeholder="$t('home.search.form.distance.placeholder')"
        />
      </div>
    </template>
    <template #footer>
      <Button
        class="job-search-form__submit-button"
        type="button"
        :label="$t('button.search')"
        @click="submit"
        :disabled="jobAdvertsLoading"
      />
    </template>
  </Card>
</template>

<script>
import { mapGetters } from "vuex";
import Button from "primevue/button";
import Card from "primevue/card";
import InputField from "@/ui/InputField";
import store from "@/store";

export default {
  name: "JobSearchForm",
  components: {
    Button,
    Card,
    InputField
  },
  props: {
    keywords: {
      type: String
    },
    location: String
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
      store.commit("setSearchKeywords", this.formData.keywords);
      store.dispatch("getJobAdverts", this.formData);
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.onKeywordsUpdate(this.keywords);
      }
    },
    location: {
      immediate: true,
      handler() {
        this.onLocationUpdate(this.location);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.job-search-form {
  padding: 0.5rem;

  &__form {
    display: flex;
    flex-direction: column;
    align-content: center;
  }

  &__submit-button {
    width: 100%;
  }
}
</style>