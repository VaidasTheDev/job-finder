<template>
  <router-view/>
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $textColor;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $textColor;
  }
}

body {
  background: $backgroundColor;
}
</style>
