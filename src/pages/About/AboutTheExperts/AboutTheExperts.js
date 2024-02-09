/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/*
  This file contains the HelpComponent, helper functions, and styles
  The HelpComponent is a static  help page that has FAQ, how to use, data dictionary, and information sheets
  RenderContent contains all the text listed in the about section
  styled using CustomStyles from ../../shared/constants
*/

import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, Typography,
} from '@mui/material';
import React, { useState } from 'react';

const AboutTheExperts = () => {
  const [value, setValue] = useState(0);

  const expertsTable = [
    { area: 'Zone 7', people: 'Michel Cavigelli, Aaron Cooper, Dean Hively, Steven Mirsky, Scott Raubenstein, Mark VanGessel' },
    { area: 'Zone 6', people: 'Christian Bench, Rebecca Brown, Sjoerd Duiker, Kaitlin Farbotnik, Mark Goodson, Jim Hyde, Zach Larson, Dave Wilson' },
    { area: 'Zone 5', people: 'Thomas Bjorkman, Shawnna Clark, Chad Cochrane, Mark Goodson, Paul Salon, Anne Verhallen, Kirsten Workman' },
    { area: 'Zone 4', people: 'Heather Darby, Jason Lilley, Rebecca Long, Ellen Mallory, Lindsey Ruhl, Paul Salon, Brandon Smith, Kirsten Workman' },
    { area: 'Specialist Data', people: "Gary Bergstrom, Eric Gallandt, Kelly Gill, Cerruti Hooks, Hillary Mehl, Christine O'Reilly" },
    { area: 'Development Team', people: 'Victoria Ackroyd, Rohit Bandooni, Steven Mirsky, Juliet Norton, Ankita Raturi' },
  ];

  const councils = [
    {
      id: 0,
      menuOption: 'Midwest Cover Crop Council',
      title: 'Midwest Cover Crop Council',
    },
    {
      id: 1,
      menuOption: 'Northeast Cover Crop Council',
      title: 'Northeast Cover Crop Council',
    },
    {
      id: 2,
      menuOption: 'Southern Cover Crop Council',
      title: 'Southern Cover Crop Council',
    },
    {
      id: 3,
      menuOption: 'Western Cover Crop Council',
      title: 'Western Cover Crop Council',
    },
  ];

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ border: 0.5, borderColor: 'grey.300' }} ml={2} mr={2} mt={5}>
      {councils.map((council) => (
        <Button
          key={council.id}
          size="Small"
          sx={{
            maxWidth: '175px',
            backgroundColor: (council.id === value) ? '#598444' : 'white',
            color: (council.id === value) ? 'white' : '#8abc62',
            '&:hover': { backgroundColor: (council.id === value) ? '#598444' : 'white' },
          }}
          onClick={() => handleChange(council.id)}
          variant="contained"
        >
          {council.menuOption}
        </Button>

      ))}
      {console.log('value', value)}
      {value === 0
      && (
      <>
        <Typography variant="body1" align="left">
          The cover crop data in the Species Selector are brought to you by the following
          experts in Zones 4 through 7. The Species Selector and the data verification process
          are brought to you by the Development Team.
        </Typography>
        <TableContainer>
          <Table
            aria-label="simple table"
          >
            <TableBody>
              {expertsTable.map(((expert, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'lightgray',
                    },
                  }}
                >
                  <TableCell sx={{ border: 2, borderColor: 'lightgray' }}>
                    <Typography variant="body1" align="left">
                      {expert.area}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ border: 2, borderColor: 'lightgray' }}>
                    <Typography variant="body1" align="left">
                      {expert.people}
                    </Typography>
                  </TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <Typography variant="body1" align="left" gutterBottom>
          <b>Acknowledgements:</b>
          <br />
          Our thanks to:
          <br />
          Jim Purtilo and three teams of 24 students from the UMD CS 435 capstone classes:
          Miguel Aviles, Brian Choi, Sohum Dalal, Tiffany Jachja, Eli Lorenzi, Mark McCloskey,
          Jack Nolan, Neelima Pradhan, Alex Lee, Jeong Hyun Lim, Yanzhuo Ma, Patrick McNamee,
          Christian Musial, Chukwuebuka Obizoba, Alex Proctor, Sushant Tamrakar, Matthew Feder,
          Gautham Kovvuru, Isaac Lee, Meekit Patel, Ryan Stumbaugh, Eric Wallace, Micah
          Wallberg, Zachary Wilton. Undergraduate Research Support: Linda Yeung. Early tool
          testers including: Brian Davis, Guillermo Marcillo, Cara Peterson, Harry Schomberg,
          Ethan Sweep. Experts who helped with cover crop species list generation: John
          Chartier, Megan Chawner, Dorn Cox, Masoud Hashemi, Kris Ribble, Amy Shober, Kate
          Tully, Ray Weil. User interface testing participants at the NECCC and PASA tools
          sessions.
        </Typography>

        <br />
        <Typography variant="body1" align="left">
          <b>Expert and Development Team Credits:</b>
        </Typography>

        <Typography variant="body1" align="left" gutterBottom component="div">
          <p>
            <strong>Victoria Ackroyd </strong>
            is Program Manager for the Northeast Cover Crops
            Council, Assistant Research Scientist in the Dept. of Plant Science &amp; Landscape
            Architecture at the University of Maryland, and a Visiting Scientist in the USDA ARS
            Sustainable Agricultural Systems Lab (Beltsville, MD). She previously assisted with
            the Midwest Cover Crops Council Species Selector Tool and has experience with cover
            crops in both vegetable and agronomic systems. She led the data verification process
            for the NECCC Species Selector tool.
          </p>
          <p>
            <strong>Rohit Bandooni </strong>
            is a programmer at North Carolina State University.
            His background is Full Stack Development with a focus on Front End Web Development
            using modern JavaScript languages. He implemented the NECCC Species Selector
            tool.&nbsp;
          </p>
          <p>
            <strong>Christian Bench</strong>
            {' '}
            is a farmer and Agriculture Specialist with NJ
            RC&amp;D and NRCS. He provides leadership in the NJ soil health initiative, cover
            crop and no-till efforts. He notes that &ldquo;Armoring the soil and providing an
            ecosystem below our feet is of utmost importance as we face challenging growing
            conditions.&rdquo;
          </p>
          <p>
            <strong>Gary Bergstrom</strong>
            , Professor, Plant Pathology and Plant-Microbe
            Biology Section, Cornell University. Gary reviewed and updated data related to cover
            crops and cash crop disease.
          </p>
          <p>
            <strong>Thomas Bjorkman </strong>
            is a Professor of Veg Crop Physiology in the
            Horticulture Section at Cornell University. He works on cover crops for weed and
            soil-quality management goals.
          </p>
          <p>
            <strong>Rebecca Brown</strong>
            , Associate Professor, Rhode Island State University.
            Rebecca works on cover crops for peri-urban vegetable systems. She is particularly
            interested in identifying which cover crops work or do not work in coastal New
            England, which is cool summer zone 6.
          </p>
          <p>
            <strong>Michel Cavigelli</strong>
            , Soil Scientist, USDA ARS Sustainable Agricultural
            Systems Lab (Beltsville, MD).
          </p>
          <p>
            <strong>Shawnna Clark</strong>
            , Manager/Project leader/Plant Materials
            Specialist/Field Tech. She works with other NRCS specialists and field office
            personnel, and landowners, universities, local, state and other fed agencies on soil
            health and cover crops and many other important Farm Bill Programs.
          </p>
          <p>
            <strong>Chad Cochrane</strong>
            , USDA NRCS Resource Conservationist - Agronomy in New
            Hampshire.
          </p>
          <p>
            <strong>Aaron Cooper </strong>
            is an organic grain farmer on the lower Eastern Shore
            of Maryland. He feels that cover crop planting is essential to his farm to support
            nutrient cycling and to promote soil health.
          </p>
          <p>
            <strong>Heather Darby</strong>
            , Extension Professor: Agronomy Specialist, University
            of Vermont Extension.
          </p>
          <p>
            <strong>Sjoerd Duiker</strong>
            , Professor of Soil Management and Applied Soil
            Physics, Penn State University.
          </p>
          <p>
            <strong>Kaitlin Farbotnik</strong>
            , State Conservation Agronomist and State Grazing
            Specialist for New Jersey NRCS. Much of her work is spent training the next
            generation of conservationists and supporting the Soil Conservationists in New
            Jersey by providing technical information to help them make better conservation
            decisions while developing conservation plans.&nbsp;
          </p>
          <p>
            <strong>Eric Gallandt</strong>
            , Professor of Weed Ecology, University of Maine. Eric
            assisted in reviewing cover crop/weeds data.
          </p>
          <p>
            <strong>Kelly Gill</strong>
            , Senior Pollinator Conservation Specialist, Xerces
            Society. Kelly reviewed and provided data related to pollinators for the tool.
          </p>
          <p>
            <strong>Mark Goodson</strong>
            , USDA NRCS Pennsylvania State Agronomist.
          </p>
          <p>
            <strong>Dean Hively</strong>
            , Research Soil Scientist, USDA-ARS Hydrology and Remote
            Sensing Laboratory.
          </p>
          <p>
            <strong>Cerruti Hooks</strong>
            , Associate Professor, University of Maryland. Cerruti
            reviewed and provided data related to insects for the tool.&nbsp;
          </p>
          <p>
            <strong>Jim Hyde</strong>
            , State Agronomist in Connecticut, specializing in soil
            nutrient management and ag waste systems.&nbsp;
          </p>
          <p>
            <strong>Zach Larson</strong>
            , Field and Forage Crops Educator, Penn State University
            Extension.
          </p>
          <p>
            <strong>Jason Lilley</strong>
            , Sustainable Agriculture Professional, University of
            Maine.
          </p>
          <p>
            <strong>Rebecca Long</strong>
            , Agriculture and Food Systems Professional, University
            of Maine Cooperative Extension Oxford County
          </p>
          <p>
            <strong>Ellen Mallory</strong>
            , Sustainable Agriculture Extension Specialist and
            Professor, University of Maine.
          </p>
          <p>
            <strong>Hillary Mehl</strong>
            , now at the University of Arizona, reviewed and
            provided data related to nematodes for the tool.&nbsp;
          </p>
          <p>
            <strong>Steven Mirsky </strong>
            is a Research Ecologist in the USDA ARS Sustainable
            Agricultural Systems Lab (Beltsville, MD). His research program focuses on removing
            barriers to cover crop adoption and increasing the precision of their use with
            emphasis on management, breeding, and subsequent agro-ecosystem services. As chair
            of the NECCC and decision support tool subcommittee (2016 to present), he led the
            development of the NECCC Species Selector Tool and related tools.
          </p>
          <p>
            <strong>Juliet Norton </strong>
            is an Informatics Post-doctoral Researcher in the
            Agricultural Informatics Lab at Purdue University. Her research explores and
            addresses information-based barriers to sustainable agricultural practices. She was
            responsible for the implementation of the data verification process and underlying
            data structures. She also directed the implementation of the user interface design
            and ensured that it appropriately represented the cover crop data that powers the
            tool.&nbsp;
          </p>
          <p>
            <strong>Christine O&rsquo;Reilly</strong>
            , Forage and Grazing Specialist with the
            Ontario Ministry of Agriculture, Food, and Rural Affairs. Christine reviewed and
            provided data related to cover crops as feed/forage for the tool.
          </p>
          <p>
            <strong>Ankita Raturi </strong>
            is an Assistant Professor in Agricultural Engineering
            at Purdue University. She runs the
            {' '}
            <a href="http://sudokita.com" target="_blank" rel="noopener noreferrer">
              Agricultural Informatics Lab
            </a>
            , with research focused on human-centered design, information modeling, and software
            engineering, for increased resilience in food and agricultural systems. She led the
            design and development of the NECCC Species selector tool, co-designed the
            underlying data verification process and underlying crop information model.
          </p>
          <p>
            <strong>Scott Raubenstein</strong>
            , Vice President, Agricultural Services, Perdue
            AgriBusinesses.&nbsp;
          </p>
          <p>
            <strong>Lindsey Ruhl</strong>
            , Research Specialist for University of Vermont
            Extension Services.&nbsp;
          </p>
          <p>
            <strong>Paul Salon </strong>
            was formerly with USDA-NRCS at the Big Flats Plant
            Materials Center as Research Agronomist and Plant Materials Specialist covering
            Northeast states and with the National Soil Health Division as a Soil Health
            Specialist covering the Mid-Atlantic region. He was the primary architect of a cover
            crop mix seeding calculator currently under further development by the NECCC.
          </p>
          <p>
            <strong>Brandon Smith</strong>
            , USDA NRCS Northeast Regional Team Leader.
          </p>
          <p>
            <strong>Mark VanGessel</strong>
            , Extension Weed Specialist at University of
            Delaware.
          </p>
          <p>
            <strong>Anne Verhallen</strong>
            , Soil Management Specialist in Horticulture at
            Ridgetown, Ontario Ministry of Agriculture, Food, and Rural Affairs.
          </p>
          <p>
            <strong>John Wallace</strong>
            , Assistant Professor of Weed Science, Penn State
            University.&nbsp;
          </p>
          <p>
            <strong>Dave Wilson</strong>
            {' '}
            is an Agronomist, Field and Forage Crops Extension
            Educator with Penn State Extension in Berks County, PA. Dave has worked as a
            research agronomist in field crops, cover crops, forages, pasture management,
            grazing, soil health, farming rotations and organic farming systems. Dave's
            background includes dairy farming, maize breeding, certified hybrid corn production,
            certified soybean and small grain production and agricultural pesticide research.
            His prior experience includes conducting research evaluating new species and
            varieties for use in forage systems and as cover crops.
          </p>
          <p>
            <strong>Kirsten Workman, </strong>
            Agronomy Specialist and Certified Crop Adviser for
            University of Vermont Extension. She works directly with farmers on implementing
            conservation agronomy on their farms, focusing on soil health, nutrient management
            and water quality. She also engages in on-farm research focused on cover crops,
            especially in dairy cropping systems.
          </p>
        </Typography>
      </>
      )}
    </Box>
  );
};
export default AboutTheExperts;
