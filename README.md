## Cover Crop Species Selector Decision Support Tool

The species selector DST is used to help farmers select a cover crop that fits their goals and constraints. The user can either input specifics about their field location and cover cropping goals or explore cover crops without entering those details. The tool is mainly used to explore expert reccomendations and ratings for cover crops in the farmer's USDA Plant Hardiness Zone. This allows farmers to make educated decisions that are best suited for their specific goals and can save time as opposed to calling the extension office.

Support for this project is brought to us by [Agricultural Informatics Lab](https://sudokita.com), NE SARE, USDA NRCS, NECCC, and the [Precision Sustainable Agriculture](http://precisionsustainableag.org).

To access the live tool, visit [https://covercrop-selector.org/](https://covercrop-selector.org/).  
To see development progress, visit [https://develop.covercrop-selector.org/](https://develop.covercrop-selector.org/)  
For in depth documentation see [the wiki pages](https://precision-sustainable-ag.atlassian.net/wiki/spaces/DST/pages/156500002/Species+Selector).

**Date Created:** 08/18/22

**Date Last Modified:** 05/30/2025

## Table of Contents:

- [Cover Crop Species Selector Decision Support Tool](#cover-crop-species-selector-decision-support-tool)
- [Table of Contents:](#table-of-contents)
- [Tech stack](#tech-stack)
- [Local Installation Steps](#local-installation-steps)
- [Running in docker:](#running-in-docker)
- [Runbook](#runbook)
- [Unit Testing](#unit-testing)
- [Helpful Links](#helpful-links)

## Tech stack

- Single page application made in React.js
- Ratings and zone info verified via Airtable and then ingested into a PostgreSQL database and served up using a Node.js API

## Local Installation Steps

**Prerequisites:**

1. Node and NPM [Download Here](https://nodejs.org/en/download/)
2. Git [Download Here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
3. A code editor (we recommend VS Code) [Download Here](https://code.visualstudio.com/docs/setup/setup-overview)

**Steps:**

1. Open a new Terminal for Mac/Linux or Command Prompt for Windows
2. Move to the desired folder `cd /path/to/folder`
3. Clone this repository into that folder `git clone https://github.com/precision-sustainable-ag/dst-selector`
4. From the Terminal/Command Prompt, move into the cloned directory `cd dst-selector`
5. From the same command window, run `npm install` to install project dependencies. A full list of the dependencies can be found in package.json. If you are running on a windows machine delete package-lock.json prior to running the below command.
6. Create a file called .env in `root` directory (dst-selector). The file will contain the below keys. This document is in the git ignore, so it (and your API keys) won't be pushed to the repository. Ask @mikahpinegar or Adam Smith for the values of the keys

    ```
    VITE_API_AUTH0_DOMAIN="<auth0 domain>"
    VITE_API_AUTH0_CLIENT_ID="<auth0 client id>"
    VITE_API_AUTH0_AUDIENCE="<auth0 audience>"
    VITE_API_USER_HISTORY_API_URL="<user history url>"
    VITE_API_USER_HISTORY_SCHEMA="<schema>"
    VITE_API_RELEASE_NOTES="<Release Notes URL>"
    VITE_API_MAPBOX_TOKEN="<mabox token>"
    VITE_AUTH0_USERNAME="<auth0 username>"
    VITE_AUTH0_PASSWORD="<auth0 password>"
    ```

7. After the dependencies have been installed and the .env file has been created, run `npm start` to run the code locally. If you run into any issues take a look in the [Runbook](#runbook) for previous issues and solutions. This will compile the JSX code into Javascript and open up a new browser window with the current version of the covercrops project!

## Running in docker:

Run `./start_script.sh`
Run `open http://localhost:3000`

## Runbook

**Symptom:**
Node sass not supported on Mac OS `Error: Node Sass does not yet support your current environment: OS X 64-bit with Unsupported runtime (88)`

**Solution:**
`npm rebuild node-sass`

**Symptom:**
After running `npm install` you might run into an `Error E404 - Not Found - GET https://registry.npmjs.org/@psa%2fdst.ui.map - Not found`

**Solution:**
Follow these steps:

1. Install the `react-scripts` package using `npm install react-scripts --save`
2. Run `npm start`

**Line Spacing**
Set Line spacing (CRLF -> LF)
`git config core.autocrlf false`
`git rm --cached -r .`
`git reset --hard`

## Unit Testing

To run the Cypress client
`npx cypress open --config-file=dev.config.js`

## Helpful Links

**Confluence Links**
[Development Best Practices](https://precision-sustainable-ag.atlassian.net/wiki/spaces/ON/pages/381255706/Development+Best+Practices?atl_f=PAGETREE)
[Design Best Practaces](https://precision-sustainable-ag.atlassian.net/wiki/spaces/DST/pages/582746142/Web+Content+Accessibility+Guidelines+Best+Practices)
[ESLint](https://precision-sustainable-ag.atlassian.net/wiki/spaces/ON/pages/203915267/Linting+an+Application?atl_f=PAGETREE)
[Release Notes](https://precision-sustainable-ag.atlassian.net/wiki/spaces/DST/pages/277413889/Species+Selector+Release+Notes)
[User History](https://precision-sustainable-ag.atlassian.net/wiki/spaces/DST/pages/493584392/User+History+Introduction)

**Recomended Development Tools**
[VSCode](https://code.visualstudio.com/)
[Cursor](https://www.cursor.com/)
