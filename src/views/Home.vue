<template>
  <div class="home">
    <div class="home__header">
      <img class="home__svg" :src="DestinationsSvg" />
      <h3 class="home__slogan">
        {{ $t("home.slogan") }}
      </h3>
    </div>
    <div class="home__form-wrapper">
      <div class="home__form">
        <div class="home__search-title">
          <span class="material-icons home__search-icon">search</span>
          <span>{{ $t("home.search.form.title") }}</span>
        </div>
        <JobSearchForm />
      </div>
    </div>
    <div class="home__results-wrapper">
      <JobSearchResultSummary class="home__job-search-result-summary" />
    </div>
  </div>
</template>

<script>
import JobSearchForm from "@/components/JobSearchForm";
import JobSearchResultSummary from "@/components/JobSearchResultSummary";
import DestinationsSvg from "@/assets/destinations.svg";

export default {
  name: "Home",
  components: {
    JobSearchForm,
    JobSearchResultSummary
  },
  data() {
    return {
      DestinationsSvg
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

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__svg {
    max-height: 25vh;
    padding: 2rem;
  }

  &__slogan {
    max-width: 25%;
    color: white;
    font-weight: normal;
  }

  &__form-wrapper {
    display: flex;
    justify-content: center;
    padding: 3rem;
  }

  &__form {
    align-self: center;
    min-width: 300px;
    width: 50%;
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
    margin-bottom: 1rem;
  }

  &__search-icon {
    font-size: 2rem;
    margin-right: 0.5rem;
  }

  &__job-search-result-summary {
    max-width: 80%;
    align-self: center;
  }
}
</style>