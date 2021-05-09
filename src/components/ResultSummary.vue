<template>
  <div class="result-summary">
    <div class="result-summary__item">
      <b>{{ total }}&nbsp;</b>
      <span>adverts&nbsp;</span>
      <span>from <b>{{ label }}</b></span>
    </div>
  </div>
</template>

,<script>
export default {
  name: "ResultSummary",
  props: {
    label: {
      type: String,
      required: true
    },
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
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  &__item {
    display: flex;
    text-align: left;
  }
}
</style>