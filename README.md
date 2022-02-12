# job-explorer

## Data sources

The application aims to provide 30 records from each source per page sorted by date posted with latest posts at the top.

The following are the data sources used with additional notes provided for each one.

**Glassdoor**
- Open source API without API key/secret required
- Provides 30 records per page

**Reed**
- Open source API with API key/secret required
- Provides 100 records per page

## Features

**Serverless**

Pure FE application handles communication with the third-party APIs directly.

**Filters**

The search can be filtered by the following options:
- Keyword(s)
- Location
- Distance (miles)
- Source (Glassdoor/Reed)
- Ignore jobs with no salary data

