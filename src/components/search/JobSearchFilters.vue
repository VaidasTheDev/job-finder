<template>
  <div class="job-search-filters">
    <DataProviderFilter />
    <UnknownSalaryFilter />
  </div>
</template>

<script>
import Divider from "primevue/divider";
import DataProviderFilter from "./DataProviderFilter";
import UnknownSalaryFilter from "./UnknownSalaryFilter";

export default {
  name: "JobSearchFilters",
  components: {
    Divider,
    DataProviderFilter,
    UnknownSalaryFilter
  }
}
</script>

<style lang="scss" scoped>
.job-search-filters {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;

  > * {
    margin: 1rem;
  }
}
</style>