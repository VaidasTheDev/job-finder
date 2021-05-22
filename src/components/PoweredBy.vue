<template>
  <div class="powered-by">
    <span>{{ $t("app.poweredBy.prefix") }}</span>
    <a href="https://www.glassdoor.co.uk/" class="powered-by__company-name">
      {{ $t("app.poweredBy.glassdoor") }}
    </a>
    <span> & </span>
    <a href="https://www.reed.co.uk/" class="powered-by__company-name">
      {{ $t("app.poweredBy.reed") }}
    </a>
  </div>
</template>

<script>
export default {
  name: "PoweredBy"
}
</script>

<style lang="scss" scoped>
.powered-by {
  color: $textColor;
  user-select: none;

  &__company-name {
    font-weight: bold;
    text-decoration: none;
    color: $textColor;
  }
}
</style>