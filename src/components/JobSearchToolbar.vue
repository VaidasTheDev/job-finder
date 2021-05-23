<template>
  <div class="job-search-toolbar">
    <div class="job-search-toolbar__form">
      <InputField
        v-model="formData.keywords"
        class="large-field"
        input-id="job-search-toolbar__search-input-field"
        :label="$t('home.search.form.keywords.label')"
        :placeholder="$t('home.search.form.keywords.placeholder')"
        :disabled="jobAdvertsLoading"
      />
      <InputField
        v-model="formData.location"
        input-id="job-search-toolbar__search-location-input-field"
        :label="$t('home.search.form.location.label')"
        :placeholder="$t('home.search.form.location.placeholder')"
        :disabled="jobAdvertsLoading"
      />
      <InputField
        v-model="formData.distance"
        input-id="job-search-toolbar__search-distance-input-field"
        type="number"
        :label="$t('home.search.form.distance.label')"
        :placeholder="$t('home.search.form.distance.placeholder')"
        :disabled="jobAdvertsLoading"
        :button-label="$t('button.search')"
        button-icon="pi pi-search"
        @submit="onSubmit($event)"
      />
    </div>
    <JobSearchFilters v-if="isExpanded" />
    <Button
      class="p-button-rounded p-button-text job-search-toolbar__expand-button"
      :icon="isExpanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
      @click="toggleExpandedSection"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Button from "primevue/button";
import Divider from "primevue/divider";
import store from "@/store";
import InputField from "@/ui/InputField";
import JobSearchFilters from "@/components/search/JobSearchFilters";

export default {
  name: "JobSearchToolbar",
  components: {
    Button,
    InputField,
    Divider,
    JobSearchFilters
  },
  props: {
    keywords: [Number, String],
    location: String,
    triggerOnMount: {
      type: Boolean,
      default: false
    },
    pageNumber: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      formData: {
        keywords: null,
        location: null,
        distanceInMiles: null
      },
      isExpanded: false
    };
  },
  emits: ["submit"],
  computed: {
    ...mapGetters(["jobAdvertsLoading"])
  },
  methods: {
    toggleExpandedSection() {
      this.isExpanded = !this.isExpanded;
    },
    onDistanceInMilesUpdate(value) {
      this.formData.distanceInMiles = parseInt(value);
    },
    onSubmit() {
      store.dispatch("getJobAdverts", {
        ...this.formData,
        pageNumber: this.pageNumber
      });
      this.$emit("submit", { ...this.formData });
    }
  },
  watch: {
    pageNumber() {
      store.dispatch("getJobAdverts", {
        ...this.formData,
        pageNumber: this.pageNumber
      });
    }
  },
  beforeMount() {
    this.formData = {
      keywords: this.keywords,
      location: this.location
    };

    if (this.triggerOnMount) {
      this.onSubmit();
    }
  }
}
</script>

<style lang="scss" scoped>
.job-search-toolbar {
  padding: 1rem 1rem 0 1rem;

  &__form {
    display: flex;
    align-content: center;
    flex-wrap: wrap;

    @media only screen and (max-width: $smallDeviceWidthLimit) {
      flex-direction: column;
    }

    > * {

      @media only screen and (min-width: $smallDeviceWidthLimit) {
        margin-bottom: 0;
        margin-right: 0.5rem;
      }
    }
  }

  &__submit-button {
    width: fit-content;
    height: fit-content;
    align-self: flex-end;
    
    @media only screen and (max-width: $smallDeviceWidthLimit) {
      flex-direction: column;
      align-self: flex-start;
    }
  }

  &__expand-button {
    margin: 0.25rem 0;
    
    &:focus {
      outline: none;
      outline-width: 0;
      box-shadow: none;
    }
  }
}
</style>