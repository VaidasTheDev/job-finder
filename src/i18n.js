import { createI18n } from "vue-i18n";

const messages = {
  en: {
    app: {
      name: "JOB VAULT",
      nameWords: {
        job: "Job",
        vault: "Vault"
      },
      slogan: "Helping you find the next opportunity. Quicker.",
      poweredBy: {
        prefix: "Powered by ",
        glassdoor: "glassdoor.co.uk",
        reed: "reed.co.uk"
      }
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