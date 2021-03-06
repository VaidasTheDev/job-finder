<template>
  <Card class="job-advert">
    <template #title>
      <div class="job-advert__row">
        <a class="job-advert__title" :href="data.url" target="_blank">
          {{ jobData.title }}
        </a>
        <div class="job-advert__row-second-element">
          Provided by
          <Tag rounded class="" :value="data.provider" />
        </div>
      </div>
    </template>
    <template #content>
      <div class="job-advert__row">
        <div class="job-advert__location">
          <span class="material-icons job-advert__location-icon">
            place
          </span>
          {{ jobData.location }}
        </div>
        <span class="job-advert__row-second-element">{{ jobData.postDate }}</span>
      </div>
      <div
        v-if="isSalaryDataPresent"
        class="job-advert__row"
      >
        <Tag
          class="job-advert__salary"
          :value="`
            ${estimatedText(jobData.salary.isEstimate)}
            ${salaryDisplayValue}
          `"
        />
      </div>
      <p class="job-advert__description" v-html="jobData.description" />
    </template>
  </Card>
</template>

<script>
import { isNil, isEmpty } from "lodash";
import Tag from "primevue/tag";
import Card from "primevue/card";
import { formatMoney } from "@/utils/MoneyUtil";

export default {
  name: "JobAdvert",
  components: {
    Tag,
    Card
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    jobData() {
      return this.data.job;
    },
    minSalaryRange() {
      return formatMoney(this.jobData.salary.min);
    },
    maxSalaryRange() {
      return formatMoney(this.jobData.salary.max);
    },
    isSalaryDataPresent() {
      if (isNil(this.jobData.salary)) {
        return false;
      }

      return this.maxSalaryRange != 0;
    },
    salaryDisplayValue() {
      if (this.minSalaryRange === this.maxSalaryRange) {
        return `£${this.minSalaryRange}`;
      }

      return `£${this.minSalaryRange} - £${this.maxSalaryRange}`;
    },
    hasLogo() {
      return !isEmpty(this.jobData.logo);
    }
  },
  methods: {
    formatMoney(num) {
      return formatMoney(num);
    },
    estimatedText(isEstimated) {
      return isEstimated ? "Estimated: " : ""
    }
  }
}
</script>

<style lang="scss" scoped>
.job-advert {
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  &__row {
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__title {
    text-decoration: none;
    color: $primaryColor;
    text-align: left;
    max-width: 80%;
  }

  &__logo {
    height: 150px;
    width: 150px;
    padding: 1rem;
  }

  &__salary {
    font-weight: normal;
    font-size: 1rem;
    background-color: $secondaryColor;
  }

  &__location {
    font-size: 1rem;
    display: flex;
    align-items: center;
  }

  &__location-icon {
    color: $primaryColor;
  }

  &__description {
    text-align: left;
    margin-block-end: 0;
  }

  &__row-second-element {
    margin-left: auto;
    font-weight: 600;
    font-size: 0.875rem;
    align-self: flex-start;
  }
}
</style>