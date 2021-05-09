<template>
  <div class="job-advert">
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
    </div>
    <p class="job-advert__description" v-html="jobData.description"></p>
  </div>
</template>

<script>
import Tag from "primevue/tag";

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
    }
  }
}
</script>

<style lang="scss" scoped>
.job-advert {
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-bottom: none;
  min-width: 100%;

  &:last-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }

  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  text-align: left;
  flex-wrap: wrap;
  width: fit-content;

  &__description {
    margin-block-end: 0;
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

  &__location {
    font-weight: bold;
  }

  &__row-second-element {
    margin-left: auto;
    font-weight: bold;
  }
}
</style>