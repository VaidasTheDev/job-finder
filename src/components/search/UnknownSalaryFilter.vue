<template>
  <div class="unknown-salary-filter">
    <div class="unknown-salary-filter__checkbox">
      <Checkbox
        v-model="isSelected"
        id="data-provider-glassdoor"
        binary
      />
      <label
        class="unknown-salary-filter__checkbox-label"
        for="data-provider-glassdoor"
      >
        {{ $t("search.filters.unknownSalary") }}
      </label>
    </div>
  </div>
</template>

<script>
import Checkbox from "primevue/checkbox";
import QUERY_PARAMS from "@/constants/queryParams";
import { parseBoolean } from "@/utils/BooleanUtil";

export default {
  name: "UnknownSalaryFilter",
  components: {
    Checkbox
  },
  data() {
    return {
      isSelected: false
    };
  },
  watch: {
    isSelected(val) {
      console.log(val);
      console.log("push: " + this.isSelected);
      this.$router.push({
        query: {
          [QUERY_PARAMS.SEARCH.UNKNOWN_SALARY]: this.isSelected
        }
      });
    }
  },
  created() {
    this.isSelected = parseBoolean(this.$route.query[QUERY_PARAMS.SEARCH.UNKNOWN_SALARY]);
  }
}
</script>

<style lang="scss" scoped>
.unknown-salary-filter {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  align-self: flex-end;

  &__checkbox {
    padding: 0.5rem;
  }

  &__checkbox-label {
    margin-left: 0.25rem;
  }
}
</style>