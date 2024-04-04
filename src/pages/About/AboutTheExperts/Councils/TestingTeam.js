/*
  This file contains the HelpComponent, helper functions, and styles
  The HelpComponent is a static  help page that has FAQ, how to use, data dictionary, and information sheets
  RenderContent contains all the text listed in the about section
  styled using CustomStyles from ../../shared/constants
*/

import { Typography } from '@mui/material';
import React from 'react';

const TestingTeam = () => {
  const experts = [
    { lastName: 'Davis', firstName: 'Brian', Affiliation: 'North Carolina State University' },
    { lastName: 'Marcillo', firstName: 'Guillermo', Affiliation: 'North Carolina State University' },
    { lastName: 'Peterson', firstName: 'Cara', Affiliation: 'University of Maryland' },
    { lastName: 'Sweep', firstName: 'Ethan', Affiliation: 'USDA ARS' },
    { lastName: 'Schomberg', firstName: 'Harry', Affiliation: 'USDA ARS' },
    { lastName: 'Purtilo', firstName: 'Jim', Affiliation: 'University of Maryland' },
    { lastName: 'Musial', firstName: 'Christian', Affiliation: 'University of Maryland' },
    { lastName: 'Lorenzi', firstName: 'Eli', Affiliation: 'University of Maryland' },
    { lastName: 'Jachja', firstName: 'Tiffany', Affiliation: 'University of Maryland' },
    { lastName: 'Wallace', firstName: 'Eric', Affiliation: 'University of Maryland' },
    { lastName: 'Aviles', firstName: 'Miguel', Affiliation: 'University of Maryland' },
    { lastName: 'Dalal', firstName: 'Sohum', Affiliation: 'University of Maryland' },
    { lastName: 'Choi', firstName: 'Brian', Affiliation: 'University of Maryland' },
    { lastName: 'Ma', firstName: 'Yanzhuo', Affiliation: 'University of Maryland' },
    { lastName: 'Nolan', firstName: 'Jack', Affiliation: 'University of Maryland' },
    { lastName: 'Pradhan', firstName: 'Neelima', Affiliation: 'University of Maryland' },
    { lastName: 'McCloskey', firstName: 'Mark', Affiliation: 'University of Maryland' },
    { lastName: 'Lee', firstName: 'Alex', Affiliation: 'University of Maryland' },
    { lastName: 'Hyun Lim', firstName: 'Jeong', Affiliation: 'University of Maryland' },
    { lastName: 'McNamee', firstName: 'Patrick', Affiliation: 'University of Maryland' },
    { lastName: 'Obizoba', firstName: 'Chukwuebuka', Affiliation: 'University of Maryland' },
    { lastName: 'Proctor', firstName: 'Alex', Affiliation: 'University of Maryland' },
    { lastName: 'Tamrakar', firstName: 'Sushant', Affiliation: 'University of Maryland' },
    { lastName: 'Feder', firstName: 'Matthew', Affiliation: 'University of Maryland' },
    { lastName: 'Kovvuru', firstName: 'Gautham', Affiliation: 'University of Maryland' },
    { lastName: 'Lee', firstName: 'Isaac', Affiliation: 'University of Maryland' },
    { lastName: 'Patel', firstName: 'Meekit', Affiliation: 'University of Maryland' },
    { lastName: 'Stumbaugh', firstName: 'Ryan', Affiliation: 'University of Maryland' },
    { lastName: 'Wallberg', firstName: 'Micah', Affiliation: 'University of Maryland' },
    { lastName: 'Wilton', firstName: 'Zachary', Affiliation: 'University of Maryland' },
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
export default TestingTeam;
