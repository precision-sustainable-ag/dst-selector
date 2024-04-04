/*
  This file contains the HelpComponent, helper functions, and styles
  The HelpComponent is a static  help page that has FAQ, how to use, data dictionary, and information sheets
  RenderContent contains all the text listed in the about section
  styled using CustomStyles from ../../shared/constants
*/

import { Typography } from '@mui/material';
import React from 'react';

const SouthernCoverCropExperts = () => {
  const experts = [
    { lastName: 'Cappellazzi', firstName: 'Shannon', Affiliation: 'GO Seed' },
    { lastName: 'Berns', firstName: 'Keith ', Affiliation: 'Nebraska farmer, Green Cover Seed' },
    { lastName: 'Chase', firstName: 'Carlene', Affiliation: 'University of Florida' },
    { lastName: 'Treadwell', firstName: 'Danielle', Affiliation: 'University of Florida' },
    { lastName: 'Haramoto', firstName: 'Erin', Affiliation: 'University of Kentucky' },
    { lastName: 'Berns', firstName: 'Jakin', Affiliation: 'Green Cover Seed' },
    { lastName: 'Rupert', firstName: 'Jonathan', Affiliation: 'Smith Seed Services' },
    { lastName: 'Lofton', firstName: 'Josh', Affiliation: 'Oklahoma State University' },
    { lastName: 'Gaskin', firstName: 'Julia', Affiliation: 'University of Georgia, retired' },
    { lastName: 'Balkcom', firstName: 'Kip', Affiliation: 'USDA ARS' },
    { lastName: 'Reiter', firstName: 'Mark', Affiliation: 'Virginia Tech' },
    { lastName: 'Lowder', firstName: 'Nathan', Affiliation: 'USDA NRCS' },
    { lastName: 'Basinger', firstName: 'Nicholas', Affiliation: 'Unversity of Georgia' },
    { lastName: 'Stout Evans', firstName: 'Rachel', Affiliation: 'USDA NRCS' },
    { lastName: 'Waring', firstName: 'Robert', Affiliation: 'Virginia farmer ' },
    { lastName: 'Seehaver', firstName: 'Sarah', Affiliation: 'North Carolina State University' },
    { lastName: 'Dempsey', firstName: 'Mark', Affiliation: 'Carolina Farm Stewardship Association' },
    { lastName: 'Singh Farmaha', firstName: 'Bhupinder', Affiliation: 'Clemson University' },
    { lastName: 'Fultz', firstName: 'Lisa', Affiliation: 'Louisiana State University AgCenter, USDA ARS' },
    { lastName: 'Gamble', firstName: 'Audrey', Affiliation: 'Auburn University' },
    { lastName: 'Hendrix', firstName: 'James', Affiliation: 'Louisiana State University AgCenter' },
    { lastName: 'Kelton', firstName: 'Jessica', Affiliation: 'Auburn University' },
    { lastName: 'McWhirt', firstName: 'Amanda', Affiliation: 'University of Arkansas' },
    { lastName: 'Panicker', firstName: 'Girish', Affiliation: 'Alcorn State University' },
    { lastName: 'Park', firstName: 'Dara', Affiliation: 'Clemson University' },
    { lastName: 'Prevost', firstName: 'Dan', Affiliation: 'Southern Ag, Inc.' },
    { lastName: 'Rajan', firstName: 'Nithya', Affiliation: 'Texas A&M University' },
    { lastName: 'Rudolph', firstName: 'Rachel', Affiliation: 'University of Kentucky' },
    { lastName: 'Thomas', firstName: 'Mark', Affiliation: 'Mountain View Seeds' },
    { lastName: 'Walker', firstName: 'Forbes', Affiliation: 'University of Tennessee' },
    { lastName: 'Ye', firstName: 'Rongzhong', Affiliation: 'Clemson University' },
    { lastName: 'Williams', firstName: 'Mary (Mimi)', Affiliation: 'USDA NRCS Plant Materials Center' },
    { lastName: 'Cole', firstName: 'Tracy', Affiliation: 'USDA NRCS' },
    { lastName: 'Proctor', firstName: 'Stuart', Affiliation: 'USDA NRCS' },
    { lastName: 'Scoggins', firstName: 'Keith', Affiliation: 'USDA NRCS' },
    { lastName: 'Green', firstName: 'Steven', Affiliation: 'Arkansas State University' },
    { lastName: 'Stone', firstName: 'Caleb', Affiliation: 'USDA NRCS' },
    { lastName: 'Vega', firstName: 'Rafael', Affiliation: 'USDA NRCS' },
    { lastName: 'Valencia', firstName: 'Elide', Affiliation: 'University of Puerto Rico' },
    { lastName: 'Leonard', firstName: 'Thomas', Affiliation: 'Gaia Herbs' },
    { lastName: 'Anoruo', firstName: 'Florence', Affiliation: 'South Carolina State University' },
    { lastName: 'Best', firstName: 'Terry', Affiliation: 'USDA NRCS' },
    { lastName: 'Sykes', firstName: 'Virginia', Affiliation: 'University of Tennessee' },
    { lastName: 'Rodriguez', firstName: 'Mario', Affiliation: 'USDA NRCS' },
    { lastName: 'Marrero', firstName: 'Edrick', Affiliation: 'USDA NRCS' },
    { lastName: 'Matos', firstName: 'Manuel', Affiliation: 'USDA NRCS' },
    { lastName: 'Vega', firstName: 'Jacqueline', Affiliation: 'USDA NRCS' },
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
export default SouthernCoverCropExperts;
