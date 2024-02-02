/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/*
  This file contains the HelpComponent, helper functions, and styles
  The HelpComponent is a static  help page that has FAQ, how to use, data dictionary, and information sheets
  RenderContent contains all the text listed in the about section
  styled using CustomStyles from ../../shared/constants
*/

import {
  Box, Container, Link, Typography,
} from '@mui/material';
import React from 'react';

const faqs = [
  {
    id: 1,
    question: 'What is the difference between dormant and non-dormant alfalfa?',
    answer: '"Dormant" alfalfa varieties are those traditionally grown as perennials in northern climates; they have varying degrees of cold hardiness but would generally be expected to survive the winter. “Non dormant” alfalfa varieties are far less strongly perennial in cold climates due to lower levels of cold hardiness. There are some differences in growth pattern and forage quality between the two groups, as well. Non-dormant varieties produce more biomass in the first year than dormant varieties.',
  },
  {
    id: 2,
    question: 'What is a “forage brassica”?',
    answer: 'Many forage brassicas are hybrids of B. oleracea and B. napus. (i.e. kale, rapeseed, turnip). Some are bred for their leaf production, others for their roots. Be aware of what you are buying depending on your needs.',
  },
  {
    id: 3,
    question: 'What is the difference between a forage, daikon, tillage, and oilseed radish?',
    answer: 'Radishes have been bred for many purposes, including (human) food, (animal) feed and forage, and ability to improve soil structure. Confusion as to naming abounds, and is worsened by the fact that the various types of radish readily interbreed. Cover crop radishes are generally referred to as daikon-type radishes (as opposed to the globe-shaped radishes that feature in salads). According to Extension resources, ‘Tillage’ radish is actually a specific brand of radish bred to be a cover crop. Oilseed radishes have smaller, more branching roots than forage radishes. Be aware of what you are buying depending on your needs.',
  },
  {
    id: 4,
    question: 'What is the difference between a forage turnip vs ‘Purple Top’ turnip?',
    answer: 'Forage turnips have been bred for use as animal feed (i.e. large tonnage per acre), as opposed to ‘Purple Top’ and similar cultivars traditionally grown for human food (i.e. bulb production). Seed costs vary widely. Be aware of what you are buying depending on your needs.',
  },
  {
    id: 5,
    question: 'What do you mean by “mustard”?',
    answer: 'Our tool groups several species under the term “mustard”, including Sinapis alba (white mustard) and Brassica juncea (brown, Oriental, or Indian mustard). We include notes in the comments/notes sections on the information sheet where there are differences in characteristics or uses among the species.',
  },
  {
    id: 6,
    question: 'What’s the difference between canola and rapeseed?',
    answer: 'In practice for cover croppers, not much. Some rapeseed was bred to have lower levels of compounds not good for human consumption, making it better for the production of cooking oil. The varieties good for the production of oil for human consumption are referred to as “canola”. Canola seed is generally more expensive than rapeseed seed.',
  },
  {
    id: 7,
    question: 'What is the difference between “winter” and “spring” small grains?',
    answer: 'We are referring to germplasm type. For example, “winter” wheat varieties are those that would be expected to usually survive winter and require vernalization (i.e. cold) to trigger flowering. “Spring” wheat varieties are much less cold hardy and do not require vernalization to flower.',
  },
  {
    id: 8,
    question: 'Can spring small grains be planted in fall and vice versa? Why would you do so?',
    answer: "Winter small grain cultivars can be planted in spring, but they won't flower (which may be useful since they don't get as tall and are good for a low-growing ground cover). Likewise, spring small grains may be planted in the fall (and will therefore likely winter-kill, preventing the need for spring termination).",
  },
  {
    id: 9,
    question: 'Why do ratings for a given cover crop vary by hardiness zone?',
    answer: 'USDA hardiness zones are based on average minimum temperatures and are a simple proxy for the length of the growing season across the Northeast US. Ratings differ because these climatic features affect planting dates, crop management, and plant growth. In addition, the experts in each zone sometimes have differences in experience with the cover crop; a cover crop may be more commonly used in a vegetable rotation in one zone and an agronomic rotation in another one, with corresponding differences in traits due to the way they are used.',
  },
  {
    id: 10,
    question: 'I’m applying fall manure and want a cover crop to take up the N and prevent Prunoff. What should I use?',
    answer: 'Choose a cover crop ranked high for the goals of “nitrogen scavenging”, “prevent fall erosion”, and “prevent spring erosion”.',
  },
  {
    id: 11,
    question: 'I want a cover crop that can prevent soil crusting. What should I use?',
    answer: 'Pick a cover crop that is either alive during the time period of concern or has a good rating for “lasting residue” and that has a good rating for “soil aggregation” and “reduces topsoil compaction”.',
  },
  {
    id: 12,
    question: 'I am interested in a recommendation based on a goal you do not have in your tool. What can I do?',
    answer: 'Consider what existing goals and rated traits make up the goal you are interested in.',
  },
];

const FAQ = () => (
  <Box sx={{ border: 0.5, borderColor: 'grey.300' }} ml={2} mr={2} mt={5}>
    <Typography component="div" variant="body1" align="left">
      <ol>
        {faqs.map(((faq) => (
          <>
            <li><b>{faq.question}</b></li>
            <Container style={{ marginBottom: '3%' }}>
              {faq.answer}
              {faq.id === 12 && (
              <>
                <br />
                <Link to="/feedback">Send us feedback!</Link>
                {' '}
                Let us know.
              </>
              )}
            </Container>
          </>
        )))}
      </ol>
    </Typography>
  </Box>
);
export default FAQ;
