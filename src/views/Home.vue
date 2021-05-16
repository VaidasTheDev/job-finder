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
    <PoweredBy />
  </div>
</template>

<script>
import { isEmpty } from "lodash";
import JobSearchForm from "@/components/JobSearchForm";
import PoweredBy from "@/components/PoweredBy";
import InputField from "@/ui/InputField";
import DestinationsSvg from "@/assets/destinations.svg";

export default {
  name: "Home",
  components: {
    JobSearchForm,
    InputField,
    PoweredBy
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

  &__row {
    display: flex;
    justify-content: center;

    > * {
      margin-left: 0.5rem;
    }
  }
}
</style>