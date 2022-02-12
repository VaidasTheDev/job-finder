import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "./styles/global.scss";

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .mount("#app");
