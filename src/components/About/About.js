import React, { Fragment } from "react";
import Header from "../Header/header";
import { Box } from "@material-ui/core";

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
                systems. We form the{" "}
                <a
                  href="http://precisionsustainableag.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Precision Sustainable Agriculture team
                </a>
                , a multi-pronged research effort conducting on-station and
                on-farm work to understand and promote sustainable cropping
                methods such as integrated weed management, precision
                application of fertilizers and herbicides, and cover crop use.
                Our work includes breeding regionally-adapted cover crops,
                investigating management options for herbicide resistant weeds
                (link here to GROW website - integratedweedmanagement.org), and
                use of precision agricultural technologies to minimize inputs
                while maximizing yield and farmer profitability. Our goal is to
                better understand interactions among genetics, environment,
                management, and the sociological perspective to, in turn, create
                decision support tools that position US farmers at the cutting
                edge of agricultural innovation.
                <br />
                <br />
                <b>This material is based upon work supported by:</b>
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
