/* eslint-disable react/no-unescaped-entities */
/*
  This file contains the About component, helper functions, and styles
  The about page is a static pages that has information about the project
  RenderContent contains all the text listed in the about section
*/

import {
  Box, Button, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactGA from 'react-ga';
import { CustomStyles } from '../../shared/constants';
import Header from '../Header/Header';
import MITLicenseText from '../License/MITLicenseText/MITLicenseText';

const About = () => {
  const [value, setValue] = React.useState(0);
  const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (consentRedux === true) {
      ReactGA.initialize('UA-181903489-1');

      ReactGA.pageview('about');
    }
  }, [consentRedux]);

  const pageSections = [
    {
      id: 0,
      menuOption: 'History and Purpose of the NECCC Tool Effort',
      title: 'History and Purpose',
    },
    {
      id: 1,
      menuOption: 'Cover Crop Data',
      title: 'Cover Crop Data',
    },
    {
      id: 2,
      menuOption: 'Tool Design Process',
      title: 'Tool Design Process',
    },
    {
      id: 3,
      menuOption: 'Many Thanks to Our Funders',
      title: 'Many Thanks to Our Funders',
    },
    {
      id: 4,
      menuOption: 'Contact Us',
      title: 'Contact Us',
    },
    {
      id: 5,
      menuOption: 'About the Experts',
      title: 'About The Experts',
    },
  ];

  const expertsTable = [
    { area: 'Zone 7', people: 'Michel Cavigelli, Aaron Cooper, Dean Hively, Steven Mirsky, Scott Raubenstein, Mark VanGessel' },
    { area: 'Zone 6', people: 'Christian Bench, Rebecca Brown, Sjoerd Duiker, Kaitlin Farbotnik, Mark Goodson, Jim Hyde, Zach Larson, Dave Wilson' },
    { area: 'Zone 5', people: 'Thomas Bjorkman, Shawnna Clark, Chad Cochrane, Mark Goodson, Paul Salon, Anne Verhallen, Kirsten Workman' },
    { area: 'Zone 4', people: 'Heather Darby, Jason Lilley, Rebecca Long, Ellen Mallory, Lindsey Ruhl, Paul Salon, Brandon Smith, Kirsten Workman' },
    { area: 'Specialist Data', people: "Gary Bergstrom, Eric Gallandt, Kelly Gill, Cerruti Hooks, Hillary Mehl, Christine O'Reilly" },
    { area: 'Development Team', people: 'Victoria Ackroyd, Rohit Bandooni, Steven Mirsky, Juliet Norton, Ankita Raturi' },
  ];

  const getContent = () => {
    switch (value) {
      case 0:
        return (
          <Typography variant="body1" align="left">
            A diverse group of stakeholders including farmers, researchers, and personnel from
            agribusinesses and NGOs united in 2016 to form the
            {' '}
            <a href="http://northeastcovercrops.com" target="_blank" rel="noopener noreferrer">
              Northeast Cover Crops Council
            </a>
            {' '}
            (NECCC). Our mission is to support and promote the adoption of cover crops and foster
            the exchange of information, inspiration, and outcome-based research. Decision support
            tools are an excellent way to integrate the complexity of climate, soil, and
            management into recommendation systems. Therefore, we first targeted the development
            of a species selection tool. This tool provides cover crop species recommendations
            based on grower USDA hardiness zone and cropping system specifics. Our species
            selection tool was adapted from the Midwest Cover Crop Council and modified and
            expanded to target needs of producers in the Northeast. This initiative led to the
            formation of a Species Selector product team consisting of agronomists, informatics
            researchers, and developers, as well as four Cover Crop Data Verification teams,
            consisting of approximately 35 NECCC members.
          </Typography>
        );
      case 1:
        return (
          <Typography variant="body1" align="left">
            The data featured in this tool are based on expert opinion. These data represent the
            collective knowledge and experience of cover crop experts in the Northeast US.
            Experts, grouped by their USDA hardiness zone, evaluated each cover crop property in
            the dataset via deliberative discussions in over 70 teleconferences. The zones’
            decisions on cover crop characteristics, notes regarding nuances and edge/special
            cases, and framing of ratings were recorded in an online database. A comparative
            analysis of the data across zones identified areas of inconsistencies which were then
            addressed in a deliberative intra-regional discussion. This process, in conjunction
            with feedback from users on the website, ensures the quality and improvement of the
            data that powers the NECCC Species Selector. You can learn more about the
            {' '}
            <a
              href="https://aginformaticslab.org/cover-crop-decision-tools/"
              target="_blank"
              rel="noopener noreferrer"
            >
              cover crop data verification process here
            </a>
            .
            {' '}
            <b>This work was made possible by the USDA</b>
            <br />
            <br />
            <b>Data Sources:</b>
            {' '}
            The cover crop data were adapted from the
            {' '}
            <a href="http://mccc.msu.edu" target="_blank" rel="noopener noreferrer">
              Midwest Cover Crops Council (MCCC) species selector tool
            </a>
            . These initial data have been reviewed, modified, and greatly expanded upon by cover
            crop experts in the Northeast in each
            {' '}
            <a
              href="https://planthardiness.ars.usda.gov/PHZMWeb/"
              target="_blank"
              rel="noopener noreferrer"
            >
              USDA plant hardiness zone
            </a>
            {' '}
            to best match the cropping system types, goals, and constraints found in our region.
            Additional data sources adapted for this tool include the
            {' '}
            <a
              href="https://plants.sc.egov.usda.gov/java/"
              target="_blank"
              rel="noopener noreferrer"
            >
              USDA PLANTS database
            </a>
            {' '}
            and a seeding rate calculator developed by USDA NRCS. These data are supplemented by
            soils data available via
            {' '}
            <a
              href="https://sdmdataaccess.nrcs.usda.gov/"
              target="_blank"
              rel="noopener noreferrer"
            >
              USDA NRCS Soil Data Access
            </a>
            , and weather data made available through an API, constructed by the Precision
            Sustainable Agriculture team, serving
            {' '}
            <a
              href="https://www.nssl.noaa.gov/projects/mrms/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NSSL MRMS
            </a>
            {' '}
            and
            {' '}
            <a href="https://ldas.gsfc.nasa.gov/nldas/" target="_blank" rel="noopener noreferrer">
              NASA NLDAS-2
            </a>
            {' '}
            weather data.
            <br />
            <br />
            <b>Data Availability:</b>
            {' '}
            We are in the process of making our data publicly available
            via a few mechanisms once we have completed beta-testing and finalized data quality
            checks. In addition to accessing this data via the NECCC Species Selector Tool, users
            will be able to download the raw data (spreadsheets) and Species Information Sheets
            (PDFs).
            <br />
            <br />
            <MITLicenseText styles={false} aboutPage />
          </Typography>
        );
      case 2: return (
        <Typography variant="body1" align="left">
          The NECCC tool is a result of a design collaboration between the
          {' '}
          <a href="http://www.aginformaticslab.org" target="_blank" rel="noopener noreferrer">
            Agricultural Informatics Lab
          </a>
          , the
          {' '}
          <a
            href="http://www.precisionsustainableag.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Precision Sustainable Agriculture
          </a>
          {' '}
          team, the NECCC
          {' '}
          <b>and the USDA</b>
          . We took a user-centered approach to the design of
          software. In November 2019, we conducted a
          {' '}
          <a href="https://aginformaticslab.org/cover-crop-decision-tools/">
            distributed design sprint to develop a prototype of the user interface
          </a>
          {' '}
          (shown below). This interface was initially tested with 24 potential users at the
          NECCC annual conference. The tool was subsequently refined and tested with a second
          round of 20 potential users at the Pennsylvania Association for Sustainable
          Agriculture Conference in February 2020. This design was ultimately refined over the
          course of the 2020 development period, and resulted in the tool you now see on this
          website. We will be conducting user tests this upcoming fall in conjunction with the
          train-the trainer sessions run by the NECCC (
          <a
            href="http://www.northeastcovercrops.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.northeastcovercrops.com
          </a>
          ).
          <br />
          <br />
          <center>
            <img
              style={{
                width: '70%',
                boxShadow: '0 0 5px rgb(89, 132, 68)',
                borderRadius: '5px',
                padding: '1%',
              }}
              src="/images/mockup.gif"
              alt="Decision Support Tool Mockup"
            />
          </center>
          <br />
          <br />
          <b>Reusability:</b>
          {' '}
          We designed the user interface components of the Cover Crop
          Species Selector Tool to be reusable. Each user interface component is composed of
          smaller components that can be duplicated and used in a variety and multiple contexts.
          For example the location component is used in two parts of the species selector: the
          wizard -- the place the user first selects their location, and the green bar -- the
          place the user can update their location. The location component is made of other
          small components, including a map, buttons, menus, and input fields. These smaller
          components are also used in other components. For example, the zone selection menu is
          used in the location component and in the Cover Crop Explorer. By creating and
          utilizing reusable components, we have created a consistent user experience and user
          interface that can be carried over to future Decision Support Tools designed by this
          team.
          <br />
          <br />
          <b>Open Source:</b>
          {' '}
          Once we have completed beta-testing, any developer creating open
          source agricultural technologies requiring functionality that is currently featured in
          the NECCC Species Selector will be able to download our code from GitHub,
          {' '}
          <a
            href="https://aginformaticslab.org/cover-crop-decision-tools/"
            target="_blank"
            rel="noopener noreferrer"
          >
            as described here
          </a>
          , and utilize these components in their projects.
        </Typography>
      );
      case 3:
        return (
          <Typography variant="body1" align="left" className="pb-4">
            This material is based upon work supported by the Northeast Sustainable Agriculture
            Research and Education program (subaward # ENE 16-144), a USDA NIFA postdoctoral
            fellowship (grant # 2016-67012-24711), a NIFA SAS CAP grant (project # NC09873), a
            NIFA OREI grant (project # MD.W-2015-07406), USDA ARS and NRCS, and Purdue University.
          </Typography>
        );
      case 4: return (
        <Typography variant="body1" align="left" gutterBottom>
          For information about the NECCC, the NECCC species selection tool use and data,
          contact: Victoria Ackroyd, NECCC Program Manager, vackroyd AT umd DOT edu.
          <br />
          <br />
          For information about decision support tool design and development of the species
          selector tool, contact: aginformaticslab AT gmail DOT com.
        </Typography>
      );
      case 5: return (
        <>
          <Typography variant="body1" align="left" className="pb-4">
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
      );
      default: return null;
    }
  };

  return (
    <div className="contentWrapper" id="mainContentWrapper">
      <Header logo="neccc_wide_logo_color_web.jpg" />
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

export default About;
