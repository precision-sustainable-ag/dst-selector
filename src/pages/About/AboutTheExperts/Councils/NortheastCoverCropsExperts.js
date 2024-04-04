/*
  This file contains the HelpComponent, helper functions, and styles
  The HelpComponent is a static  help page that has FAQ, how to use, data dictionary, and information sheets
  RenderContent contains all the text listed in the about section
  styled using CustomStyles from ../../shared/constants
*/

import { Typography } from '@mui/material';
import React from 'react';

const NortheastCoverCropExperts = () => {
  const experts = [
    { lastName: 'Bench', firstName: 'Christian', Affiliation: 'New Jersey farmer, USDA NRCS' },
    { lastName: 'Bergstrom', firstName: 'Gary', Affiliation: 'Cornell University' },
    { lastName: 'Björkman', firstName: 'Thomas', Affiliation: 'Cornell University' },
    { lastName: 'Brown', firstName: 'Rebecca', Affiliation: 'Rhode Island State University' },
    { lastName: 'Cavigelli', firstName: 'Michel', Affiliation: 'USDA ARS' },
    { lastName: 'Clark', firstName: 'Shawnna', Affiliation: 'USDA NRCS Plant Materials Center' },
    { lastName: 'Cochrane', firstName: 'Chad', Affiliation: 'USDA NRCS' },
    { lastName: 'Cooper', firstName: 'Aaron', Affiliation: 'Maryland farmer' },
    { lastName: 'Darby', firstName: 'Heather', Affiliation: 'University of Vermont' },
    { lastName: 'Duiker', firstName: 'Sjoerd', Affiliation: 'Penn State University' },
    { lastName: 'Farbotnik', firstName: 'Kaitlin', Affiliation: 'USDA NRCS' },
    { lastName: 'Gallandt', firstName: 'Eric', Affiliation: 'University of Maine' },
    { lastName: 'Gill', firstName: 'Kelly', Affiliation: 'Xerces Society' },
    { lastName: 'Goodson', firstName: 'Mark', Affiliation: 'USDA NRCS' },
    { lastName: 'Hively', firstName: 'W. Dean', Affiliation: 'USGS' },
    { lastName: 'Hooks', firstName: 'Cerruti', Affiliation: 'University of Maryland' },
    { lastName: 'Hyde', firstName: 'Jim', Affiliation: 'USDA NRCS' },
    { lastName: 'Larson', firstName: 'Zach', Affiliation: 'Bayer' },
    { lastName: 'Lilley', firstName: 'Jason', Affiliation: 'University of Maine' },
    { lastName: 'Long', firstName: 'Rebecca', Affiliation: 'University of Maine' },
    { lastName: 'Mallory', firstName: 'Ellen', Affiliation: 'University of Maine' },
    { lastName: 'Mehl', firstName: 'Hillary', Affiliation: 'USDA ARS' },
    { lastName: 'Mirsky', firstName: 'Steven', Affiliation: 'USDA ARS' },
    { lastName: 'O Reilly', firstName: 'Christine', Affiliation: 'Ontario Ministry of Agriculture, Food, and Rural Affairs' },
    { lastName: 'Raubenstein', firstName: 'Scott', Affiliation: 'Perdue AgriBusinesses' },
    { lastName: 'Ruhl', firstName: 'Lindsey', Affiliation: 'University of Vermont' },
    { lastName: 'Salon', firstName: 'Paul', Affiliation: 'USDA NRCS, retired' },
    { lastName: 'Smith', firstName: 'Brandon', Affiliation: 'American Farmland Trust' },
    { lastName: 'VanGessel', firstName: 'Mark', Affiliation: 'University of Delaware' },
    { lastName: 'Verhallen', firstName: 'Anne', Affiliation: 'Ontario Ministry of Agriculture, Food, and Rural Affairs, ret.' },
    { lastName: 'Wallace', firstName: 'John', Affiliation: 'Penn State University' },
    { lastName: 'Wilson', firstName: 'Dave', Affiliation: 'Kings AgriSeeds' },
    { lastName: 'Workman', firstName: 'Kirsten', Affiliation: 'Cornell University' },
  ];
  const sortedExperts = experts.sort((a, b) => (a.lastName.localeCompare(b.lastName)));

  return (
    <Typography variant="body1" align="left" gutterBottom component="div">
      {sortedExperts.map((expert) => (
        <p>
          <strong>{`${expert.lastName}, ${expert.firstName}; `}</strong>
          <span>{expert.Affiliation}</span>
        </p>
      ))}
    </Typography>
  );
};
export default NortheastCoverCropExperts;
