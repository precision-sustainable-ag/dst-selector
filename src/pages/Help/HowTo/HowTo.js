/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/*
  This file contains the HelpComponent, helper functions, and styles
  The HelpComponent is a static  help page that has FAQ, how to use, data dictionary, and information sheets
  RenderContent contains all the text listed in the about section
  styled using CustomStyles from ../../shared/constants
*/

import {
  Box, Typography,
} from '@mui/material';
import React from 'react';

const HowTo = () => (
// const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);
// const toolUsage = [
//   {
//     id: 1,
//     title1: 'Start with the Species Selector Wizard',
//     content1: [{
//       title2: 'Define your location:',
//       content2: [
//         'Enter your location so we can identify your zone and pin your location on the map. Please note that we do not store your data, meaning that once you leave our website, your instance closes, and any data you provided is not retained.',
//         'Draw an outline of the field you plan to cover crop so we can auto populate your local soils and weather data.',
//       ],
//     }, {
//       title2: 'Refine your soils data:',
//       content2: [
//         'Review your local soils data, populated from the NRCS Web Soil Survey, or provide your own data if you did not draw an outline of your field.',
//         'Specify if you have tiling -- tiling will affect your drainage class.',
//         'Your soils data is used to filter your results.',
//       ],
//     }, {
//       title2: 'Refine your weather data:',
//       content2: [
//         'Review your local weather data, populated from the Precision Sustainable Agriculture Weather API, or provide your own data if you did not specify a location.',
//         'At this time, we are not using your historical weather data to filter results. We ask you to specify your weather data so that it is fresh in your mind when you choose your cover crops. Cover crop performance in this tool is based on an "average" year. Performance in years that are notably hotter, colder, wetter, drier, or combinations thereof may vary.',
//       ],
//     }, {
//       title2: 'Choose your goals',
//       content2: [
//         'Specify up to three cover cropping goals in order of priority.',
//         'The list of recommended cover crop species will be filtered based on these goals.',
//       ],
//     }],
//   }, {
//     id: 2,
//     title1: 'Add cover crops to My Cover Crop List',
//     content1: [{
//       title2: 'Filter your results by additional requirements, if desired',
//       content2: [],
//     },
//     {
//       title2: 'Look at the calendar view for details on planting dates on active growth periods.',
//       content2: [],
//     },
//     {
//       title2: 'Click “View Details” to review all of our data on the cover crop of interest.',
//       content2: [],
//     },
//     {
//       title2: 'If the cover crop is one you would like to consider, add it to your cover crop list.',
//       content2: [],
//     }],
//   }, {
//     id: 3,
//     title1: 'Download spreadsheets or PDFs of your cover crops',
//     content1: [{
//       title2: 'View your cover crop list to remove cover crops or download a PDF or spreadsheet of the cover crop list you have curated.',
//       content2: [],
//     }],
//   }, {
//     id: 4,
//     title1: 'Visit the Explorer',
//     content1: [{
//       title2: 'At any point in your experience you can use the Explorer to filter through and search for any cover crop in our data set.',
//       content2: [],
//     }],
//   },
// ];
  <Box sx={{ border: 0.5, borderColor: 'grey.300' }} ml={2} mr={2} mt={5}>
    <Typography component="div" variant="body1" align="left">
      <span>
        Video tutorial coming soon…
      </span>
      {/* <ol>
              {toolUsage.map((tool) => (
                <>
                  <li key={tool.id}><b>{tool.title1}</b></li>
                  <ul>
                    {tool.content1.map((c1) => (
                      <>
                        <li>{c1.title2}</li>
                        {tool.id === 4 && (
                        <li>
                          You need to specify a
                          {' '}
                          <a
                            href="https://planthardiness.ars.usda.gov/PHZMWeb/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            hardiness zone
                          </a>
                          {' '}
                          to use the Explorer.
                        </li>
                        )}
                        {c1.content2.length > 0 && (
                          <ul>
                            {c1.content2.map((content, index) => (
                              <li key={index}>
                                {content}
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ))}
                  </ul>
                </>
              ))}
            </ol> */}
    </Typography>
  </Box>
);
export default HowTo;
