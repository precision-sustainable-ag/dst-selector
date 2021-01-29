/*
  This file contains the HelpComponent, helper functions, and styles
  The HelpComponent is a static  help page that has FAQ, how to use, data dictionary, and information sheets
  RenderContent contains all the text listed in the about section
*/

import React, { useState, useEffect, Fragment } from "react";
import Header from "../Header/header";
import {
  Typography,
  Button,
  useTheme,
  isWidthDown,
  isWidthUp,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import InformationSheetDictionary from "../InformationSheet/InformationSheetDictionary";
import { CustomStyles } from "../../shared/constants";

const HelpComponent = (props) => {
  useEffect(() => {
    document.title = "Help Page";
  }, []);

  // const theme = useTheme();
  // const styles = theme =>({
  //   boxContainerStyle:{
  //   minHeight: "520px",
  //   [theme.breakpoints.down("md")]: {
  //     width: "100%",
  //     margin: "auto",
  //     padding: "initial",
  //   },
  // }
  // });
  // console.log(isWidthUp("xl"));
  const resizeIframe = (obj) => {
    obj.style.height =
      obj.contentWindow.document.documentElement.scrollHeight + "px";
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div className="contentWrapper">
      <Header />
      <div className="container-fluid mt-5">
        <div
          className="row boxContainerRow"
          style={
            // isWidthDown("md")
            // ? { minHeight: "520px", width: "100%", padding: "initial" }
            // : { minHeight: "520px" }
            { minHeight: "520px" }
          }
        >
          <div className="col-12 row">
            <div className="col-lg-4 col-12 px-0">
              <div
                className="d-flex flex-column pb-2"
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
                  How to Use the NECCC Species Selector Tool
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
                  Frequently Asked Questions
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
                  Data Dictionary
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
                  Information Sheets
                </Button>
              </div>
            </div>
            <div
              className="col-lg-8 col-12 p-2"
              style={{
                overflow: "hidden",
                border: `1px solid ${CustomStyles().darkGreen}`,
              }}
            >
              <div>
                <RenderContent value={value} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpComponent;

const RenderContent = ({ value = 0 }) => {
  switch (value) {
    case 0:
      return (
        <Fragment>
          <Typography variant="h4" gutterBottom>
            How to Use The Tool
          </Typography>
          <Typography component="div" variant="body1" align="left" gutterBottom>
            <iframe
              src="https://docs.google.com/presentation/d/e/2PACX-1vQbP5BcX8_u7bEfHjmAyUoSGeO3yVJkwbEveqSCh2xMn2M_f_EFp6kTi_5kvtp4S7zLITHXdkHEftPC/embed?start=false&loop=false&delayms=60000"
              frameborder="0"
              width="100%"
              height="474"
              allowfullscreen="true"
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
            ></iframe>
          </Typography>
          <Typography component="div" variant="body1" align="left">
            <ol>
              <li className="font-weight-bold">
                Start with the Species Selector Wizard
              </li>
              <ul className="pb-3">
                <li>Define your location:</li>
                <ul>
                  <li>
                    Enter your location so we can identify your zone and pin
                    your location on the map. Please note that we do not store
                    your data, meaning that once you leave our website, your
                    instance closes, and any data you provided is not retained.
                  </li>
                  <li>
                    Draw an outline of the field you plan to cover crop so we
                    can auto populate your local soils and weather data.
                  </li>
                </ul>
                <li>Refine your soils data:</li>
                <ul>
                  <li>
                    Review your local soils data, populated from the NRCS Web
                    Soil Survey, or provide your own data if you did not draw an
                    outline of your field.
                  </li>
                  <li>
                    Specify if you have tiling -- tiling will affect your
                    drainage class.
                  </li>
                  <li>Your soils data is used to filter your results.</li>
                </ul>
                <li>Refine your weather data:</li>
                <ul>
                  <li>
                    Review your local weather data, populated from the Precision
                    Sustainable Agriculture Weather API, or provide your own
                    data if you did not specify a location.
                  </li>
                  <li>
                    At this time, we are not using your historical weather data
                    to filter results. We ask you to specify your weather data
                    so that it is fresh in your mind when you choose your cover
                    crops. Cover crop performance in this tool is based on an
                    "average" year. Performance in years that are notably
                    hotter, colder, wetter, drier, or combinations thereof may
                    vary.
                  </li>
                </ul>
                <li>Choose your goals</li>
                <ul>
                  <li>
                    Specify up to three cover cropping goals in order of
                    priority.
                  </li>
                  <li>
                    The list of recommended cover crop species will be filtered
                    based on these goals.
                  </li>
                </ul>
              </ul>
              <li className="font-weight-bold">
                Add cover crops to My Cover Crop List
              </li>
              <ul className="pb-3">
                <li>
                  Filter your results by additional requirements, if desired
                </li>
                <li>
                  Look at the calendar view for details on planting dates on
                  active growth periods.
                </li>
                <li>
                  Click “View Details” to review all of our data on the cover
                  crop of interest.
                </li>
                <li>
                  If the cover crop is one you would like to consider, add it to
                  your cover crop list.
                </li>
              </ul>
              <li className="font-weight-bold">
                Download spreadsheets or PDFs of your cover crops
              </li>
              <ul className="pb-3">
                <li>
                  View your cover crop list to remove cover crops or download a
                  PDF or spreadsheet of the cover crop list you have curated.
                </li>
              </ul>
              <li className="font-weight-bold">Visit the Explorer</li>
              <ul className="pb-3">
                <li>
                  At any point in your experience you can use the Explorer to
                  filter through and search for any cover crop in our data set.
                </li>
                <li>
                  You need to specify a{" "}
                  <a
                    href="https://planthardiness.ars.usda.gov/PHZMWeb/"
                    target="_blank"
                  >
                    hardiness zone
                  </a>{" "}
                  to use the Explorer.
                </li>
              </ul>
            </ol>
          </Typography>
        </Fragment>
      );

    case 1:
      return (
        <Fragment>
          <Typography variant="h4" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Typography component="div" variant="body1" align="left">
            <ol>
              <li className="font-weight-bold">
                What is the difference between dormant and non-dormant alfalfa?
              </li>
              <ul className="list-unstyled pl-4 pb-4">
                <li>
                  “Dormant” alfalfa varieties are those traditionally grown as
                  perennials in northern climates; they have varying degrees of
                  cold hardiness but would generally be expected to survive the
                  winter. “Non dormant” alfalfa varieties are far less strongly
                  perennial in cold climates due to lower levels of cold
                  hardiness. There are some differences in growth pattern and
                  forage quality between the two groups, as well. Non-dormant
                  varieties produce more biomass in the first year than dormant
                  varieties.
                </li>
              </ul>
              <li className="font-weight-bold">What is a “forage brassica”?</li>
              <ul className="list-unstyled pl-4 pb-4">
                <li>
                  Many forage brassicas are hybrids of B. oleracea and B. napus.
                  (i.e. kale, rapeseed, turnip). Some are bred for their leaf
                  production, others for their roots. Be aware of what you are
                  buying depending on your needs.
                </li>
              </ul>

              <li className="font-weight-bold">
                What is the difference between a forage, daikon, tillage, and
                oilseed radish?
              </li>
              <ul className="list-unstyled pl-4 pb-4">
                <li>
                  Radishes have been bred for many purposes, including (human)
                  food, (animal) feed and forage, and ability to improve soil
                  structure. Confusion as to naming abounds, and is worsened by
                  the fact that the various types of radish readily interbreed.
                  Cover crop radishes are generally referred to as daikon-type
                  radishes (as opposed to the globe-shaped radishes that feature
                  in salads). According to Extension resources, ‘Tillage’ radish
                  is actually a specific brand of radish bred to be a cover
                  crop. Oilseed radishes have smaller, more branching roots than
                  forage radishes. Be aware of what you are buying depending on
                  your needs.
                </li>
              </ul>

              <li className="font-weight-bold">
                What is the difference between a forage turnip vs ‘Purple Top’
                turnip?
              </li>
              <ul className="list-unstyled pl-4 pb-4">
                <li>
                  Forage turnips have been bred for use as animal feed (i.e.
                  large tonnage per acre), as opposed to ‘Purple Top’ and
                  similar cultivars traditionally grown for human food (i.e.
                  bulb production). Seed costs vary widely. Be aware of what you
                  are buying depending on your needs.
                </li>
              </ul>

              <li className="font-weight-bold">
                What do you mean by “mustard”?
              </li>
              <ul className="list-unstyled pl-4 pb-4">
                <li>
                  Our tool groups several species under the term “mustard”,
                  including Sinapis alba (white mustard) and Brassica juncea
                  (brown, Oriental, or Indian mustard). We include notes in the
                  comments/notes sections on the information sheet where there
                  are differences in characteristics or uses among the species.
                </li>
              </ul>

              <li className="font-weight-bold">
                What’s the difference between canola and rapeseed?
              </li>
              <ul className="list-unstyled pl-4 pb-4">
                <li>
                  In practice for cover croppers, not much. Some rapeseed was
                  bred to have lower levels of compounds not good for human
                  consumption, making it better for the production of cooking
                  oil. The varieties good for the production of oil for human
                  consumption are referred to as “canola”. Canola seed is
                  generally more expensive than rapeseed seed.
                </li>
              </ul>

              <li className="font-weight-bold">
                What is the difference between “winter” and “spring” small
                grains?
              </li>
              <ul className="list-unstyled pl-4 pb-4">
                <li>
                  We are referring to germplasm type. For example, “winter”
                  wheat varieties are those that would be expected to usually
                  survive winter and require vernalization (i.e. cold) to
                  trigger flowering. “Spring” wheat varieties are much less cold
                  hardy and do not require vernalization to flower.
                </li>
              </ul>

              <li className="font-weight-bold">
                Can spring small grains be planted in fall and vice versa? Why
                would you do so?
              </li>
              <ul className="list-unstyled pl-4 pb-4">
                <li>
                  Winter small grain cultivars can be planted in spring, but
                  they won't flower (which may be useful since they don't get as
                  tall and are good for a low-growing ground cover). Likewise,
                  spring small grains may be planted in the fall (and will
                  therefore likely winter-kill, preventing the need for spring
                  termination).
                </li>
              </ul>

              <li className="font-weight-bold">
                Why do ratings for a given cover crop vary by hardiness zone?
              </li>
              <ul className="list-unstyled pl-4 pb-4">
                <li>
                  USDA hardiness zones are based on average minimum temperatures
                  and are a simple proxy for the length of the growing season
                  across the Northeast US. Ratings differ because these climatic
                  features affect planting dates, crop management, and plant
                  growth.
                </li>
                <li>
                  In addition, the experts in each zone sometimes have
                  differences in experience with the cover crop; a cover crop
                  may be more commonly used in a vegetable rotation in one zone
                  and an agronomic rotation in another one, with corresponding
                  differences in traits due to the way they are used.
                </li>
              </ul>

              <li className="font-weight-bold">
                I’m applying fall manure and want a cover crop to take up the N
                and prevent P runoff. What should I use?
              </li>
              <ul className="list-unstyled pl-4 pb-4">
                <li>
                  Choose a cover crop ranked high for the goals of “nitrogen
                  scavenging”, “prevent fall erosion”, and “prevent spring
                  erosion”.
                </li>
              </ul>

              <li className="font-weight-bold">
                I want a cover crop that can prevent soil crusting. What should
                I use?
              </li>
              <ul className="list-unstyled pl-4 pb-4">
                <li>
                  Pick a cover crop that is either alive during the time period
                  of concern or has a good rating for “lasting residue” and that
                  has a good rating for “soil aggregation” and “reduces topsoil
                  compaction”.
                </li>
              </ul>

              <li className="font-weight-bold">
                I am interested in a recommendation based on a goal you do not
                have in your tool. What can I do?
              </li>
              <ul className="list-unstyled pl-4 pb-4">
                <li>
                  Consider what existing goals and rated traits make up the goal
                  you are interested in.
                </li>
                <li>
                  <Link to="/feedback">Send us feedback!</Link> Let us know.
                </li>
              </ul>
            </ol>
          </Typography>
        </Fragment>
      );

    case 2:
      return (
        <div className="text-left pl-4">
          <Typography variant="h4" gutterBottom align="center">
            Data Dictionary
          </Typography>
          <InformationSheetDictionary zone={6} from="help" />
        </div>
      );
    case 3:
      return (
        <Fragment>
          <Typography variant="h4" gutterBottom align="center">
            Information Sheets
          </Typography>
          <Typography component="div" variant="body1" align="left">
            <ol>
              <li className="font-weight-bold">Cover Crops and Pollinators</li>
              <ul className="pb-4">
                <li>
                  Using Flowering Cover Crops for Native Pollinating Bee
                  Conservation, Penn State Extension,
                  <br />
                  <a
                    href="https://extension.psu.edu/using-flowering-cover-crops-for-native-pollinating-bee-conservation"
                    target="_blank"
                  >
                    https://extension.psu.edu/using-flowering-cover-crops-for-native-pollinating-bee-conservation
                  </a>
                </li>
                <li>
                  Conservation Cover for Pollinators, Xerces Society for
                  Invertebrate Conservation,
                  <br />
                  <a
                    href="http://northeastcovercrops.com/wp-content/uploads/2018/03/Conservation-Cover-for-Pollinators.pdf"
                    target="_blank"
                  >
                    http://northeastcovercrops.com/wp-content/uploads/2018/03/Conservation-Cover-for-Pollinators.pdf
                  </a>
                </li>
                <li>
                  Planting Flowers For Bees in Connecticut, Connecticut
                  Agricultural Experiment Station,
                  <br />
                  <a
                    href="http://northeastcovercrops.com/wp-content/uploads/2018/03/Planting-Flowers-For-Bees-in-Connecticut.pdf"
                    target="_blank"
                  >
                    http://northeastcovercrops.com/wp-content/uploads/2018/03/Planting-Flowers-For-Bees-in-Connecticut.pdf
                  </a>
                </li>
                <li>
                  Use of Cover Crops and Green Manures to Attract Beneficial
                  Insects, University of Connecticut Integrated Pest Management
                  Program,
                  <br />
                  <a
                    href="http://ipm.uconn.edu/documents/raw2/Use%20of%20Cover%20Crops%20and%20Green%20Manures%20to%20Attract%20Beneficial%20Insects/Use%20of%20Cover%20Crops%20and%20Green%20Manures%20to%20Attract%20Beneficial%20Insects.php?display=print"
                    target="_blank"
                  >
                    http://ipm.uconn.edu/documents/raw2/Use%20of%20Cover%20Crops%20and%20Green%20Manures%20to%20Attract%20Beneficial%20Insects/Use%20of%20Cover%20Crops%20and%20Green%20Manures%20to%20Attract%20Beneficial%20Insects.php?display=print
                  </a>
                </li>
              </ul>
              <li className="font-weight-bold">
                Cover Crops for Weed Suppression
              </li>
              <ul className="pb-4">
                <li>
                  Suppressing Weeds Using Cover Crops in Pennsylvania, Penn
                  State Extension,
                  <br />
                  <a
                    href="http://northeastcovercrops.com/wp-content/uploads/2018/04/Suppressing-Weeds-Using-Cover-Crops-in-Pennsylvania.pdf"
                    target="_blank"
                  >
                    http://northeastcovercrops.com/wp-content/uploads/2018/04/Suppressing-Weeds-Using-Cover-Crops-in-Pennsylvania.pdf
                  </a>
                </li>
                <li>
                  Cover Crops as a Weed Management Tool, Getting Rid of Weeds,
                  <br />
                  <a href="https://growiwm.org/cover-crops" target="_blank">
                    https://growiwm.org/cover-crops
                  </a>
                </li>
              </ul>
              <li className="font-weight-bold">
                Cover Cropping in Fruit, Vegetable, or Perennial Systems
              </li>
              <ul className="pb-4">
                <li>
                  Between Two Rows: Cover Crops for Perennial Plants, NH
                  Vegetable and Fruit News,
                  <br />
                  <a
                    href="https://nhvegfruitnews.wordpress.com/2016/06/27/between-two-rows-cover-crops-for-perennial-plants/"
                    target="_blank"
                  >
                    https://nhvegfruitnews.wordpress.com/2016/06/27/between-two-rows-cover-crops-for-perennial-plants/
                  </a>
                </li>
                <li>
                  Spring Planted Cover Crops for Vegetable Rotations, University
                  of Delaware Cooperative Extension,
                  <br />
                  <a
                    target="_blank"
                    href="https://extension.udel.edu/weeklycropupdate/?p=9950"
                  >
                    https://extension.udel.edu/weeklycropupdate/?p=9950
                  </a>
                </li>
                <li>
                  Cover Crops and Green Manures (New England Vegetable
                  Management Guide), University of Massachusetts Amherst,
                  <br />
                  <a
                    target="_blank"
                    href="https://nevegetable.org/cultural-practices/cover-crops-and-green-manures"
                  >
                    https://nevegetable.org/cultural-practices/cover-crops-and-green-manures
                  </a>
                </li>
              </ul>
              <li className="font-weight-bold">Cover Crop Planting</li>
              <ul className="pb-4">
                <li>
                  NH 340 Cover Crop Planting Specification Guide, USDA NRCS,
                  <br />
                  <a
                    target="_blank"
                    href="http://northeastcovercrops.com/wp-content/uploads/2018/03/NH-340-Cover-Crop-Planting-Specification-Guide-2.pdf"
                  >
                    http://northeastcovercrops.com/wp-content/uploads/2018/03/NH-340-Cover-Crop-Planting-Specification-Guide-2.pdf
                  </a>
                </li>
                <li>
                  Tips for Interseeding Cover Crops, University of Vermont
                  Extension,
                  <br />
                  <a
                    target="_blank"
                    href="http://northeastcovercrops.com/wp-content/uploads/2018/02/Tips-for-Interseeding-Cover-Crops.pdf"
                  >
                    http://northeastcovercrops.com/wp-content/uploads/2018/02/Tips-for-Interseeding-Cover-Crops.pdf
                  </a>
                </li>
                <li>
                  Aerial Seeding Helps Farmers Plant Cover Crops in the
                  Northeast, Lancaster Farming,
                  <br />
                  <a
                    target="_blank"
                    href="http://www.lancasterfarming.com/news/northern_edition/aerial-seeding-helps-farmers-plant-cover-crops-in-northeast/article_1d4fbe53-e72e-5c37-ae24-98ce2ca8b2bb.html"
                  >
                    http://www.lancasterfarming.com/news/northern_edition/aerial-seeding-helps-farmers-plant-cover-crops-in-northeast/article_1d4fbe53-e72e-5c37-ae24-98ce2ca8b2bb.html
                  </a>
                </li>
              </ul>
              <li className="font-weight-bold">
                Cover Crops and Herbicide Carryover
              </li>
              <ul className="pb-4">
                <li>
                  Cover Crop Interseeder – Potential for Injury from Corn
                  Herbicides, Penn State Extension,
                  <br />
                  <a
                    target="_blank"
                    href="http://northeastcovercrops.com/wp-content/uploads/2018/04/Cover-Crop-Interseeder-Potential-for-Injury-from-Corn-Herbicides.pdf"
                  >
                    http://northeastcovercrops.com/wp-content/uploads/2018/04/Cover-Crop-Interseeder-Potential-for-Injury-from-Corn-Herbicides.pdf
                  </a>
                </li>
                <li>
                  Herbicides Persistence and Rotation to Cover Crops, Penn State
                  Extension,
                  <br />
                  <a
                    target="_blank"
                    href="https://extension.psu.edu/herbicides-persistence-and-rotation-to-cover-crops"
                  >
                    https://extension.psu.edu/herbicides-persistence-and-rotation-to-cover-crops
                  </a>
                </li>
                <li>
                  Herbicide Considerations for Cover and Forage Crops, Penn
                  State Extension,
                  <br />
                  <a
                    target="_blank"
                    href="https://extension.psu.edu/herbicide-considerations-for-cover-and-forage-crops"
                  >
                    https://extension.psu.edu/herbicide-considerations-for-cover-and-forage-crops
                  </a>
                </li>
              </ul>
              <li className="font-weight-bold">Cover Crop Termination</li>
              <ul className="pb-4">
                <li>
                  Special Cover Crop Control Considerations, Penn State
                  Extension,
                  <br />
                  <a
                    target="_blank"
                    href="https://extension.psu.edu/special-cover-crop-control-considerations"
                  >
                    https://extension.psu.edu/special-cover-crop-control-considerations
                  </a>
                </li>
                <li>
                  Cover Crop Rollers for Northeastern Grain Production, Penn
                  State Extension,
                  <br />
                  <a
                    target="_blank"
                    href="https://extension.psu.edu/cover-crop-rollers-for-northeastern-grain-production"
                  >
                    https://extension.psu.edu/cover-crop-rollers-for-northeastern-grain-production
                  </a>
                </li>
                <li>
                  Cover Crop Termination Options, Getting Rid of Weeds,
                  <br />
                  <a
                    target="_blank"
                    href="https://growiwm.org/cover-crop-termination-options/"
                  >
                    https://growiwm.org/cover-crop-termination-options/
                  </a>
                </li>
              </ul>
              <li className="font-weight-bold">Planting Green</li>
              <ul className="pb-4">
                <li>
                  Planting Green – A New Cover Crop Management Technique, Penn
                  State Extension,
                  <br />
                  <a
                    target="_blank"
                    href="https://extension.psu.edu/planting-green-a-new-cover-crop-management-technique"
                  >
                    https://extension.psu.edu/planting-green-a-new-cover-crop-management-technique
                  </a>
                </li>
              </ul>
            </ol>
          </Typography>
        </Fragment>
      );
    default: {
      return <div></div>;
    }
  }
};
