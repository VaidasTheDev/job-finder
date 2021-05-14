<template>
  <div class="home">
    <h1>{{ $t("app.name") }}</h1>
    <div class="home__form">
      <JobSearchForm />
      <JobSearchResultSummary v-if="anyJobAdvertsPresent" />
    </div>
  </div>
</template>

<script>
import JobSearchForm from "@/components/JobSearchForm";
import JobSearchResultSummary from "@/components/JobSearchResultSummary";

export default {
  name: "Home",
  components: {
    JobSearchForm,
    JobSearchResultSummary
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