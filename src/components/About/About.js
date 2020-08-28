import React, { Fragment, useEffect, useState } from "react";
import Header from "../Header/header";
import {
  Box,
  Typography,
  Tabs,
  makeStyles,
  Tab,
  Button,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { CustomStyles } from "../../shared/constants";
const tableStyles = {
  td: {
    fontSize: "1em",
    padding: "0.1em",
  },
};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    // height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));
const boxWrapper = {
  paddingBottom: "0px",
  marginBottom: "50px",
  backgroundColor: "rgba(240,247,235,.8)",
  borderRadius: "10px",
  border: "1px solid #598445",
};
const About = (props) => {
  // const [state, dispatch] = useContext(Context);
  const [calcHeight, setCalcHeight] = useState(0);
  const backgroundWrapper = {
    background: `url(${props.bg})`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flexDirection: "column",
    paddingLeft: "0px",
    paddingRight: "0px",
  };
  useEffect(() => {
    let parentDocHeight = document
      .getElementById("mainContentWrapper")
      .getBoundingClientRect().height;
    let headerHeight = document.querySelector("header").getBoundingClientRect()
      .height;

    let calculatedHeight = parentDocHeight - headerHeight;

    setCalcHeight(calculatedHeight);
  }, []);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  // function a11yProps(index) {
  //   return {
  //     id: `vertical-tab-${index}`,
  //     "aria-controls": `vertical-tabpanel-${index}`,
  //   };
  // }
  // function TabPanel(props) {
  //   const { children, value, index, ...other } = props;

  //   return (
  //     <div
  //       role="tabpanel"
  //       hidden={value !== index}
  //       id={`vertical-tabpanel-${index}`}
  //       aria-labelledby={`vertical-tab-${index}`}
  //       {...other}
  //     >
  //       {value === index && (
  //         <Box p={3}>
  //           <Typography variant="body1">{children}</Typography>
  //         </Box>
  //       )}
  //     </div>
  //   );
  // }
  // TabPanel.propTypes = {
  //   children: PropTypes.node,
  //   index: PropTypes.any.isRequired,
  //   value: PropTypes.any.isRequired,
  // };
  return (
    <div className="contentWrapper" id="mainContentWrapper">
      <Header logo="neccc_wide_logo_color_web.jpg" />
      <div className="container-fluid mt-5">
        <div className="row boxContainerRow" style={{ minHeight: "520px" }}>
          <div className="col-12 row">
            <div className="col-md-2 col-12 pr-0">
              <div
                className="d-flex flex-column"
                style={{
                  border: `1px solid ${CustomStyles().darkGreen}`,
                  borderRight: "0px",
                }}
              >
                <Button
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    borderRadius: "0px",
                  }}
                  onClick={() => handleChange(0)}
                  variant={value === 0 ? `contained` : `text`}
                  color={value === 0 ? `secondary` : `default`}
                >
                  Tool History & Purpose
                </Button>
                <Button
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    borderRadius: "0px",
                  }}
                  onClick={() => handleChange(1)}
                  variant={value === 1 ? `contained` : `text`}
                  color={value === 1 ? `secondary` : `default`}
                >
                  Cover Crop Data
                </Button>
                <Button
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    borderRadius: "0px",
                  }}
                  onClick={() => handleChange(2)}
                  variant={value === 2 ? `contained` : `text`}
                  color={value === 2 ? `secondary` : `default`}
                >
                  Tool Design Process
                </Button>
                <Button
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    borderRadius: "0px",
                  }}
                  onClick={() => handleChange(3)}
                  variant={value === 3 ? `contained` : `text`}
                  color={value === 3 ? `secondary` : `default`}
                >
                  Acknowledgements
                </Button>
                <Button
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    borderRadius: "0px",
                  }}
                  onClick={() => handleChange(4)}
                  variant={value === 4 ? `contained` : `text`}
                  color={value === 4 ? `secondary` : `default`}
                >
                  About the Experts
                </Button>
              </div>
            </div>
            <div
              className="col-md-10 col-12 p-2"
              style={{ border: `1px solid ${CustomStyles().darkGreen}` }}
            >
              <div>
                <RenderContent value={value} />
              </div>
            </div>
            {/* <div className={classes.root}>
              <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="About the tool"
                className={classes.tabs}
              >
                <Tab label="Tool History & Purpose" {...a11yProps(0)} />
                <Tab label="Cover Crop Data" {...a11yProps(1)} />
                <Tab label="Tool Design Process" {...a11yProps(2)} />
                <Tab label="Acknowledgements" {...a11yProps(3)} />
                <Tab label="About the Experts" {...a11yProps(4)} />
                <TabPanel value={value} index={0}>
                  A diverse group of stakeholders including farmers,
                  researchers, and personnel from agribusinesses and NGOs united
                  in 2016 to form the Northeast Cover Crops Council (NECCC). Our
                  mission is to support and promote the adoption of cover crops
                  and foster the exchange of information, inspiration, and
                  outcome-based research. Decision support tools are an
                  excellent way to integrate the complexity of climate, soil,
                  and management into recommendation systems. Therefore, we
                  first targeted the development of a species selection tool.
                  This tool provides cover crop species recommendations based on
                  grower USDA hardiness zone and cropping system specifics. Our
                  species selection tool was adapted from the Midwest Cover Crop
                  Council and modified and expanded to target needs of producers
                  in the Northeast. This initiative led to the formation of a
                  Species Selector product team consisting of agronomists,
                  informatics researchers, and developers, as well as four Cover
                  Crop Data Verification teams, consisting of approximately 35
                  NECCC members.
                </TabPanel>
                <TabPanel value={value} index={1}>
                  The data featured in this tool are based on expert opinion.
                  These data represent the collective knowledge and experience
                  of cover crop experts in the Northeast US. Experts, grouped by
                  their USDA hardiness zone, evaluated each cover crop property
                  in the dataset via deliberative discussions in over 70
                  teleconferences. The zones’ decisions on cover crop
                  characteristics, notes regarding nuances and edge/special
                  cases, and framing of ratings were recorded in an online
                  database. A comparative analysis of the data across zones
                  identified areas of inconsistencies which were then addressed
                  in a deliberative intra-regional discussion. This process, in
                  conjunction with feedback from users on the website, ensures
                  the quality and improvement of the data that powers the NECCC
                  Species Selector. You can learn more about the cover crop data
                  verification process here. Data Sources: The cover crop data
                  were adapted from the Midwest Cover Crops Council (MCCC)
                  species selector tool. These initial data have been reviewed,
                  modified, and greatly expanded upon by cover crop experts in
                  the Northeast in each USDA plant hardiness zone to best match
                  the cropping system types, goals, and constraints found in our
                  region. Additional data sources adapted for this tool include
                  the USDA PLANTS database and a seeding rate calculator
                  developed by USDA NRCS. These data are supplemented by soils
                  data available via USDA NRCS Soil Data Access, and weather
                  data made available through an API, constructed by the
                  Precision Sustainable Agriculture team, serving NSSL MRMS and
                  NASA NLDAS-2 weather data. Data Availability: We are in the
                  process of making our data publicly available via a few
                  mechanisms once we have completed beta-testing and finalized
                  data quality checks. In addition to accessing this data via
                  the NECCC Species Selector Tool, users will be able to
                  download the raw data (spreadsheets) and Species Information
                  Sheets (PDFs).
                </TabPanel>
                <TabPanel value={value} index={2}>
                  The NECCC tool is a result of a design collaboration between
                  the Agricultural Informatics Lab, the Precision Sustainable
                  Agriculture team, and the NECCC. We took a user-centered
                  approach to the design of software. In November 2019, we
                  conducted a distributed design sprint (link to lab page stub
                  about this) to develop a prototype of the user interface
                  (shown below). This interface was initially tested with 24
                  potential users at the NECCC annual conference. The tool was
                  subsequently refined and tested with a second round of 20
                  potential users at the Pennsylvania Association for
                  Sustainable Agriculture Conference in February 2020. This
                  design was ultimately refined over the course of the 2020
                  development period, and resulted in the tool you now see on
                  this website. We will be conducting user tests this upcoming
                  fall in conjunction with the train-the trainer sessions run by
                  the NECCC (www.northeastcovercrops.com). [insert GIF of the
                  mockup] Reusability: We designed the user interface components
                  of the Cover Crop Species Selector Tool to be reusable. Each
                  user interface component is composed of smaller components
                  that can be duplicated and used in a variety and multiple
                  contexts. For example the location component is used in two
                  parts of the species selector: the wizard -- the place the
                  user first selects their location, and the green bar -- the
                  place the user can update their location. The location
                  component is made of other small components, including a map,
                  buttons, menus, and input fields. These smaller components are
                  also used in other components. For example, the zone selection
                  menu is used in the location component and in the Cover Crop
                  Explorer. By creating and utilizing reusable components, we
                  have created a consistent user experience and user interface
                  that can be carried over to future Decision Support Tools
                  designed by this team. Open Source: Once we have completed
                  beta-testing, any developer creating open source agricultural
                  technologies requiring functionality that is currently
                  featured in the NECCC Species Selector will be able to
                  download our code from GitHub, as described here, and utilize
                  these components in their projects.
                </TabPanel>
                <TabPanel value={value} index={3}>
                  This material is based upon work supported by the National
                  Institute of Food and Agriculture, U.S. Department of
                  Agriculture, through the Northeast Sustainable Agriculture
                  Research and Education program under subaward number ENE
                  16-144. This work has also been supported by a USDA NIFA
                  postdoctoral fellowship (grant # 2016-67012-24711), NIFA SAS
                  CAP grant (project # NC09873), USDA ARS and NRCS, and Purdue
                  University. Contact Us For information about the NECCC, the
                  NECCC species selection tool use, and the crop data itself,
                  contact: Victoria Ackroyd, NECCC Program Manager,
                  northeastcovercrops AT gmail DOT. com. For information about
                  decision support tool design and development, and the species
                  selector tool itself, contact: aginformaticslab AT gmail DOT
                  com.
                </TabPanel>
                <TabPanel value={value} index={4}>
                  Victoria Ackroyd is Program Manager for the Northeast Cover
                  Crops Council, Assistant Research Scientist in the Dept. of
                  Plant Science & Landscape Architecture at the University of
                  Maryland, and a Visiting Scientist in the USDA ARS Sustainable
                  Agricultural Systems Lab (Beltsville, MD). She previously
                  assisted with the Midwest Cover Crops Council Species Selector
                  Tool and has experience with cover crops in both vegetable and
                  agronomic systems. She led the data verification process for
                  the NECCC Species Selector tool. Rohit Bandooni is a
                  programmer at North Carolina State University. His background
                  is Full Stack Development with a focus on Front End Web
                  Development using modern JavaScript languages. He implemented
                  the cover crop decision support tool. Christian Bench is a
                  farmer and Agriculture Specialist with NJ RC&D and NRCS. He
                  provides leadership in the NJ soil health initiative, cover
                  crop and no-till efforts. He notes that “Armoring the soil and
                  providing an ecosystem below our feet is of utmost importance
                  as we face challenging growing conditions.” Gary Bergstrom,
                  Professor, Plant Pathology and Plant-Microbe Biology Section,
                  Cornell University. Gary reviewed and updated data related to
                  cover crops and cash crop disease. Thomas Bjorkman is a
                  Professor of Veg Crop Physiology in the Horticulture Section
                  at Cornell University. He works on cover crops for weed and
                  soil-quality management goals. Rebecca Brown, Associate
                  Professor, Rhode Island State University. Rebecca works on
                  cover crops for peri-urban vegetable systems. She is
                  particularly interested in identifying which cover crops work
                  or do not work in coastal New England, which is cool summer
                  zone 6. Michel Cavigelli, Soil Scientist, USDA ARS Sustainable
                  Agricultural Systems Lab (Beltsville, MD). Shawnna Clark,
                  Manager/Project leader/Plant Materials Specialist/Field Tech.
                  She works with other NRCS specialists and field office
                  personnel, and landowners, universities, local, state and
                  other fed agencies on soil health and cover crops and many
                  other important Farm Bill Programs. Chad Cochrane, USDA NRCS
                  Resource Conservationist - Agronomy in New Hampshire. Aaron
                  Cooper is an organic grain farmer on the lower Eastern Shore
                  of Maryland. He feels that cover crop planting is essential to
                  his farm to support nutrient cycling and to promote soil
                  health. Heather Darby, Extension Professor: Agronomy
                  Specialist, University of Vermont Extension. Sjoerd Duiker,
                  Professor of Soil Management and Applied Soil Physics, Penn
                  State University. Kaitlin Farbotnik, State Conservation
                  Agronomist and State Grazing Specialist for New Jersey NRCS.
                  Much of her work is spent training the next generation of
                  conservationists and supporting the Soil Conservationists in
                  New Jersey by providing technical information to help them
                  make better conservation decisions while developing
                  conservation plans. Eric Gallandt, Professor of Weed Ecology,
                  University of Maine. Eric assisted in reviewing cover
                  crop/weeds data along with Steven Mirsky, Mark VanGessel, John
                  Wallace, and Dave Wilson. Dale Gates, USDA NRCS New York State
                  Agronomist. Kelly Gill, Senior Pollinator Conservation
                  Specialist, Xerces Society. Kelly reviewed and provided data
                  related to pollinators for the tool. Mark Goodson, USDA NRCS
                  Pennsylvania State Agronomist. Masoud Hashemi, Extension
                  Professor, University of Massachusetts. Dean Hively, Research
                  Soil Scientist, USDA-ARS Hydrology and Remote Sensing
                  Laboratory. Cerruti Hooks, Associate Professor, University of
                  Maryland. Cerruti reviewed and provided data related to
                  insects for the tool. Jim Hyde, State Agronomist in
                  Connecticut, specializing in soil nutrient management and ag
                  waste systems. Zach Larson, Field and Forage Crops Educator,
                  Penn State University Extension. Jason Lilley, Sustainable
                  Agriculture Professional, University of Maine. Rebecca Long,
                  Agriculture and Food Systems Professional, University of Maine
                  Cooperative Extension Oxford County Ellen Mallory, Sustainable
                  Agriculture Extension Specialist and Professor, University of
                  Maine. Carl Majewski, Field Specialist, Food & Agriculture,
                  University of New Hampshire Extension. Hillary Mehl, now at
                  the University of Arizona, reviewed and provided data related
                  to nematodes for the tool. Steven Mirsky is a Research
                  Ecologist in the USDA ARS Sustainable Agricultural Systems Lab
                  (Beltsville, MD). His research program focuses on removing
                  barriers to cover crop adoption and increasing the precision
                  of their use with emphasis on management, breeding, and
                  subsequent agro-ecosystem services. As chair of the NECCC and
                  decision support tool subcommittee (2016 to present), he led
                  the development of the NECCC Species Selector Tool and related
                  tools. Juliet Norton is an Informatics Post-doctoral
                  Researcher in the Agricultural Informatics Lab at Purdue
                  University. Her research explores and addresses
                  information-based barriers to sustainable agricultural
                  practices. She was responsible for the implementation of the
                  data verification process and underlying data structures. She
                  also directed the implementation of the user interface design
                  and ensured that it appropriately represented the cover crop
                  data that powers the tool. Christine O’Reilly, Forage and
                  Grazing Specialist with the Ontario Ministry of Agriculture,
                  Food, and Rural Affairs. Christine reviewed and provided data
                  related to cover crops as feed/forage for the tool. Ankita
                  Raturi is an Assistant Professor in Agricultural Engineeering
                  at Purdue University. She runs the Agricultural Informatics
                  Lab, with research focused on human-centered design,
                  information modeling, and software engineering, for increased
                  resilience in food and agricultural systems. She led the
                  design and development of the NECCC Species selector tool,
                  co-designed the underlying data verification process and
                  underlying crop information model. Scott Raubenstein, Vice
                  President, Agricultural Services, Perdue AgriBusinesses.
                  Lindsey Ruhl, Research Specialist for University of Vermont
                  Extension Services. Paul Salon was formerly with USDA-NRCS at
                  the Big Flats Plant Materials Center as Research Agronomist
                  and Plant Materials Specialist covering Northeast states and
                  with the National Soil Health Division as a Soil Health
                  Specialist covering the Mid-Atlantic region. He was the
                  primary architect of a cover crop mix seeding calculator
                  currently under further development by the NECCC. Brandon
                  Smith, USDA NRCS Northeast Regional Team Leader. Mark
                  VanGessel, Extension Weed Specialist at University of
                  Delaware. Anne Verhallen, Soil Management Specialist in
                  Horticulture at Ridgetown, Ontario Ministry of Agriculture,
                  Food, and Rural Affairs. John Wallace, Assistant Professor of
                  Weed Science, Penn State University. Nicholas Warren, Research
                  Scientist and graduate student in the University of New
                  Hampshire’s Agroecology Lab (Richard Smith). Dave Wilson is an
                  Agronomist, Field and Forage Crops Extension Educator with
                  Penn State Extension in Berks County, PA. Dave has worked as a
                  research agronomist in field crops, cover crops, forages,
                  pasture management, grazing, soil health, farming rotations
                  and organic farming systems. Dave's background includes dairy
                  farming, maize breeding, certified hybrid corn production,
                  certified soybean and small grain production and agricultural
                  pesticide research. His prior experience includes conducting
                  research evaluating new species and varieties for use in
                  forage systems and as cover crops. Kirsten Workman, Agronomy
                  Specialist and Certified Crop Adviser for University of
                  Vermont Extension. She works directly with farmers on
                  implementing conservation agronomy on their farms, focusing on
                  soil health, nutrient management and water quality. She also
                  engages in on-farm research focused on cover crops, especially
                  in dairy cropping systems.
                </TabPanel>
              </Tabs>
            </div> */}
          </div>
        </div>
      </div>

      {/* <div
        className="aboutWrapper"
        style={{
          width: "100%",
          minHeight: calcHeight,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "url(/images/cover-crop-field.png)",
          backgroundSize: "cover",
        }}
      >
        <div
          className="innerAboutWrapper"
          style={{
            width: "95%",
            margin: "0 auto",
            backgroundColor: "rgba(240,247,235,.8)",
            border: "1px solid #598445",
            borderRadius: "10px",
            padding: "1em",
          }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 pb-2">
                <Typography variant="h4" align="center">
                  About
                </Typography>
              </div>
              <div className="col-12">
                <Typography variant="body1">
                  We are a group of researchers and outreach experts from
                  universities, government agencies and NGOs, and industry
                  dedicated to increasing the sustainability of US cropping
                  systems.The Cover Crop Tools was designed and developed by a
                  Product Team with members from the{" "}
                  <a
                    href="http://sudokita.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Agricultural Informatics Lab
                  </a>{" "}
                  and the{" "}
                  <a
                    href="//precisionsustainableag.org"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Precision Sustainable Agriculture
                  </a>{" "}
                  team at USDA ARS, NC State, and Purdue University. The Cover
                  Crop Dataset has been assembled by six teams of cover crop
                  experts (one for each plant hardiness zone in the northeastern
                  United States) from the
                  <a
                    href="http://northeastcovercrops.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    Northeast Cover Crops Council
                  </a>
                  .
                  <br />
                </Typography>
              </div>
              <div className="col-12">
                <table className="table table-hover table-striped mt-2">
                  <thead className="thead-dark">
                    <tr>
                      <th style={tableStyles.td}>
                        <Typography variant="body1">Team</Typography>
                      </th>
                      <th style={tableStyles.td}>
                        <Typography variant="body1">Members</Typography>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={tableStyles.td}>
                        <Typography variant="body1">Product</Typography>
                      </td>
                      <td style={tableStyles.td}>
                        <Typography variant="body1">
                          {" "}
                          Ankita Raturi, Victoria Ackroyd, Juliet Norton, Rohit
                          Bandooni, Paul Salon, Steven Mirsky
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td style={tableStyles.td}>
                        <Typography variant="body1">Zone 7</Typography>
                      </td>
                      <td style={tableStyles.td}>
                        <Typography variant="body1">
                          {" "}
                          Mark VanGessel, Scott Raubenstein, Nevin Dawson, Aaron
                          Cooper, Dean Hively, Steven Mirsky, Michel Cavigelli
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td style={tableStyles.td}>
                        <Typography variant="body1">Zone 6</Typography>
                      </td>
                      <td style={tableStyles.td}>
                        <Typography variant="body1">
                          Sjoerd Duiker, John Wallace, Jim Hyde, Rebecca Brown,
                          Zach Larson, Dave Wilson, Megan Chawner, Christian
                          Bench, Kaitlin Farbotnik, Mark Goodson
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td style={tableStyles.td}>
                        <Typography variant="body1">Zone 5</Typography>
                      </td>
                      <td style={tableStyles.td}>
                        <Typography variant="body1">
                          Thomas Bjorkman, Kirsten Workman, Shawnna Clark, Dorn
                          Cox, Mark Goodson, Anne Verhallen
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td style={tableStyles.td}>
                        <Typography variant="body1">Zone 4</Typography>
                      </td>
                      <td style={tableStyles.td}>
                        <Typography variant="body1">
                          Heather Darby, Jason Lilley, Natalie Lounsbury,
                          Lindsey Ruhl, Derek Hines, Rebecca Long, Ellen
                          Mallory, John Chartier, Kirsten Workman
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td style={tableStyles.td}>
                        <Typography variant="body1">Zone 2 &amp; 3</Typography>
                      </td>
                      <td style={tableStyles.td}>
                        <Typography variant="body1">TBD.</Typography>
                      </td>
                    </tr>
                    <tr>
                      <td style={tableStyles.td}>
                        <Typography variant="body1">
                          Misc. Participants
                        </Typography>
                      </td>
                      <td style={tableStyles.td}>
                        <Typography variant="body1">
                          Brandon Smith, Linda Yeung, Masoud Hashemi, Kate Tully
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td style={tableStyles.td}>
                        <Typography variant="body1">
                          External Data Sources
                        </Typography>
                      </td>
                      <td style={tableStyles.td}>
                        <Typography variant="body1">
                          The NECCC dataset was built on data sourced from the{" "}
                          <a href="http://mccc.msu.edu" target="_blank">
                            Midwestern Cover Crops Council
                          </a>
                          ,{" "}
                          <a href="https://plants.usda.gov/java/">
                            USDA PLANTS database
                          </a>
                          , and the{" "}
                          <a href="//itis.gov" target="_blank">
                            Integrated Taxonomic Information Service
                          </a>
                          .
                        </Typography>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-12">
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  This material is based upon work supported by:
                </Typography>
                <ol>
                  <li>
                    <Typography variant="body1">
                      The National Institute of Food and Agriculture, U.S.
                      Department of Agriculture, through the Northeast
                      Sustainable Agriculture Research and Education program
                      under subaward number ENE16-144,
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Post-doctoral Fellowship number 2016-67012-24711 and other
                      awards from the USDA National Institute of Food and
                      Agriculture,
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      The U.S. Department of Agriculture Natural Resources
                      Conservation Service.
                    </Typography>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
  // return (
  //   <Fragment>
  //     <Header logo="neccc_wide_logo_color_web.jpg" />

  //     <Box>
  //       <aside
  //         className="landingWrapper"
  //         style={{
  //           background: 'url("/images/cover-crop-field.png") 0% 0% / cover',
  //         }}
  //       >
  //         <div className="boxWrapper">
  //           <aside className="text-left">
  //             <h2>About</h2>
  //             <p>
  //               We are a group of researchers and outreach experts from
  //               universities, government agencies and NGOs, and industry
  //               dedicated to increasing the sustainability of US cropping
  //               systems.The Cover Crop Tools was designed and developed by a
  //               Product Team with members from the{" "}
  //               <a href="http://sudokita.com" target="_blank" rel="noreferrer">
  //                 Agricultural Informatics Lab
  //               </a>{" "}
  //               and the{" "}
  //               <a
  //                 href="//precisionsustainableag.org"
  //                 target="_blank"
  //                 rel="noreferrer"
  //               >
  //                 Precision Sustainable Agriculture
  //               </a>{" "}
  //               team at USDA ARS, NC State, and Purdue University. The Cover
  //               Crop Dataset has been assembled by six teams of cover crop
  //               experts (one for each plant hardiness zone in the northeastern
  //               United States) from the
  //               <a
  //                 href="http://northeastcovercrops.com"
  //                 target="_blank"
  //                 rel="noreferrer"
  //               >
  //                 {" "}
  //                 Northeast Cover Crops Council
  //               </a>
  //               .
  //               <br />
  // <table className="table table-hover table-striped mt-2">
  //   <thead className="thead-dark">
  //     <tr>
  //       <th style={tableStyles.td}>Team</th>
  //       <th style={tableStyles.td}>Members</th>
  //     </tr>
  //   </thead>
  //   <tbody>
  //     <tr>
  //       <td style={tableStyles.td}>Product</td>
  //       <td style={tableStyles.td}>
  //         Ankita Raturi, Victoria Ackroyd, Juliet Norton, Rohit
  //         Bandooni, Paul Salon, Steven Mirsky
  //       </td>
  //     </tr>
  //     <tr>
  //       <td style={tableStyles.td}>Zone 7</td>
  //       <td style={tableStyles.td}>
  //         Mark VanGessel, Scott Raubenstein, Nevin Dawson, Aaron
  //         Cooper, Dean Hively, Steven Mirsky, Michel Cavigelli
  //       </td>
  //     </tr>
  //     <tr>
  //       <td style={tableStyles.td}>Zone 6</td>
  //       <td style={tableStyles.td}>
  //         Sjoerd Duiker, John Wallace, Jim Hyde, Rebecca Brown,
  //         Zach Larson, Dave Wilson, Megan Chawner, Christian
  //         Bench, Kaitlin Farbotnik, Mark Goodson
  //       </td>
  //     </tr>
  //     <tr>
  //       <td style={tableStyles.td}>Zone 5</td>
  //       <td style={tableStyles.td}>
  //         Thomas Bjorkman, Kirsten Workman, Shawnna Clark, Dorn
  //         Cox, Mark Goodson, Anne Verhallen
  //       </td>
  //     </tr>
  //     <tr>
  //       <td style={tableStyles.td}>Zone 4</td>
  //       <td style={tableStyles.td}>
  //         Heather Darby, Jason Lilley, Natalie Lounsbury, Lindsey
  //         Ruhl, Derek Hines, Rebecca Long, Ellen Mallory, John
  //         Chartier, Kirsten Workman
  //       </td>
  //     </tr>
  //     <tr>
  //       <td style={tableStyles.td}>Zone 2 &amp; 3</td>
  //       <td style={tableStyles.td}>TBD.</td>
  //     </tr>
  //     <tr>
  //       <td style={tableStyles.td}>Misc. Participants</td>
  //       <td style={tableStyles.td}>
  //         Brandon Smith, Linda Yeung, Masoud Hashemi, Kate Tully
  //       </td>
  //     </tr>
  //     <tr>
  //       <td style={tableStyles.td}>External Data Sources</td>
  //       <td style={tableStyles.td}>
  //         The NECCC dataset was built on data sourced from the{" "}
  //         <a href="http://mccc.msu.edu" target="_blank">
  //           Midwestern Cover Crops Council
  //         </a>
  //         ,{" "}
  //         <a href="https://plants.usda.gov/java/">
  //           USDA PLANTS database
  //         </a>
  //         , and the{" "}
  //         <a href="//itis.gov" target="_blank">
  //           Integrated Taxonomic Information Service
  //         </a>
  //         .
  //       </td>
  //     </tr>
  //   </tbody>
  // </table>
  //             </p>
  //             <p>
  //               <b className="mt-2">
  //                 This material is based upon work supported by:
  //               </b>
  //               <ol>
  //                 <li>
  //                   The National Institute of Food and Agriculture, U.S.
  //                   Department of Agriculture, through the Northeast Sustainable
  //                   Agriculture Research and Education program under subaward
  //                   number ENE16-144,
  //                 </li>
  //                 <li>
  //                   Post-doctoral Fellowship number 2016-67012-24711 and other
  //                   awards from the USDA National Institute of Food and
  //                   Agriculture,
  //                 </li>
  //                 <li>
  //                   The U.S. Department of Agriculture Natural Resources
  //                   Conservation Service.
  //                 </li>
  //               </ol>
  //             </p>
  //             <p></p>
  //           </aside>
  //         </div>
  //       </aside>
  //     </Box>
  //   </Fragment>
  // );
};

export default About;

const RenderContent = ({ value = 0 }) => {
  switch (value) {
    case 0:
      return (
        <Typography variant="body1" align="left">
          A diverse group of stakeholders including farmers, researchers, and
          personnel from agribusinesses and NGOs united in 2016 to form the{" "}
          <a href="http://northeastcovercrops.com" target="_blank">
            Northeast Cover Crops Council
          </a>{" "}
          (NECCC). Our mission is to support and promote the adoption of cover
          crops and foster the exchange of information, inspiration, and
          outcome-based research. Decision support tools are an excellent way to
          integrate the complexity of climate, soil, and management into
          recommendation systems. Therefore, we first targeted the development
          of a species selection tool. This tool provides cover crop species
          recommendations based on grower USDA hardiness zone and cropping
          system specifics. Our species selection tool was adapted from the
          Midwest Cover Crop Council and modified and expanded to target needs
          of producers in the Northeast. This initiative led to the formation of
          a Species Selector product team consisting of agronomists, informatics
          researchers, and developers, as well as four Cover Crop Data
          Verification teams, consisting of approximately 35 NECCC members.
        </Typography>
      );
    case 1:
      return (
        <Fragment>
          <Typography variant="body1" align="left" className="pb-4">
            The data featured in this tool are based on expert opinion. These
            data represent the collective knowledge and experience of cover crop
            experts in the Northeast US. Experts, grouped by their USDA
            hardiness zone, evaluated each cover crop property in the dataset
            via deliberative discussions in over 70 teleconferences. The zones’
            decisions on cover crop characteristics, notes regarding nuances and
            edge/special cases, and framing of ratings were recorded in an
            online database. A comparative analysis of the data across zones
            identified areas of inconsistencies which were then addressed in a
            deliberative intra-regional discussion. This process, in conjunction
            with feedback from users on the website, ensures the quality and
            improvement of the data that powers the NECCC Species Selector. You
            can learn more about the cover crop data verification process here.
          </Typography>
          <Typography variant="body1" align="left" className="pb-4">
            <b>Data Sources:</b> The cover crop data were adapted from the{" "}
            <a href="http://mccc.msu.edu" target="_blank">
              Midwest Cover Crops Council (MCCC) species selector tool
            </a>
            . These initial data have been reviewed, modified, and greatly
            expanded upon by cover crop experts in the Northeast in each{""}
            <a
              href="https://planthardiness.ars.usda.gov/PHZMWeb/"
              target="_blank"
            >
              USDA plant hardiness zone
            </a>{" "}
            to best match the cropping system types, goals, and constraints
            found in our region. Additional data sources adapted for this tool
            include the{" "}
            <a href="https://plants.sc.egov.usda.gov/java/" target="_blank">
              USDA PLANTS database
            </a>{" "}
            and a seeding rate calculator developed by USDA NRCS. These data are
            supplemented by soils data available via{" "}
            <a href="https://sdmdataaccess.nrcs.usda.gov/" target="_blank">
              USDA NRCS Soil Data Access
            </a>
            , and weather data made available through an API, constructed by the
            Precision Sustainable Agriculture team, serving{" "}
            <a href="https://www.nssl.noaa.gov/projects/mrms/" target="_blank">
              NSSL MRMS
            </a>{" "}
            and{" "}
            <a href="https://ldas.gsfc.nasa.gov/nldas/" target="_blank">
              NASA NLDAS-2
            </a>{" "}
            weather data.
          </Typography>
          <Typography variant="body1" align="left" className="pb-4">
            <b>Data Availability:</b> We are in the process of making our data
            publicly available via a few mechanisms once we have completed
            beta-testing and finalized data quality checks. In addition to
            accessing this data via the NECCC Species Selector Tool, users will
            be able to download the raw data (spreadsheets) and Species
            Information Sheets (PDFs).
          </Typography>
        </Fragment>
      );

    case 2:
      return (
        <Fragment>
          <Typography variant="body1" className="pb-4" align="left">
            The NECCC tool is a result of a design collaboration between the{" "}
            <a href="http://www.aginformaticslab.org" target="_blank">
              Agricultural Informatics Lab
            </a>
            , the{" "}
            <a href="http://www.precisionsustainableag.org" target="_blank">
              Precision Sustainable Agriculture
            </a>{" "}
            team, and the NECCC. We took a user-centered approach to the design
            of software. In November 2019, we conducted a distributed design
            sprint (link to lab page stub about this) to develop a prototype of
            the user interface (shown below). This interface was initially
            tested with 24 potential users at the NECCC annual conference. The
            tool was subsequently refined and tested with a second round of 20
            potential users at the Pennsylvania Association for Sustainable
            Agriculture Conference in February 2020. This design was ultimately
            refined over the course of the 2020 development period, and resulted
            in the tool you now see on this website. We will be conducting user
            tests this upcoming fall in conjunction with the train-the trainer
            sessions run by the NECCC (
            <a href="http://www.northeastcovercrops.com" target="_blank">
              www.northeastcovercrops.com
            </a>
            ).
          </Typography>
          <Typography variant="body1" className="pb-4" align="left">
            <b>Reusability:</b> We designed the user interface components of the
            Cover Crop Species Selector Tool to be reusable. Each user interface
            component is composed of smaller components that can be duplicated
            and used in a variety and multiple contexts. For example the
            location component is used in two parts of the species selector: the
            wizard -- the place the user first selects their location, and the
            green bar -- the place the user can update their location. The
            location component is made of other small components, including a
            map, buttons, menus, and input fields. These smaller components are
            also used in other components. For example, the zone selection menu
            is used in the location component and in the Cover Crop Explorer. By
            creating and utilizing reusable components, we have created a
            consistent user experience and user interface that can be carried
            over to future Decision Support Tools designed by this team.
          </Typography>
          <Typography variant="body1" className="pb-4" align="left">
            <b>Open Source:</b> Once we have completed beta-testing, any
            developer creating open source agricultural technologies requiring
            functionality that is currently featured in the NECCC Species
            Selector will be able to download our code from GitHub, as described
            here, and utilize these components in their projects.
          </Typography>
        </Fragment>
      );
    case 3:
      return (
        <Fragment>
          <Typography variant="h5" align="left" gutterBottom>
            Many Thanks to Our Funders
          </Typography>
          <Typography variant="body1" align="left" className="pb-4">
            This material is based upon work supported by the National Institute
            of Food and Agriculture, U.S. Department of Agriculture, through the
            Northeast Sustainable Agriculture Research and Education program
            under subaward number ENE 16-144. This work has also been supported
            by a USDA NIFA postdoctoral fellowship (grant # 2016-67012-24711),
            NIFA SAS CAP grant (project # NC09873), USDA ARS and NRCS, and
            Purdue University.
          </Typography>
          <Typography variant="h6" align="left" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" align="left" className="pb-4">
            For information about the NECCC, the NECCC species selection tool
            use, and the crop data itself, contact: Victoria Ackroyd, NECCC
            Program Manager, northeastcovercrops AT gmail DOT. com. For
            information about decision support tool design and development, and
            the species selector tool itself, contact: aginformaticslab AT gmail
            DOT com.
          </Typography>
        </Fragment>
      );
    case 4:
      return (
        <Fragment>
          <Typography variant="body1" align="left" className="pb-4">
            <p>
              <b>Victoria Ackroyd </b>
              <span>
                is Program Manager for the Northeast Cover Crops Council,
                Assistant Research Scientist in the Dept. of Plant Science &amp;
                Landscape Architecture at the University of Maryland, and a
                Visiting Scientist in the USDA ARS Sustainable Agricultural
                Systems Lab (Beltsville, MD). She previously assisted with the
                Midwest Cover Crops Council Species Selector Tool and has
                experience with cover crops in both vegetable and agronomic
                systems. She led the data verification process for the NECCC
                Species Selector tool.
              </span>
            </p>
            <p></p>
            <p>
              <b>Rohit Bandooni </b>
              <span>
                is a programmer at North Carolina State University.
              </span>{" "}
              <span>
                His background is Full Stack Development with a focus on Front
                End Web Development using modern JavaScript languages.
              </span>{" "}
              <span>
                He implemented the cover crop decision support tool.&nbsp;
              </span>
            </p>
            <p></p>
            <p>
              <b>Christian Bench</b>{" "}
              <span>
                is a farmer and Agriculture Specialist with NJ RC&amp;D and
                NRCS. He provides leadership in the NJ soil health initiative,
                cover crop and no-till efforts. He notes that &ldquo;Armoring
                the soil and providing an ecosystem below our feet is of utmost
                importance as we face challenging growing conditions.&rdquo;
              </span>
            </p>

            <p>
              <b>Gary Bergstrom</b>
              <span>
                , Professor, Plant Pathology and Plant-Microbe Biology Section,
                Cornell University. Gary reviewed and updated data related to
                cover crops and cash crop disease.
              </span>
            </p>
            <p></p>
            <p>
              <b>Thomas Bjorkman </b>
              <span>
                is a Professor of Veg Crop Physiology in the Horticulture
                Section at Cornell University. He works on cover crops for weed
                and soil-quality management goals.
              </span>
            </p>
            <p></p>
            <p>
              <b>Rebecca Brown</b>
              <span>
                , Associate Professor, Rhode Island State University. Rebecca
                works on cover crops for peri-urban vegetable systems. She is
                particularly interested in identifying which cover crops work or
                do not work in coastal New England, which is cool summer zone 6.
              </span>
            </p>
            <p></p>
            <p>
              <b>Michel Cavigelli</b>
              <span>
                , Soil Scientist, USDA ARS Sustainable Agricultural Systems Lab
                (Beltsville, MD).
              </span>
            </p>
            <p></p>
            <p>
              <b>Shawnna Clark</b>
              <span>
                , Manager/Project leader/Plant Materials Specialist/Field Tech.
                She works with other NRCS specialists and field office
                personnel, and landowners, universities, local, state and other
                fed agencies on soil health and cover crops and many other
                important Farm Bill Programs.
              </span>
            </p>
            <p></p>
            <p>
              <b>Chad Cochrane</b>
              <span>
                , USDA NRCS Resource Conservationist - Agronomy in New
                Hampshire.
              </span>
            </p>
            <p></p>
            <p>
              <b>Aaron Cooper </b>
              <span>
                is an organic grain farmer on the lower Eastern Shore of
                Maryland. He feels that cover crop planting is essential to his
                farm to support nutrient cycling and to promote soil health.
              </span>
            </p>
            <p></p>
            <p>
              <b>Heather Darby</b>
              <span>
                , Extension Professor: Agronomy Specialist, University of
                Vermont Extension.
              </span>
            </p>
            <p></p>
            <p>
              <b>Sjoerd Duiker</b>
              <span>
                , Professor of Soil Management and Applied Soil Physics, Penn
                State University.
              </span>
            </p>
            <p></p>
            <p>
              <b>Kaitlin Farbotnik</b>
              <span>
                , State Conservation Agronomist and State Grazing Specialist for
                New Jersey NRCS. Much of her work is spent training the next
                generation of conservationists and supporting the Soil
                Conservationists in New Jersey by providing technical
                information to help them make better conservation decisions
                while developing conservation plans.&nbsp;
              </span>
            </p>
            <p></p>
            <p>
              <b>Eric Gallandt</b>
              <span>
                , Professor of Weed Ecology, University of Maine. Eric assisted
                in reviewing cover crop/weeds data along with Steven Mirsky,
                Mark VanGessel, John Wallace, and Dave Wilson.
              </span>
            </p>
            <p></p>
            <p>
              <b>Dale Gates</b>
              <span>, USDA NRCS New York State Agronomist.</span>
            </p>
            <p></p>
            <p>
              <b>Kelly Gill</b>
              <span>
                , Senior Pollinator Conservation Specialist, Xerces Society.
                Kelly reviewed and provided data related to pollinators for the
                tool.
              </span>
            </p>
            <p></p>
            <p>
              <b>Mark Goodson</b>
              <span>, USDA NRCS Pennsylvania State Agronomist.</span>
            </p>
            <p></p>
            <p>
              <b>Masoud Hashemi</b>
              <span>
                , Extension Professor, University of Massachusetts.&nbsp;
              </span>
            </p>
            <p>
              <b>Dean Hively</b>
              <span>
                , Research Soil Scientist, USDA-ARS Hydrology and Remote Sensing
                Laboratory.
              </span>
            </p>
            <p></p>
            <p>
              <b>Cerruti Hooks</b>
              <span>
                , Associate Professor, University of Maryland. Cerruti reviewed
                and provided data related to insects for the tool.&nbsp;
              </span>
            </p>
            <p></p>
            <p>
              <b>Jim Hyde</b>
              <span>
                , State Agronomist in Connecticut, specializing in soil nutrient
                management and ag waste systems.&nbsp;
              </span>
            </p>
            <p></p>
            <p>
              <b>Zach Larson</b>
              <span>
                , Field and Forage Crops Educator, Penn State University
                Extension.
              </span>
            </p>
            <p></p>
            <p>
              <b>Jason Lilley</b>
              <span>,</span>{" "}
              <span>
                Sustainable Agriculture Professional, University of Maine.
              </span>
            </p>
            <p></p>
            <p>
              <b>Rebecca Long</b>
              <span>
                , Agriculture and Food Systems Professional, University of Maine
                Cooperative Extension Oxford County
              </span>
            </p>
            <p></p>
            <p>
              <b>Ellen Mallory</b>
              <span>
                , Sustainable Agriculture Extension Specialist and Professor,
                University of Maine.
              </span>
            </p>
            <p></p>
            <p>
              <b>Carl Majewski</b>
              <span>
                , Field Specialist, Food &amp; Agriculture, University of New
                Hampshire Extension.
              </span>
            </p>
            <p></p>
            <p>
              <b>Hillary Mehl</b>
              <span>
                , now at the University of Arizona, reviewed and provided data
                related to nematodes for the tool.&nbsp;
              </span>
            </p>
            <p></p>
            <p>
              <b>Steven Mirsky </b>
              <span>
                is a Research Ecologist in the USDA ARS Sustainable Agricultural
                Systems Lab (Beltsville, MD). His research program focuses on
                removing barriers to cover crop adoption and increasing the
                precision of their use with emphasis on management, breeding,
                and subsequent agro-ecosystem services. As chair of the NECCC
                and decision support tool subcommittee (2016 to present), he led
                the development of the NECCC Species Selector Tool and related
                tools.
              </span>
            </p>
            <p></p>
            <p>
              <b>Juliet Norton </b>
              <span>
                is an Informatics Post-doctoral Researcher in the Agricultural
                Informatics Lab at Purdue University. Her research explores and
                addresses information-based barriers to sustainable agricultural
                practices. She was responsible for the implementation of the
                data verification process and underlying data structures. She
                also directed the implementation of the user interface design
                and ensured that it appropriately represented the cover crop
                data that powers the tool.&nbsp;
              </span>
            </p>
            <p></p>
            <p>
              <b>Christine O&rsquo;Reilly</b>
              <span>
                , Forage and Grazing Specialist with the Ontario Ministry of
                Agriculture, Food, and Rural Affairs. Christine reviewed and
                provided data related to cover crops as feed/forage for the
                tool.
              </span>
            </p>
            <p></p>
            <p>
              <b>Ankita Raturi </b>
              <span>
                is an Assistant Professor in Agricultural Engineeering at Purdue
                University. She runs the{" "}
              </span>
              <a href="http://sudokita.com">
                <span>Agricultural Informatics Lab</span>
              </a>
              <span>
                , with research focused on human-centered design, information
                modeling, and software engineering, for increased resilience in
                food and agricultural systems. She led the design and
                development of the NECCC Species selector tool, co-designed the
                underlying data verification process and underlying crop
                information model.
              </span>
            </p>
            <p></p>
            <p>
              <b>Scott Raubenstein</b>
              <span>
                , Vice President, Agricultural Services, Perdue
                AgriBusinesses.&nbsp;
              </span>
            </p>
            <p></p>
            <p>
              <b>Lindsey Ruhl</b>
              <span>
                , Research Specialist for University of Vermont Extension
                Services.&nbsp;
              </span>
            </p>
            <p></p>
            <p>
              <b>Paul Salon </b>
              <span>
                was formerly with USDA-NRCS at the Big Flats Plant Materials
                Center as Research Agronomist and Plant Materials Specialist
                covering Northeast states and with the National Soil Health
                Division as a Soil Health Specialist covering the Mid-Atlantic
                region. He was the primary architect of a cover crop mix seeding
                calculator currently under further development by the NECCC.
              </span>
            </p>
            <p></p>
            <p>
              <b>Brandon Smith</b>
              <span>, USDA NRCS Northeast Regional Team Leader.</span>
            </p>
            <p></p>
            <p>
              <b>Mark VanGessel</b>
              <span>
                , Extension Weed Specialist at University of Delaware.
              </span>
            </p>
            <p></p>
            <p>
              <b>Anne Verhallen</b>
              <span>
                , Soil Management Specialist in Horticulture at Ridgetown,
                Ontario Ministry of Agriculture, Food, and Rural Affairs.
              </span>
            </p>
            <p></p>
            <p>
              <b>John Wallace</b>
              <span>
                , Assistant Professor of Weed Science, Penn State
                University.&nbsp;
              </span>
            </p>
            <p></p>
            <p>
              <b>Nicholas Warren</b>
              <span>
                , Research Scientist and graduate student in the University of
                New Hampshire&rsquo;s Agroecology Lab (Richard Smith).&nbsp;
              </span>
            </p>
            <p></p>
            <p>
              <b>Dave Wilson</b>
              <span>
                {" "}
                is an Agronomist, Field and Forage Crops Extension Educator with
                Penn State Extension in Berks County, PA. Dave has worked as a
                research agronomist in field crops, cover crops, forages,
                pasture management, grazing, soil health, farming rotations and
                organic farming systems. Dave's background includes dairy
                farming, maize breeding, certified hybrid corn production,
                certified soybean and small grain production and agricultural
                pesticide research. His prior experience includes conducting
                research evaluating new species and varieties for use in forage
                systems and as cover crops.
              </span>
            </p>
            <p>
              <br />
              <b>Kirsten Workman, </b>
              <span>
                Agronomy Specialist and Certified Crop Adviser for University of
                Vermont Extension. She works directly with farmers on
                implementing conservation agronomy on their farms, focusing on
                soil health, nutrient management and water quality. She also
                engages in on-farm research focused on cover crops, especially
                in dairy cropping systems.
              </span>
            </p>
          </Typography>
        </Fragment>
      );
    default: {
      return <Typography variant="body1"></Typography>;
    }
  }
};
