<template>
  <div class="job-search-filters">
    <DataProviderFilter />
  </div>
</template>

<script>
import DataProviderFilter from "./DataProviderFilter";

export default {
  name: "JobSearchFilters",
  components: {
    DataProviderFilter
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
  margin-top: 1rem;
}
</style>