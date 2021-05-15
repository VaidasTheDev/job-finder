import { createI18n } from "vue-i18n";

const messages = {
  en: {
    app: {
      name: "Job Explorer"
    },
    labels: {
      jobSearchResults: "Search results"
    },
    home: {
      slogan: "Search for your next opportunity across multiple platforms simultaneously",
      search: {
        form: {
          title: "Quick search",
          keywords: {
            label: "Keywords",
            helper: "You may provide a position title or company name, for example"
          },
          location: {
            label: "Location",
            helper: "You may provide a postcode, town or city name"
          },
          distance: {
            label: "Distance",
            helper: "Distance in miles"
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