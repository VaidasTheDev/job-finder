<template>
  <div class="home">
    <div class="home__header">
      <img class="home__svg" :src="DestinationsSvg" />
    </div>
    <div class="home__form-wrapper">
      <div class="home__form">
        <div class="home__search-title">
          <span>{{ $t("home.search.form.title") }}</span>
        </div>
        <div class="home__row">
          <InputField
            v-model="formData.keywords"
            class="large-field"
            input-id="job-search-form__search-input-field"
            :label="$t('home.search.form.keywords.label')"
            light-colored
            :placeholder="$t('home.search.form.keywords.placeholder')"
          />
          <InputField
            v-model="formData.location"
            input-id="job-search-form__search-location-input-field"
            :label="$t('home.search.form.location.label')"
            light-colored
            :placeholder="$t('home.search.form.location.placeholder')"
            :button-label="$t('button.search')"
            button-theme="secondary"
            button-icon="pi pi-search"
            @submit="onSubmit($event)"
          />
        </div>
      </div>
    </div>
    <div class="home__results-wrapper">
      <JobSearchResultSummary class="home__job-search-result-summary" />
    </div>
  </div>
</template>

<script>
import { isEmpty } from "lodash";
import JobSearchForm from "@/components/JobSearchForm";
import JobSearchResultSummary from "@/components/JobSearchResultSummary";
import InputField from "@/ui/InputField";
import DestinationsSvg from "@/assets/destinations.svg";

export default {
  name: "Home",
  components: {
    JobSearchForm,
    JobSearchResultSummary,
    InputField
  },
  data() {
    return {
      DestinationsSvg,
      formData: {
        keywords: null,
        location: null
      }
    }
  },
  methods: {
    onSubmit() {
      if (!isEmpty(this.formData.keywords) && !isEmpty(this.formData.location)) {
        this.$router.push({
          name: "Search",
          params: { ...this.formData }
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-content: center;
  background: $primaryColor;
  min-height: 100vh;
  padding: 2rem;

  &__header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__svg {
    max-height: 40vh;
    padding: 2rem;
  }

  &__form-wrapper {
    display: flex;
    justify-content: center;
    padding: 3rem;
  }

  &__form {
    align-self: center;
    min-width: 300px;
    min-width: 60%;
  }

  &__results-wrapper {
    display: flex;
    flex-direction: column;
    min-width: 300px;
    width: 100%;
    background: $backgroundColor;
  }

  &__app-name {
    color: white;
  }

  &__search-title {
    width: 100%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  &__job-search-result-summary {
    max-width: 80%;
    align-self: center;
  }

  &__row {
    display: flex;
    justify-content: center;

    > * {
      margin-left: 0.5rem;
    }
  }
}
</style>