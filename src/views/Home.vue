<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import jobService from "@/services/jobService";

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    getJobs() {
      jobService.getReedJobs("communications", "london", 15);
    }
  },
  mounted() {
    this.getJobs();
  }
}
</script>
