import React, { Fragment, useEffect, useState } from "react";
import Header from "../Header/header";
import { Box, Typography } from "@material-ui/core";
const tableStyles = {
  td: {
    fontSize: "1em",
    padding: "0.1em",
  },
};

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
  return (
    <div className="contentWrapper" id="mainContentWrapper">
      <Header logo="neccc_wide_logo_color_web.jpg" />

      <div
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
      </div>
      {/* <div className="container-fluid pl-0 pr-0">
        <div className="row justify-content-center">
          <div className="col-12">
            <Typography variant="h3">About</Typography>
          </div>
          <div className="col-12">
            <Typography variant="body1">
              We are a group of researchers and outreach experts from
              universities, government agencies and NGOs, and industry dedicated
              to increasing the sustainability of US cropping systems.The Cover
              Crop Tools was designed and developed by a Product Team with
              members from the{" "}
              <a href="http://sudokita.com" target="_blank" rel="noreferrer">
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
              team at USDA ARS, NC State, and Purdue University. The Cover Crop
              Dataset has been assembled by six teams of cover crop experts (one
              for each plant hardiness zone in the northeastern United States)
              from the
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
