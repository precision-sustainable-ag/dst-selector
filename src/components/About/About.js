import React, { Fragment } from "react";
import Header from "../Header/header";
import { Box } from "@material-ui/core";
const tableStyles = {
  td: {
    fontSize: "1em",
    padding: "0.1em"
  }
};
const About = () => {
  return (
    <Fragment>
      <Header logo="neccc_wide_logo_color_web.jpg" />

      <Box>
        <aside
          className="landingWrapper"
          style={{
            background: 'url("/images/cover-crop-field.png") 0% 0% / cover'
          }}
        >
          <div className="boxWrapper">
            <aside className="text-left">
              <h2>About</h2>
              <p>
                We are a group of researchers and outreach experts from
                universities, government agencies and NGOs, and industry
                dedicated to increasing the sustainability of US cropping
                systems.The Cover Crop Tools was designed and developed by a
                Product Team with members from the{" "}
                <a href="http://sudokita.com" target="_blank" rel="noreferrer">
                  Agricultural Informatics Lab
                </a>{" "}
                and the{" "}
                <a
                  href="http://precisionsustainableag.org"
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
                <table className="table table-hover table-striped mt-2">
                  <thead className="thead-dark">
                    <tr>
                      <th style={tableStyles.td}>Team</th>
                      <th style={tableStyles.td}>Members</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={tableStyles.td}>Product</td>
                      <td style={tableStyles.td}>
                        Ankita Raturi, Victoria Ackroyd, Juliet Norton, Rohit
                        Bandooni, Paul Salon, Steven Mirsky
                      </td>
                    </tr>
                    <tr>
                      <td style={tableStyles.td}>Zone 7</td>
                      <td style={tableStyles.td}>
                        Mark VanGessel, Scott Raubenstein, Nevin Dawson, Aaron
                        Cooper, Dean Hively, Steven Mirsky, Michel Cavigelli
                      </td>
                    </tr>
                    <tr>
                      <td style={tableStyles.td}>Zone 6</td>
                      <td style={tableStyles.td}>
                        Sjoerd Duiker, John Wallace, Jim Hyde, Rebecca Brown,
                        Zach Larson, Dave Wilson, Megan Chawner, Christian
                        Bench, Kaitlin Farbotnik, Mark Goodson
                      </td>
                    </tr>
                    <tr>
                      <td style={tableStyles.td}>Zone 5</td>
                      <td style={tableStyles.td}>
                        Thomas Bjorkman, Kirsten Workman, Shawnna Clark, Dorn
                        Cox, Mark Goodson, Anne Verhallen
                      </td>
                    </tr>
                    <tr>
                      <td style={tableStyles.td}>Zone 4</td>
                      <td style={tableStyles.td}>
                        Heather Darby, Jason Lilley, Natalie Lounsbury, Lindsey
                        Ruhl, Derek Hines, Rebecca Long, Ellen Mallory, John
                        Chartier, Kirsten Workman
                      </td>
                    </tr>
                    <tr>
                      <td style={tableStyles.td}>Zone 2 &amp; 3</td>
                      <td style={tableStyles.td}>TBD.</td>
                    </tr>
                    <tr>
                      <td style={tableStyles.td}>Misc. Participants</td>
                      <td style={tableStyles.td}>
                        Brandon Smith, Linda Yeung, Masoud Hashemi, Kate Tully
                      </td>
                    </tr>
                    <tr>
                      <td style={tableStyles.td}>External Data Sources</td>
                      <td style={tableStyles.td}>
                        The NECCC dataset was built on data sourced from the{" "}
                        <a href="http://mccc.msu.edu" target="_blank">
                          Midwestern Cover Crops Council
                        </a>
                        ,{" "}
                        <a href="https://plants.usda.gov/java/">
                          USDA PLANTS database
                        </a>
                        , and the{" "}
                        <a href="http://itis.gov" target="_blank">
                          Integrated Taxonomic Information Service
                        </a>
                        .
                      </td>
                    </tr>
                  </tbody>
                </table>
              </p>
              <p>
                <b className="mt-2">
                  This material is based upon work supported by:
                </b>
                <ol>
                  <li>
                    The National Institute of Food and Agriculture, U.S.
                    Department of Agriculture, through the Northeast Sustainable
                    Agriculture Research and Education program under subaward
                    number ENE16-144,
                  </li>
                  <li>
                    Post-doctoral Fellowship number 2016-67012-24711 and other
                    awards from the USDA National Institute of Food and
                    Agriculture,
                  </li>
                  <li>
                    The U.S. Department of Agriculture Natural Resources
                    Conservation Service.
                  </li>
                </ol>
              </p>
              <p></p>
            </aside>
          </div>
        </aside>
      </Box>
    </Fragment>
  );
};

export default About;
