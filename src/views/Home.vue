<template>
  <div class="home">
    <div class="home__header">
      <div class="home__row">
        <h1 class="home__header-title">
          {{ $t("app.nameWords.job") }}
        </h1>
        <h1 class="home__header-title--vault">
          {{ $t("app.nameWords.vault") }}
        </h1>
      </div>
      <h2 class="home__slogan">{{ $t("app.slogan") }}</h2>
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
            input-id="job-search-toolbar__search-input-field"
            :label="$t('home.search.form.keywords.label')"
            :placeholder="$t('home.search.form.keywords.placeholder')"
          />
          <InputField
            v-model="formData.location"
            input-id="job-search-toolbar__search-location-input-field"
            :label="$t('home.search.form.location.label')"
            :placeholder="$t('home.search.form.location.placeholder')"
            :button-label="$t('button.search')"
            button-theme="primary"
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
import JobSearchToolbar from "@/components/JobSearchToolbar";
import PoweredBy from "@/components/PoweredBy";
import InputField from "@/ui/InputField";
import DestinationsSvg from "@/assets/destinations.svg";

export default {
  name: "Home",
  components: {
    JobSearchToolbar,
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
  min-height: 100vh;
  padding: 2rem;

  &__header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__header-title {
    color: $primaryColor;
    margin: 3rem 0 0 0;
    text-transform: uppercase;

    &--vault {
      color: $textColor;
      margin: 3rem 0 0 0;
      text-transform: uppercase;
      margin-left: 0 !important;
    }
  }

  &__slogan {
    margin-block-start: 0;
    margin-bottom: 3rem;
  }

  &__svg {
    max-height: 30vh;
    padding: 2rem;
    max-width: 100%;
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

  &__search-title {
    width: 100%;
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

      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>