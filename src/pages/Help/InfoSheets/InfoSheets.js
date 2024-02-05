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

const FAQ = () => (
  <Box sx={{ border: 0.5, borderColor: 'grey.300' }} ml={2} mr={2} mt={5}>
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
  </Box>
);
export default FAQ;
