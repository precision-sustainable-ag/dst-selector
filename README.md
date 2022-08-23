## Cover Crop Species Selector Decision Support Tool

**Date Created:** 8/18/22

**Date Last Modified:** 8/23/22

The species selector DST is used to help farmers select a cover crop that fits their goals and constraints. The user can either input specifics about their field location and cover cropping goals or explore cover crops without entering those details. The tool is mainly used to explore expert reccomendations and ratings for cover crops in the farmer's USDA Plant Hardiness Zone. This allows farmers to make educated decisions that are best suited for their specific goals and can save time as opposed to calling the extension office.

Support for this project is brought to us by [Agricultural Informatics Lab](https://sudokita.com), NE SARE, USDA NRCS, NECCC, and the [Precision Sustainable Agriculture](http://precisionsustainableag.org).

To access the live tool, visit [covercrop.tools](http://covercrop.tools)
To see development progress, visit [http://covercrop.tools](http://covercrop.tools)

## Table of Contents:

- [Cover Crop Species Selector Decision Support Tool](#cover-crop-species-selector-decision-support-tool)
- [Table of Contents:](#table-of-contents)
- [Tech stack](#tech-stack)
- [Local Installation Steps](#local-installation-steps)
- [Running in docker:](#running-in-docker)
- [Documentation](#documentation)
- [Runbook](#runbook)

## Tech stack

- Single page application made in React.js
- Ratings and zone info hosted in Airtable (in the process of being refactored)

## Local Installation Steps

**Prerequisites:**

1. Node and NPM [Download Here](https://nodejs.org/en/download/)
2. Git [Download Here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
3. A code editor (we recommend vs code) [Download Here](https://code.visualstudio.com/docs/setup/setup-overview)
4. VS Code extention: Prettier - esbenp.prettier-vscode
   - once installed use ctrl + shift + p to open Preferences: open user settings (JSON)
   - inside the JSON object add these lines
     - "editor.formatOnSave": true,
     - "[javascript]": {
       "editor.defaultFormatter": "esbenp.prettier-vscode"
       }

**Steps:**

1. Open a new Terminal for Mac/Linux or Command Prompt for Windows
2. Move to the desired folder `cd /path/to/folder`
3. Clone this repository into that folder `git clone https://github.com/precision-sustainable-ag/dst-selector`
4. From the Terminal/Command Prompt, move into the cloned directory `cd dst-selector`
5. From the same command window, run `npm install` to install project dependencies. A full list of the dependencies can be found in package.json. If you are running on a windows machine delete package-lock.json prior to running the below command.
6. Create a file called .env in src/shared. The file will contain the below keys. This document is in the git ignore, so it (and your API keys) won't be pushed to the repository. Ask @mikahpinegar for the values of the keys

```
REACT_APP_GOOGLE_API_KEY="<google key>"
REACT_APP_OPEN_WEATHER_API_KEY="<open weather key>"
```

7. After the dependencies have been installed and the .env file has been created, run `npm start` to run the code locally. If you run into any issues take a look in the [Runbook](#runbook) for previous issues and solutions. This will compile the JSX code into Javascript and open up a new browser window with the current version of the covercrops project!

## Running in docker:

Run `./start_script.sh`
Run `open http://localhost:3000`

## Documentation

For in depth documentation see [the wiki pages](https://precision-sustainable-ag.atlassian.net/wiki/spaces/DST/pages/156500002/Species+Selector)

## Runbook

**Symptom:**
Node sass not suported on Mac OS `Error: Node Sass does not yet support your current environment: OS X 64-bit with Unsupported runtime (88)`

**Solution:**
`npm rebuild node-sass`
