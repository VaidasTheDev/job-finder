<template>
  <div class="data-provider-filter">
    <span class="data-provider-filter__title">
      {{ $t("search.filters.dataProviders") }}
    </span>
    <div class="data-provider-filter__options">
      <div class="data-provider-filter__checkbox">
        <Checkbox
          v-model="dataProviders"
          id="data-provider-glassdoor"
          :value="DATA_PROVIDERS.GLASSDOOR"
        />
        <label
          class="data-provider-filter__checkbox-label"
          for="data-provider-glassdoor"
        >
          {{ DATA_PROVIDERS.GLASSDOOR }}
        </label>
      </div>
      <div class="data-provider-filter__checkbox">
        <Checkbox
          v-model="dataProviders"
          id="data-provider-reed"
          :value="DATA_PROVIDERS.REED"
        />
        <label
          class="data-provider-filter__checkbox-label"
          for="data-provider-reed"
        >
          {{ DATA_PROVIDERS.REED }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from "primevue/checkbox";
import DATA_PROVIDERS from "@/constants/dataProviders";

export default {
  name: "DataProviderFilter",
  components: {
    Checkbox
  },
  data() {
    return {
      dataProviders: [DATA_PROVIDERS.GLASSDOOR, DATA_PROVIDERS.REED],
      DATA_PROVIDERS
    };
  },
  watch: {
    dataProviders() {
      this.$router.push({ params: { dataProviders: this.dataProviders } })
    }
  }
}
</script>

<style lang="scss" scoped>
.data-provider-filter {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;

  &__title {
    margin: 0 0 0.25rem 0.5rem;
    font-size: small;
  }

  &__options {
    display: flex;
    flex-wrap: wrap;
  }

  &__checkbox {
    padding: 0.5rem;
  }

  &__checkbox-label {
    margin-left: 0.25rem;
  }
}
</style>