<template>
  <div class="home">
    <h1>Job Explorer</h1>
    <div class="home__form">
      <InputField
        input-id="home__search-input-field"
        label="Position"
        help-text="Enter your desired position"
        :value="keywords"
        @update="onKeywordsUpdate"
      />
      <InputField
        input-id="home__search-distance-input-field"
        label="Distance"
        help-text="Distance in miles from London"
        :value="keywords"
        @update="onKeywordsUpdate"
      />
      <Button label="Search" @click="submit" />
      <Divider />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InputField from "@/components/InputField";
import Button from "primevue/button";
import Divider from "primevue/divider";
import store from "@/store";

export default {
  name: "Home",
  components: {
    InputField,
    Button,
    Divider
  },
  data() {
    return {
      formData: {
        keywords: null,
        location: "London",
        distanceInMiles: null
      }
    };
  },
  computed: {
    ...mapGetters(["jobAdverts"])
  },
  methods: {
    onKeywordsUpdate(value) {
      this.formData.keywords = value;
    },
    submit() {
      this.getJobs();
    },
    getJobs() {
      store.dispatch("getJobAdverts", this.formData);
    }
  },
  watch: {
    jobAdverts() {
      console.log(this.jobAdverts);
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-content: center;

  &__form {
    width: fit-content;
    align-self: center;
    min-width: 50%;
  }
}
</style>