<template>
  <div class="result-summary">
    <div class="result-summary__item">
      <b class="result-summary__item-header">Reed.co.uk</b>
      <span>Number of relevant adverts: {{ total }}</span>
    </div>
  </div>
</template>

,<script>
export default {
  name: "ResultSummary",
  props: {
    total: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.result-summary {
  display: flex;
  flex-direction: column;

  &__item {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  &__item-header {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
}
</style>