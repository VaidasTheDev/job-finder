<template>
  <div class="job-advert">
    <div class="job-advert__content">
      <div class="job-advert__header">
        <div class="job-advert__row">
          <a class="job-advert__title" :href="data.url">
            <b>{{ jobData.title }}</b>
          </a>
          <Tag rounded class="job-advert__row-second-element" :value="data.provider" />
        </div>
        <div class="job-advert__row">
          <span class="job-advert__location">{{ jobData.location }}</span>
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
              £${formatMoney(jobData.salary.min)} - £${formatMoney(jobData.salary.max)}
            `"
          />
        </div>
      </div>
      <p class="job-advert__description" v-html="jobData.description" />
    </div>
  </div>
</template>

<script>
import { isNil, isEmpty } from "lodash";
import Tag from "primevue/tag";
import { formatMoney } from "@/utils/MoneyUtil";

export default {
  name: "JobAdvert",
  components: {
    Tag
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
    isSalaryDataPresent() {
      return !isNil(this.jobData.salary);
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
      return isEstimated ? "Estimated - " : ""
    }
  }
}
</script>

<style lang="scss" scoped>
.job-advert {
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-bottom: none;
  width: 100%;

  &:last-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }

  padding: 0.75rem 1rem;
  display: flex;
  text-align: left;
  align-items: center;

  &__logo {
    height: 150px;
    width: 150px;
    padding: 1rem;
  }

  &__description {
    margin-block-end: 0;
  }

  &__row {
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 0.25rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    width: 100% !important;
  }

  &__salary {
    font-weight: normal;
    font-size: 1rem;
    background-color: $secondaryColor;
  }

  &__location {
    font-size: 1rem;
  }

  &__row-second-element {
    margin-left: auto;
    font-weight: 600;
    font-size: 0.875rem;
  }
}
</style>