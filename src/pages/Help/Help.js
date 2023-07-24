/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/*
  This file contains the HelpComponent, helper functions, and styles
  The HelpComponent is a static  help page that has FAQ, how to use, data dictionary, and information sheets
  RenderContent contains all the text listed in the about section
  styled using CustomStyles from ../../shared/constants
*/

import {
  Box, Button, Container, Grid, Stack, Typography,
} from '@mui/material';
import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import { CustomStyles } from '../../shared/constants';
import Header from '../Header/Header';
import InformationSheetDictionary from './InformationSheetDictionary/InformationSheetDictionary';
import { Context } from '../../store/Store';

const Help = () => {
  const { state } = useContext(Context);

  useEffect(() => {
    document.title = 'Help Page';
  }, []);

  useEffect(() => {
    if (state.consent === true) {
      ReactGA.initialize('UA-181903489-1');

      ReactGA.pageview('help');
    }
  }, [state.consent]);

  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const pageSections = [
    {
      id: 0,
      menuOption: 'How to use the NECCC Species Selector Tool',
      title: 'How to Use The Tool',
    },
    {
      id: 1,
      menuOption: 'Frequently Asked Questions',
      title: 'Frequently Asked Questions',
    },
    {
      id: 2,
      menuOption: 'Data Dictionary',
      title: 'Data Dictionary',
    },
    {
      id: 3,
      menuOption: 'Information Sheets',
      title: 'Information Sheets',
    },
  ];

  const toolUsage = [
    {
      id: 1,
      title1: 'Start with the Species Selector Wizard',
      content1: [{
        title2: 'Define your location:',
        content2: [
          'Enter your location so we can identify your zone and pin your location on the map. Please note that we do not store your data, meaning that once you leave our website, your instance closes, and any data you provided is not retained.',
          'Draw an outline of the field you plan to cover crop so we can auto populate your local soils and weather data.',
        ],
      }, {
        title2: 'Refine your soils data:',
        content2: [
          'Review your local soils data, populated from the NRCS Web Soil Survey, or provide your own data if you did not draw an outline of your field.',
          'Specify if you have tiling -- tiling will affect your drainage class.',
          'Your soils data is used to filter your results.',
        ],
      }, {
        title2: 'Refine your weather data:',
        content2: [
          'Review your local weather data, populated from the Precision Sustainable Agriculture Weather API, or provide your own data if you did not specify a location.',
          'At this time, we are not using your historical weather data to filter results. We ask you to specify your weather data so that it is fresh in your mind when you choose your cover crops. Cover crop performance in this tool is based on an "average" year. Performance in years that are notably hotter, colder, wetter, drier, or combinations thereof may vary.',
        ],
      }, {
        title2: 'Choose your goals',
        content2: [
          'Specify up to three cover cropping goals in order of priority.',
          'The list of recommended cover crop species will be filtered based on these goals.',
        ],
      }],
    }, {
      id: 2,
      title1: 'Add cover crops to My Cover Crop List',
      content1: [{
        title2: 'Filter your results by additional requirements, if desired',
        content2: [],
      },
      {
        title2: 'Look at the calendar view for details on planting dates on active growth periods.',
        content2: [],
      },
      {
        title2: 'Click “View Details” to review all of our data on the cover crop of interest.',
        content2: [],
      },
      {
        title2: 'If the cover crop is one you would like to consider, add it to your cover crop list.',
        content2: [],
      }],
    }, {
      id: 3,
      title1: 'Download spreadsheets or PDFs of your cover crops',
      content1: [{
        title2: 'View your cover crop list to remove cover crops or download a PDF or spreadsheet of the cover crop list you have curated.',
        content2: [],
      }],
    }, {
      id: 4,
      title1: 'Visit the Explorer',
      content1: [{
        title2: 'At any point in your experience you can use the Explorer to filter through and search for any cover crop in our data set.',
        content2: [],
      }],
    },
  ];

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

  const infoSheets = [{
    id: 1,
    title: 'Cover Crops and Pollinators',
    content: [{
      subtitle: 'Using Flowering Cover Crops for Native Pollinating Bee Conservation, Penn State Extension,',
      link: 'https://extension.psu.edu/using-flowering-cover-crops-for-native-pollinating-bee-conservation',
    }, {
      subtitle: 'Conservation Cover for Pollinators, Xerces Society for Invertebrate Conservation,',
      link: 'http://northeastcovercrops.com/wp-content/uploads/2018/03/Conservation-Cover-for-Pollinators.pdf',
    }, {
      subtitle: 'Planting Flowers For Bees in Connecticut, Connecticut Agricultural Experiment Station,',
      link: 'http://northeastcovercrops.com/wp-content/uploads/2018/03/Planting-Flowers-For-Bees-in-Connecticut.pdf',
    }, {
      subtitle: 'Use of Cover Crops and Green Manures to Attract Beneficial Insects, University of Connecticut Integrated Pest Management Program,',
      link: 'http://ipm.uconn.edu/documents/raw2/Use%20of%20Cover%20Crops%20and%20Green%20Manures%20to%20Attract%20Beneficial%20Insects/Use%20of%20Cover%20Crops%20and%20Green%20Manures%20to%20Attract%20Beneficial%20Insects.php?display=print',
    }],
  }, {
    id: 2,
    title: 'Cover Crops for Weed Suppression',
    content: [{
      subtitle: 'Suppressing Weeds Using Cover Crops in Pennsylvania, Penn State Extension,',
      link: 'http://northeastcovercrops.com/wp-content/uploads/2018/04/Suppressing-Weeds-Using-Cover-Crops-in-Pennsylvania.pdf',
    }, {
      subtitle: 'Cover Crops as a Weed Management Tool, Getting Rid of Weeds,',
      link: 'https://growiwm.org/cover-crops',
    }],
  }, {
    id: 3,
    title: 'Cover Cropping in Fruit, Vegetable, or Perennial Systems',
    content: [{
      subtitle: 'Between Two Rows: Cover Crops for Perennial Plants, NH Vegetable and Fruit News,',
      link: 'https://nhvegfruitnews.wordpress.com/2016/06/27/between-two-rows-cover-crops-for-perennial-plants/',
    }, {
      subtitle: 'Spring Planted Cover Crops for Vegetable Rotations, University of Delaware Cooperative Extension,',
      link: 'https://extension.udel.edu/weeklycropupdate/?p=9950',
    }, {
      subtitle: 'Cover Crops and Green Manures (New England Vegetable Management Guide), University of Massachusetts Amherst,',
      link: 'https://nevegetable.org/cultural-practices/cover-crops-and-green-manures',
    }],
  }, {
    id: 4,
    title: 'Cover Crop Planting',
    content: [{
      subtitle: 'NH 340 Cover Crop Planting Specification Guide, USDA NRCS,',
      link: 'http://northeastcovercrops.com/wp-content/uploads/2018/03/NH-340-Cover-Crop-Planting-Specification-Guide-2.pdf',
    }, {
      subtitle: 'Tips for Interseeding Cover Crops, University of Vermont Extension,',
      link: 'http://northeastcovercrops.com/wp-content/uploads/2018/02/Tips-for-Interseeding-Cover-Crops.pdf',
    }, {
      subtitle: 'Aerial Seeding Helps Farmers Plant Cover Crops in the Northeast, Lancaster Farming,',
      link: 'http://www.lancasterfarming.com/news/northern_edition/aerial-seeding-helps-farmers-plant-cover-crops-in-northeast/article_1d4fbe53-e72e-5c37-ae24-98ce2ca8b2bb.html',
    }],
  }, {
    id: 5,
    title: 'Cover Crops and Herbicide Carryover',
    content: [{
      subtitle: 'Cover Crop Interseeder – Potential for Injury from Corn Herbicides, Penn State Extension,',
      link: 'http://northeastcovercrops.com/wp-content/uploads/2018/04/Cover-Crop-Interseeder-Potential-for-Injury-from-Corn-Herbicides.pdf',
    }, {
      subtitle: 'Herbicides Persistence and Rotation to Cover Crops, Penn State Extension,',
      link: 'https://extension.psu.edu/herbicides-persistence-and-rotation-to-cover-crops',
    }, {
      subtitle: 'Herbicide Considerations for Cover and Forage Crops, Penn State Extension,',
      link: 'https://extension.psu.edu/herbicide-considerations-for-cover-and-forage-crops',
    }],
  }, {
    id: 6,
    title: 'Cover Crop Termination',
    content: [{
      subtitle: 'Special Cover Crop Control Considerations, Penn State Extension,',
      link: 'https://extension.psu.edu/special-cover-crop-control-considerations',
    }, {
      subtitle: 'Cover Crop Rollers for Northeastern Grain Production, Penn State Extension,',
      link: 'https://extension.psu.edu/cover-crop-rollers-for-northeastern-grain-production',
    }, {
      subtitle: 'Cover Crop Termination Options, Getting Rid of Weeds,',
      link: 'https://growiwm.org/cover-crop-termination-options/',
    }, {
      id: 7,
      title: 'Planting Green',
      content: [{
        subtitle: 'Planting Green – A New Cover Crop Management Technique, Penn State Extension,',
        link: 'https://extension.psu.edu/planting-green-a-new-cover-crop-management-technique',
      }],
    }],
  }];

  const getContent = () => {
    switch (value) {
      case 0: return (
        <>
          <Typography component="div" variant="body1" align="left" gutterBottom>
            <iframe
              src="https://docs.google.com/presentation/d/e/2PACX-1vQbP5BcX8_u7bEfHjmAyUoSGeO3yVJkwbEveqSCh2xMn2M_f_EFp6kTi_5kvtp4S7zLITHXdkHEftPC/embed?start=false&loop=false&delayms=60000"
              width="100%"
              height="474"
              title="iframe"
            />
          </Typography>
          <Typography component="div" variant="body1" align="left">
            <ol>
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
            </ol>
          </Typography>
        </>
      );
      case 1: return (
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
      );
      case 2: return (
        <InformationSheetDictionary zone={6} from="help" />
      );
      case 3: return (
        <Typography component="div" variant="body1" align="left">
          <ol>
            {
              infoSheets.map(((info) => (
                <>
                  <li><b>{info.title}</b></li>
                  <ul>
                    {
                      info.content.map((content) => (
                        <li>
                          {content.subtitle}
                          <br />
                          <a href={content.link} target="_blank" rel="noopener noreferrer">{content.link}</a>
                        </li>
                      ))
                    }
                  </ul>
                </>
              )))
            }
          </ol>
        </Typography>
      );
      default: return null;
    }
  };

  return (
    <div className="contentWrapper">
      <Header />
      <Box sx={{ border: 0.5, borderColor: 'grey.300' }} ml={2} mr={2} mt={5}>
        <Grid container spacing={0} justifyContent="center" mt={4} mb={5} pt={3}>
          <Grid item xs={12} sm={12} md={3.4} lg={3.4} xl={3.4}>
            <div
              style={{
                border: `1px solid ${CustomStyles().darkGreen}`,
                borderRight: '0px',
              }}
            >
              {pageSections.map((section) => (
                <Button
                  key={section.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    borderRadius: '0px',
                    width: '100%',
                  }}
                  onClick={() => handleChange(section.id)}
                  variant={value === section.id ? 'contained' : 'text'}
                >
                  {section.menuOption}
                </Button>
              ))}
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={8}
            xl={8}
            mt={{
              xs: 3, sm: 3, md: 0, lg: 0, xl: 0,
            }}
          >
            <div style={{ border: `1px solid ${CustomStyles().darkGreen}`, minHeight: '320px' }}>
              <Stack pl={3} pr={3} pb={4}>
                <center>
                  <Typography variant="h4" gutterBottom>
                    {pageSections.filter((section) => section.id === value)[0].title}
                  </Typography>
                </center>
                {getContent()}
              </Stack>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Help;
