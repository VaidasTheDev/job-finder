import { createI18n } from "vue-i18n";

const messages = {
  en: {
    app: {
      name: "Job Explorer"
    },
    labels: {
      jobSearchResults: "Search results"
    },
    button: {
      search: "Search"
    },
    home: {
      search: {
        form: {
          title: "Quick search",
          keywords: {
            label: "Keywords",
            placeholder: "e.g. Communications Officer, Facebook"
          },
          location: {
            label: "Location",
            placeholder: "e.g. London, Swindon"
          },
          distance: {
            label: "Distance (in miles)",
            placeholder: "e.g. 15"
          }
        },
        results: {
          label: "Available opportunities",
          summary: "Summary"
        }
      }
    }
  }
};

const i18n = new createI18n({
  locale: "en",
  messages,
});

export default i18n;