/*
  This file contains the HelpComponent, helper functions, and styles
  The HelpComponent is a static  help page that has FAQ, how to use, data dictionary, and information sheets
  RenderContent contains all the text listed in the about section
  styled using CustomStyles from ../../shared/constants
*/

import { Typography } from '@mui/material';
import React from 'react';

const DevelopmentTeam = () => {
  const experts = [
    { lastName: 'Mirsky', firstName: 'Steven', Affiliation: 'USDA-ARS' },
    { lastName: 'Reberg-Horton', firstName: 'Chris', Affiliation: 'North Carolina State University' },
    { lastName: 'Bandooni', firstName: 'Rohit', Affiliation: 'North Carolina State University' },
    { lastName: 'Raturi', firstName: 'Ankita', Affiliation: 'Purdue University' },
    { lastName: 'Norton', firstName: 'Juliet', Affiliation: 'Purdue University' },
    { lastName: 'Morrow', firstName: 'Anna', Affiliation: 'Purdue University' },
    { lastName: 'Ackroyd', firstName: 'Victoria', Affiliation: 'University of Maryland' },
    { lastName: 'Darby', firstName: 'Heather', Affiliation: 'University of Vermont' },
    { lastName: 'Davis', firstName: 'Brian', Affiliation: 'North Carolina State University' },
    { lastName: 'Pinegar', firstName: 'Mikah', Affiliation: 'North Carolina State University' },
    { lastName: 'Hitchcock', firstName: 'Rick', Affiliation: 'University of Georga' },
    { lastName: 'Smith', firstName: 'Adam', Affiliation: 'North Carolina State University' },
    { lastName: 'Puckett', firstName: 'Trevor', Affiliation: 'North Carolina State University' },
    { lastName: 'Agamohammadnia', firstName: 'Milad', Affiliation: 'North Carolina State University' },
    { lastName: 'Xu', firstName: 'Jingtong', Affiliation: 'North Carolina State University' },
    { lastName: 'Adusumelli', firstName: 'Vyshnavi', Affiliation: 'North Carolina State University' },
    { lastName: 'Chittilapilly', firstName: 'Boscosylvester John', Affiliation: 'North Carolina State University' },
    { lastName: 'Chavan', firstName: 'Ameya', Affiliation: 'North Carolina State University' },
  ];
  const sortedExperts = experts.sort((a, b) => (a.lastName.localeCompare(b.lastName)));
  return (
    <Typography style={{ paddingTop: '15px' }} variant="body1" align="left">
      {sortedExperts.map((expert) => (
        <p>
          <strong>{`${expert.lastName}, ${expert.firstName}; `}</strong>
          <span>{expert.Affiliation}</span>
        </p>
      ))}
    </Typography>
  );
};
export default DevelopmentTeam;
