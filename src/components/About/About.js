import React from "react";
import Header from "../Header/header";
import { Typography, Box } from "@material-ui/core";

const About = () => {
  return (
    <div className="contentWrapper">
      <Header logo="neccc_wide_logo_color_web.jpg" />

      <Box>
        <div className="container-fluid">
          <div className="row mt-4">
            <div className="col-12">
              <Typography variant="h4">About</Typography>
            </div>
            <div className="col-12 mt-2">
              <Typography variant="body1">
                We are a group of researchers and outreach experts from
                universities, government agencies and NGOs, and industry
                dedicated to increasing the sustainability of US cropping
                systems.{" "}
              </Typography>
              <Typography variant="body1">
                We form the{" "}
                <a
                  href="//precisionsustainableag.org/"
                  rel="noopener noreferer"
                  target="_blank"
                >
                  Precision Sustainable Agriculture team
                </a>
                , a multi-pronged research effort conducting on-station and
                on-farm work to understand and promote sustainable cropping
                methods such as integrated weed management, precision
                application of fertilizers and herbicides, and cover crop use.
                Our work includes breeding regionally-adapted cover crops,
                investigating management options for{" "}
                <a
                  href="//integratedweedmanagement.org"
                  rel="noopener noreferer"
                  target="_blank"
                >
                  herbicide resistant weeds
                </a>
                , and use of precision agricultural technologies to minimize
                inputs while maximizing yield and farmer profitability. Our goal
                is to better understand interactions among genetics,
                environment, management, and the sociological perspective to, in
                turn, create decision support tools that position US farmers at
                the cutting edge of agricultural innovation.
              </Typography>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <Typography variant="body1">
                This material is based upon work supported by{" "}
              </Typography>
              <ol>
                <li>
                  The National Institute of Food and Agriculture, U.S.
                  Department of Agriculture, through the Northeast Sustainable
                  Agriculture Research and Education program under subaward
                  number ENE16-144
                </li>
                <li>
                  {" "}
                  Post-doctoral Fellowship number 2016-67012-24711 and other
                  awards from the USDA National Institute of Food and
                  Agriculture, and{" "}
                </li>
                <li>
                  {" "}
                  The U.S. Department of Agriculture Natural Resources
                  Conservation Service.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default About;
