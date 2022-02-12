<template>
  <Card class="job-advert">
    <template #title>
      <div class="job-advert__row">
        <Skeleton shape="square" width="40rem" height="2rem" class="job-advert__title" />
        <Skeleton shape="square" width="10rem" height="1.25rem" class="job-advert__row-second-element" />
      </div>
    </template>
    <template #content>
      <div class="job-advert__row">
        <Skeleton shape="square" width="15rem" height="1.25rem" class="job-advert__location" />
        <Skeleton shape="square" width="7.5rem" height="1.25rem" class="job-advert__row-second-element" />
      </div>
      <Skeleton shape="square" width="3rem" height="1.25rem" class="job-advert__salary" />
      <Skeleton shape="square" width="100%" height="10rem" class="job-advert__description" />
    </template>
  </Card>
</template>

<script>
import Card from "primevue/card";
import Skeleton from "primevue/skeleton";
import { formatMoney } from "@/utils/MoneyUtil";

export default {
  name: "JobAdvert",
  components: {
    Card,
    Skeleton
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
  width: 100%;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
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

  &__title {
    text-decoration: none;
    color: $primaryColor;
    text-align: left;
    width: 2rem;
    margin-bottom: 0.25rem;
  }

  &__logo {
    height: 150px;
    width: 150px;
    padding: 1rem;
  }

  &__salary {
    margin-bottom: 1rem;
  }

  &__location {
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;
  }

  &__location-icon {
    color: $primaryColor;
  }

  &__description {
    margin-bottom: 0.25rem;
  }

  &__row-second-element {
    margin-left: auto;
    align-self: flex-start;
  }
}
</style>