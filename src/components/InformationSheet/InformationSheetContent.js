import React, { useState, useEffect, Fragment } from "react";
import {
  getRating,
  RenderSeedPriceIcons,
  allMonths,
} from "../../shared/constants";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import SoilDrainageTimeline from "./SoilDrainageTimeline";

import { ExpandMore, FiberManualRecord } from "@material-ui/icons";
import PhotoComponent from "./PhotoComponent";
import InformationSheetDictionary from "./InformationSheetDictionary";
import GrowthWindowComponent from "../CropSelector/GrowthWindow";
import moment from "moment-timezone";
const InformationSheetContent = (props) => {
  const crop = props.crop;
  const from = props.from || "direct";
  useEffect(() => {
    document.title = `Information Sheet for ${crop["Cover Crop Name"]}`;
  }, []);

  return from === "direct" ? (
    <Fragment>
      <div className="row coverCropDescriptionWrapper">
        <div className="col-12 p-0">
          <Typography variant="h6" className="text-uppercase px-3 py-2">
            Cover Crop Description
          </Typography>

          <Typography variant="body1" className="p-3">
            {crop["Crop Description"]}
          </Typography>
        </div>
      </div>
      <div
        className="d-flex justify-content-center mt-1 mb-1 photosWrapper"
        style={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          flexWrap: "nowrap",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <PhotoComponent
          imageData={crop["Image Data"] ? crop["Image Data"] : null}
        />
      </div>
      <div className="row mt-2 coverCropGoalsWrapper">
        <div className="col-12 p-0">
          <Typography variant="h6" className="text-uppercase px-3 py-2">
            Goals
          </Typography>
          <div className="row col-12 py-4 text-right">
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">Growing Window</Typography>
              </span>

              <span className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {crop["Growing Window"]}
                  </Typography>
                </div>
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">Penetrates Plow Pan</Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Penetrates Plow Pan"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">Nitrogen Scavenging</Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Nitrogen Scavenging"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">
                  Reduces Topsoil Compaction
                </Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Reduces Topsoil Compaction"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">Lasting Residue</Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Lasting Residue"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">
                  Improve Soil Organic Matter
                </Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Improve Soil Organic Matter"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">
                  Prevent Fall Soil Erosion
                </Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Prevent Fall Soil Erosion"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">
                  Increase Soil Aggregation
                </Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Increase Soil Aggregation"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">
                  Prevent Spring Soil Erosion
                </Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Prevent Spring Soil Erosion"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">Supports Mycorrhizae</Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Supports Mycorrhizae"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">Promote Water Quality</Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Promote Water Quality"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">Good Grazing</Typography>
              </span>
              <span className="col-3">{getRating(crop["Good Grazing"])}</span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">Forage Harvest Value</Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Forage Harvest Value"])}
              </span>
            </div>
            <div className="col-6 mb-2 row">
              <span className="col">
                <Typography variant="body1">Pollinator Food</Typography>
              </span>
              <span className="col-3">
                {getRating(crop["Pollinator Food"])}
              </span>
            </div>
            {crop["Nitrogen Fixation"] ? (
              <Fragment>
                <div className="col-6 mb-2 row">
                  <span className="col">
                    <Typography variant="body1">Nitrogen Fixation</Typography>
                  </span>
                  <span className="col-3">
                    {getRating(crop["Nitrogen Fixation"])}
                  </span>
                </div>
              </Fragment>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="row otherRows">
        <div className="col-6 weedsRowWrapper">
          <div className="col-12 otherHeaderRow p-0">
            <Typography variant="h6" className="px-3 py-2">
              Weeds
            </Typography>
          </div>
          <div className="row col-12 py-4 text-right">
            <div className="col-9 mb-2">
              <Typography variant="body1">
                Residue Suppresses Summer Annual Weeds
              </Typography>
            </div>
            <div className="col-3 mb-2">
              {getRating(crop["Residue Suppresses Summer Annual Weeds"])}
            </div>
            <div className="col-9 mb-2">
              <Typography variant="body1">
                Outcompetes Summer Annual Weeds
              </Typography>
            </div>
            <div className="col-3 mb-2">
              {getRating(crop["Outcompetes Summer Annual Weeds"])}
            </div>
            <div className="col-9 mb-2">
              <Typography variant="body1">
                Suppresses Winter Annual Weeds
              </Typography>
            </div>
            <div className="col-3 mb-2">
              {getRating(crop["Suppresses Winter Annual Weeds"])}
            </div>
            <div className="col-9 mb-2">
              <Typography variant="body1">Persistence</Typography>
            </div>
            <div className="col-3 mb-2">{getRating(crop["Persistence"])}</div>
            <div className="col-9 mb-2">
              <Typography variant="body1">Volunteer Establishment</Typography>
            </div>
            <div className="col-3 mb-2">
              {getRating(crop["Volunteer Establishment"])}
            </div>
          </div>
        </div>
        <div className="col-6 envTolWrapper">
          <div className="col-12 otherHeaderRow p-0">
            <Typography variant="h6" className="px-3 py-2">
              Environmental Tolerances
            </Typography>
          </div>
          <div className="row col-12 py-4 text-right">
            <div className="col-9 mb-2">
              <Typography variant="body1">Winter Survival</Typography>
            </div>
            {/* <div className="col-3 mb-2">
              {getRating(crop["Winter Survival"].toString())}
            </div> */}
            <div className="col-3 mb-2">
              <div className="blue-bg">
                <Typography variant="body1">
                  {crop["Winter Survival"]}
                </Typography>
              </div>
            </div>
            <div className="col-9 mb-2">
              <Typography variant="body1">Low Fertility</Typography>
            </div>
            <div className="col-3 mb-2">{getRating(crop["Low Fertility"])}</div>
            <div className="col-9 mb-2">
              <Typography variant="body1">Drought</Typography>
            </div>
            <div className="col-3 mb-2">{getRating(crop["Drought"])}</div>
            <div className="col-9 mb-2">
              <Typography variant="body1">Heat</Typography>
            </div>
            <div className="col-3 mb-2">{getRating(crop["Heat"])}</div>
            <div className="col-9 mb-2">
              <Typography variant="body1">Shade</Typography>
            </div>
            <div className="col-3 mb-2">{getRating(crop["Shade"])}</div>
            <div className="col-9 mb-2">
              <Typography variant="body1">Flood</Typography>
            </div>
            <div className="col-3 mb-2">{getRating(crop["Flood"])}</div>
            <div className="col-9 mb-2">
              <Typography variant="body1">Salinity</Typography>
            </div>
            <div className="col-3 mb-2">{getRating(crop["Salinity"])}</div>
          </div>
        </div>
        <div className="col-6 basicAgWrapper">
          <div className="col-12 otherHeaderRow p-0">
            <Typography variant="h6" className="px-3 py-2">
              Basic Agronomics
            </Typography>
            <div className="row col-12 py-4 text-right">
              <div className="col-9 mb-2">
                <Typography variant="body1">Duration</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">{crop["Duration"]}</Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Zone Use</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">{crop["Zone Use"]}</Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Shape And Orientation</Typography>
              </div>
              <div className="col-3 mb-2">
                {crop["Shape & Orientation"].map((val, index) => (
                  <div className="blue-bg bordered" key={index}>
                    <Typography variant="body1">{val}</Typography>
                  </div>
                ))}
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Active Growth Period</Typography>
              </div>
              <div className="col-3 mb-2">
                {crop["Active Growth Period"].map((val, index) => (
                  <div className="blue-bg bordered" key={index}>
                    <Typography variant="body1">{val}</Typography>
                  </div>
                ))}
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">C:N</Typography>
              </div>
              <div className="col-3 mb-2">
                {getRating(crop["C to N Ratio"])}
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Dry Matter (Lbs/A/Yr)</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {" "}
                    {`${crop["Dry Matter Min (lbs/A/y)"]} - ${crop["Dry Matter Max (lbs/A/y)"]}`}
                  </Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Soil Texture</Typography>
              </div>
              <div className="col-3 mb-2 text-capitalize">
                {crop["Soil Textures"].map((val, index) => (
                  <div className="blue-bg bordered" key={index}>
                    <Typography variant="body1">{val}</Typography>
                  </div>
                ))}
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Soil PH</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {" "}
                    {`${crop["Minimum Tolerant Soil pH"]} - ${crop["Maximum Tolerant Soil pH"]}`}
                  </Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Soil Moisture Use</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {crop["Soil Moisture Use"]}
                  </Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Hessian Fly Free Date?</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {crop["Hessian Fly Free Date"]
                      ? crop["Hessian Fly Free Date"]
                      : "No"}
                  </Typography>
                </div>
              </div>
              {crop["Nitrogen Accumulation Max, Legumes (lbs/A/y)"] ? (
                <Fragment>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">
                      Nitrogen Accumulation (Lbs/A/Yr)
                    </Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {`${crop["Nitrogen Accumulation Min, Legumes (lbs/A/y)"]} - ${crop["Nitrogen Accumulation Max, Legumes (lbs/A/y)"]}`}
                      </Typography>
                    </div>
                  </div>
                </Fragment>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="col-6 basicAgWrapper">
          <div className="col-12 otherHeaderRow p-0">
            <Typography variant="h6" className="px-3 py-2">
              Soil Drainage
            </Typography>
            <div className="col-12 py-4 text-right">
              <SoilDrainageTimeline drainage={crop["Soil Drainage"]} />
            </div>
          </div>
        </div>
        <div className="col-6 basicAgWrapper">
          <div className="col-12 otherHeaderRow p-0">
            <Typography variant="h6" className="px-3 py-2">
              Growth
            </Typography>
            <div className="row col-12 py-4 text-right">
              <div className="col-9 mb-2">
                <Typography variant="body1">Ease Of Establishment</Typography>
              </div>
              <div className="col-3 mb-2">
                {getRating(crop["Ease of Establishment"])}
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Establishes Quickly</Typography>
              </div>
              <div className="col-3 mb-2">
                {getRating(crop["Establishes Quickly"])}
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Early Spring Growth</Typography>
              </div>
              <div className="col-3 mb-2">
                {getRating(crop["Early Spring Growth"])}
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Flowering Trigger</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {crop["Flowering Trigger"]}
                  </Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Root Architecture</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {crop["Root Architecture"]}
                  </Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Root Depth</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">{crop["Root Depth"]}</Typography>
                </div>
              </div>
              {crop["Inoculant Type (Legumes Only)"] ? (
                <Fragment>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">Inoculant Type</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    {crop["Inoculant Type (Legumes Only)"].map((val, index) => (
                      <div className="blue-bg bordered" key={index}>
                        <Typography variant="body1" className="text-capitalize">
                          {val}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </Fragment>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="col-6 basicAgWrapper">
          <div className="col-12 otherHeaderRow p-0">
            <Typography variant="h6" className="px-3 py-2">
              Planting
            </Typography>
            <div className="row col-12 py-4 text-right">
              <div className="col-9 mb-2">
                <Typography variant="body1">Seeds Per Lb</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {crop["Seeds per Pound"]}
                  </Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Seed Price Per Lb</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg no-bg">
                  <RenderSeedPriceIcons val={crop["Seed Price per Pound"]} />
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">
                  Base Seeding Rate (Lbs/A)
                </Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {`${crop["Base Seeding Rate Min (lbs/A)"]} - ${crop["Base Seeding Rate Max (lbs/A)"]}`}
                  </Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Drilled Depth</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {`${crop["Drilled Depth Min"]}" - ${crop["Drilled Depth Max"]}"`}
                  </Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Can Aerial Seed?</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {crop["Aerial Seeding"] ? "Yes" : "No"}
                  </Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Can Frost Seed?</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {crop["Frost Seeding"] ? "Yes" : "No"}
                  </Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">
                  Min Germination Temp (&deg;F)
                </Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {crop["Min Germination Temp (F)"]}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 basicAgWrapper">
          <div className="col-12 otherHeaderRow p-0">
            <Typography variant="h6" className="px-3 py-2">
              Termination
            </Typography>
            <div className="row col-12 py-4 text-right">
              <div className="col-9 mb-2">
                <Typography variant="body1">Tillage At Vegetative</Typography>
              </div>
              <div className="col-3 mb-2">
                {getRating(crop["Tillage at Vegetative"])}
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Tillage At Flowering</Typography>
              </div>
              <div className="col-3 mb-2">
                {getRating(crop["Tillage at Flowering"])}
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Freezing At Vegetative</Typography>
              </div>
              <div className="col-3 mb-2">
                {getRating(crop["Freezing at Vegetative"])}
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Freezing At Flowering</Typography>
              </div>
              <div className="col-3 mb-2">
                {getRating(crop["Freezing at Flowering"])}
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Chemical At Vegetative</Typography>
              </div>
              <div className="col-3 mb-2">
                {getRating(crop["Chemical at Vegetative"])}
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Chemical At Flowering</Typography>
              </div>
              <div className="col-3 mb-2">
                {getRating(crop["Chemical at Flowering"])}
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Mow At Flowering</Typography>
              </div>
              <div className="col-3 mb-2">
                {getRating(crop["Mow at Flowering"])}
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">
                  Roller-Crimp At Flowering
                </Typography>
              </div>
              <div className="col-3 mb-2">
                {getRating(crop["Roller Crimp at Flowering"])}
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 basicAgWrapper">
          <div className="col-12 otherHeaderRow p-0">
            <Typography variant="h6" className="px-3 py-2">
              Planting Dates
            </Typography>
            <div className="row col-12 py-4 text-right">
              <div className="col-9 mb-2">
                <Typography variant="body1">Frost Seeding</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {crop["Frost Seeding"]
                      ? `${moment(crop["Frost Seeding Start"], "YYYY-MM-DD")
                          .format("MM/DD")
                          .toString()} - ${moment(
                          crop["Frost Seeding End"],
                          "YYYY-MM-DD"
                        )
                          .format("MM/DD")
                          .toString()}`
                      : "N/A"}
                  </Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Reliable Establishment</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {getMonthDayString("reliable", crop)}
                  </Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">
                  Temperature/Moisture Risk
                </Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {getMonthDayString("temperature", crop)}
                  </Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Can Interseed</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {crop["Interseed possible"] ? "Yes" : "N/A"}
                  </Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Winter Survival</Typography>
              </div>
              <div className="col-3 mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {crop["Winter Survival"]}
                  </Typography>
                </div>
              </div>
              <div className="col-9 mb-2">
                <Typography variant="body1">Active Growth Period</Typography>
              </div>
              <div className="col-3 mb-2">
                {crop["Active Growth Period"].map((val, index) => (
                  <div className="blue-bg bordered" key={index}>
                    <Typography variant="body1">{val}</Typography>
                  </div>
                ))}
              </div>
            </div>
            <div className="row col-12 text-right">
              <div className="col-12">
                <table style={{ width: "100%", height: "40px" }}>
                  <tbody>
                    <tr>
                      {allMonths.map((month, index) => (
                        <GrowthWindowComponent
                          from="tableAll"
                          data={crop}
                          key={index}
                          id={`growthCell${index}`}
                          month={index}
                        />
                      ))}
                    </tr>
                    <tr>
                      {allMonths.map((month, index) => (
                        <td key={index}>{month}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-12 row d-none d-print-block text-left">
                <div className="col-12 legendModalRow">
                  <Typography variant="body1">
                    <FiberManualRecord className="reliable" />
                    <span className="pl-3">{"Reliable Establishment"}</span>
                  </Typography>
                </div>
                <div className="col-12 legendModalRow">
                  <Typography variant="body1">
                    <FiberManualRecord className="temperatureRisk" />
                    <span className="pl-3">
                      {"Temperature Risk To Establishment"}
                    </span>
                  </Typography>
                </div>
                <div className="col-12 legendModalRow">
                  <Typography variant="body1">
                    <FiberManualRecord className="frostPossible" />
                    <span className="pl-3">{"Frost Seeding Possible"}</span>
                  </Typography>
                </div>
                <div className="col-12 legendModalRow">
                  <Typography variant="body1">
                    <FiberManualRecord className="cashCrop" />
                    <span className="pl-3">{"Cash Crop Growth Window"}</span>
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row coverCropDescriptionWrapper">
        <div className="col-12 p-0">
          <Typography variant="h6" className="text-uppercase px-3 py-2">
            Extended Comments
          </Typography>
          {crop["Notes: Goals"] ? (
            <Typography variant="body1" className="p-3">
              {" "}
              <b>Goals:</b> {crop["Notes: Goals"]}
            </Typography>
          ) : (
            ""
          )}

          {crop["Notes: Weeds"] ? (
            <Typography variant="body1" className="p-3">
              {" "}
              <b>Weeds:</b> {crop["Notes: Weeds"]}
            </Typography>
          ) : (
            ""
          )}

          {crop["Notes: Planting"] ? (
            <Typography variant="body1" className="p-3">
              {" "}
              <b>Weeds:</b> {crop["Notes: Planting"]}
            </Typography>
          ) : (
            ""
          )}
        </div>
      </div>
      <InformationSheetDictionary />
    </Fragment>
  ) : (
    <Fragment>
      <div className="row coverCropDescriptionWrapper">
        <div className="col-12 p-0">
          <Typography variant="h6" className="text-uppercase px-3 py-2">
            Cover Crop Description
          </Typography>

          <Typography variant="body1" className="p-3">
            {crop["Crop Description"]}
          </Typography>
        </div>
      </div>
      <div
        className="d-flex justify-content-center mt-2 mb-2 photosWrapper"
        style={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          flexWrap: "nowrap",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <PhotoComponent
          imageData={crop["Image Data"] ? crop["Image Data"] : null}
        />
      </div>
      <div className="row mt-2 coverCropGoalsWrapper">
        <div className="col-12 p-0">
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6" className="text-uppercase px-3 py-2">
                Goals
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="row col-12 py-4 text-right">
                <div className="col-6 mb-2 row">
                  <span className="col">
                    <Typography variant="body1">Growing Window</Typography>
                  </span>
                  {/* <span className="col-3">{crop["Growing Window"]}</span> */}
                  <span className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {crop["Growing Window"]}
                      </Typography>
                    </div>
                  </span>
                </div>
                <div className="col-6 mb-2 row">
                  <span className="col">
                    <Typography variant="body1">Penetrates Plow Pan</Typography>
                  </span>
                  <span className="col-3">
                    {getRating(crop["Penetrates Plow Pan"])}
                  </span>
                </div>
                <div className="col-6 mb-2 row">
                  <span className="col">
                    <Typography variant="body1">Nitrogen Scavenging</Typography>
                  </span>
                  <span className="col-3">
                    {getRating(crop["Nitrogen Scavenging"])}
                  </span>
                </div>
                <div className="col-6 mb-2 row">
                  <span className="col">
                    <Typography variant="body1">
                      Reduces Topsoil Compaction
                    </Typography>
                  </span>
                  <span className="col-3">
                    {getRating(crop["Reduces Topsoil Compaction"])}
                  </span>
                </div>
                <div className="col-6 mb-2 row">
                  <span className="col">
                    <Typography variant="body1">Lasting Residue</Typography>
                  </span>
                  <span className="col-3">
                    {getRating(crop["Lasting Residue"])}
                  </span>
                </div>
                <div className="col-6 mb-2 row">
                  <span className="col">
                    <Typography variant="body1">
                      Improve Soil Organic Matter
                    </Typography>
                  </span>
                  <span className="col-3">
                    {getRating(crop["Improve Soil Organic Matter"])}
                  </span>
                </div>
                <div className="col-6 mb-2 row">
                  <span className="col">
                    <Typography variant="body1">
                      Prevent Fall Soil Erosion
                    </Typography>
                  </span>
                  <span className="col-3">
                    {getRating(crop["Prevent Fall Soil Erosion"])}
                  </span>
                </div>
                <div className="col-6 mb-2 row">
                  <span className="col">
                    <Typography variant="body1">
                      Increase Soil Aggregation
                    </Typography>
                  </span>
                  <span className="col-3">
                    {getRating(crop["Increase Soil Aggregation"])}
                  </span>
                </div>
                <div className="col-6 mb-2 row">
                  <span className="col">
                    <Typography variant="body1">
                      Prevent Spring Soil Erosion
                    </Typography>
                  </span>
                  <span className="col-3">
                    {getRating(crop["Prevent Spring Soil Erosion"])}
                  </span>
                </div>
                <div className="col-6 mb-2 row">
                  <span className="col">
                    <Typography variant="body1">
                      Supports Mycorrhizae
                    </Typography>
                  </span>
                  <span className="col-3">
                    {getRating(crop["Supports Mycorrhizae"])}
                  </span>
                </div>
                <div className="col-6 mb-2 row">
                  <span className="col">
                    <Typography variant="body1">
                      Promote Water Quality
                    </Typography>
                  </span>
                  <span className="col-3">
                    {getRating(crop["Promote Water Quality"])}
                  </span>
                </div>
                <div className="col-6 mb-2 row">
                  <span className="col">
                    <Typography variant="body1">Good Grazing</Typography>
                  </span>
                  <span className="col-3">
                    {getRating(crop["Good Grazing"])}
                  </span>
                </div>
                <div className="col-6 mb-2 row">
                  <span className="col">
                    <Typography variant="body1">
                      Forage Harvest Value
                    </Typography>
                  </span>
                  <span className="col-3">
                    {getRating(crop["Forage Harvest Value"])}
                  </span>
                </div>
                <div className="col-6 mb-2 row">
                  <span className="col">
                    <Typography variant="body1">Pollinator Food</Typography>
                  </span>
                  <span className="col-3">
                    {getRating(crop["Pollinator Food"])}
                  </span>
                </div>
                {crop["Nitrogen Fixation"] ? (
                  <Fragment>
                    <div className="col-6 mb-2 row">
                      <span className="col">
                        <Typography variant="body1">
                          Nitrogen Fixation
                        </Typography>
                      </span>
                      <span className="col-3">
                        {getRating(crop["Nitrogen Fixation"])}
                      </span>
                    </div>
                  </Fragment>
                ) : (
                  ""
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="row otherRows pb-5">
        <div className="col-6 weedsRowWrapper">
          <Accordion defaultExpanded style={{ border: "1px solid #2b7b79" }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <div className="col-12 otherHeaderRow p-0">
                <Typography variant="h6" className="px-3 py-2">
                  Weeds
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="row col-12 py-4 text-right">
                <div className="col-9 mb-2">
                  <Typography variant="body1">
                    Residue Suppresses Summer Annual Weeds
                  </Typography>
                </div>
                <div className="col-3 mb-2">
                  {getRating(crop["Residue Suppresses Summer Annual Weeds"])}
                </div>
                <div className="col-9 mb-2">
                  <Typography variant="body1">
                    Outcompetes Summer Annual Weeds
                  </Typography>
                </div>
                <div className="col-3 mb-2">
                  {getRating(crop["Outcompetes Summer Annual Weeds"])}
                </div>
                <div className="col-9 mb-2">
                  <Typography variant="body1">
                    Suppresses Winter Annual Weeds
                  </Typography>
                </div>
                <div className="col-3 mb-2">
                  {getRating(crop["Suppresses Winter Annual Weeds"])}
                </div>
                <div className="col-9 mb-2">
                  <Typography variant="body1">Persistence</Typography>
                </div>
                <div className="col-3 mb-2">
                  {getRating(crop["Persistence"])}
                </div>
                <div className="col-9 mb-2">
                  <Typography variant="body1">
                    Volunteer Establishment
                  </Typography>
                </div>
                <div className="col-3 mb-2">
                  {getRating(crop["Volunteer Establishment"])}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="col-6 envTolWrapper">
          <Accordion defaultExpanded style={{ border: "1px solid #2b7b79" }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <div className="col-12 otherHeaderRow p-0">
                <Typography variant="h6" className="px-3 py-2">
                  Environmental Tolerances
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="row col-12 py-4 text-right">
                <div className="col-9 mb-2">
                  <Typography variant="body1">Winter Survival</Typography>
                </div>
                <div className="col-3 mb-2">
                  <div className="blue-bg">
                    <Typography variant="body1">
                      {crop["Winter Survival"]}
                    </Typography>
                  </div>
                </div>
                <div className="col-9 mb-2">
                  <Typography variant="body1">Low Fertility</Typography>
                </div>
                <div className="col-3 mb-2">
                  {getRating(crop["Low Fertility"])}
                </div>
                <div className="col-9 mb-2">
                  <Typography variant="body1">Drought</Typography>
                </div>
                <div className="col-3 mb-2">{getRating(crop["Drought"])}</div>
                <div className="col-9 mb-2">
                  <Typography variant="body1">Heat</Typography>
                </div>
                <div className="col-3 mb-2">{getRating(crop["Heat"])}</div>
                <div className="col-9 mb-2">
                  <Typography variant="body1">Shade</Typography>
                </div>
                <div className="col-3 mb-2">{getRating(crop["Shade"])}</div>
                <div className="col-9 mb-2">
                  <Typography variant="body1">Flood</Typography>
                </div>
                <div className="col-3 mb-2">{getRating(crop["Flood"])}</div>
                <div className="col-9 mb-2">
                  <Typography variant="body1">Salinity</Typography>
                </div>
                <div className="col-3 mb-2">{getRating(crop["Salinity"])}</div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="col-6 basicAgWrapper">
          <div
            className="col-12 otherHeaderRow p-0"
            style={{ marginTop: "1em" }}
          >
            <Accordion defaultExpanded style={{ border: "1px solid #2b7b79" }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography
                  variant="h6"
                  className="px-3 py-2"
                  style={{ border: "0px" }}
                >
                  Basic Agronomics
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="row col-12 py-4 text-right">
                  <div className="col-9 mb-2">
                    <Typography variant="body1">Duration</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {crop["Duration"]}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">Zone Use</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {crop["Zone Use"]}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">
                      Shape And Orientation
                    </Typography>
                  </div>
                  <div className="col-3 mb-2">
                    {crop["Shape & Orientation"].map((val, index) => (
                      <div className="blue-bg bordered" key={index}>
                        <Typography variant="body1">{val}</Typography>
                      </div>
                    ))}
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">
                      Active Growth Period
                    </Typography>
                  </div>
                  <div className="col-3 mb-2">
                    {crop["Active Growth Period"].map((val, index) => (
                      <div className="blue-bg bordered" key={index}>
                        <Typography variant="body1">{val}</Typography>
                      </div>
                    ))}
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">C:N</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    {getRating(crop["C to N Ratio"])}
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">
                      Dry Matter (Lbs/A/Yr)
                    </Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {" "}
                        {`${crop["Dry Matter Min (lbs/A/y)"]} - ${crop["Dry Matter Max (lbs/A/y)"]}`}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">Soil Texture</Typography>
                  </div>
                  <div className="col-3 mb-2 text-capitalize">
                    {crop["Soil Textures"].map((val, index) => (
                      <div className="blue-bg bordered" key={index}>
                        <Typography variant="body1">{val}</Typography>
                      </div>
                    ))}
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">Soil PH</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {" "}
                        {`${crop["Minimum Tolerant Soil pH"]} - ${crop["Maximum Tolerant Soil pH"]}`}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">Soil Moisture Use</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {crop["Soil Moisture Use"]}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">
                      Hessian Fly Free Date?
                    </Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {crop["Hessian Fly Free Date"]
                          ? crop["Hessian Fly Free Date"]
                          : "No"}
                      </Typography>
                    </div>
                  </div>
                  {crop["Nitrogen Accumulation Max, Legumes (lbs/A/y)"] ? (
                    <Fragment>
                      <div className="col-9 mb-2">
                        <Typography variant="body1">
                          Nitrogen Accumulation (Lbs/A/Yr)
                        </Typography>
                      </div>
                      <div className="col-3 mb-2">
                        <div className="blue-bg">
                          <Typography variant="body1">
                            {`${crop["Nitrogen Accumulation Min, Legumes (lbs/A/y)"]} - ${crop["Nitrogen Accumulation Max, Legumes (lbs/A/y)"]}`}
                          </Typography>
                        </div>
                      </div>
                    </Fragment>
                  ) : (
                    ""
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="col-6 basicAgWrapper">
          <div
            className="col-12 otherHeaderRow p-0"
            style={{ marginTop: "1em" }}
          >
            <Accordion defaultExpanded style={{ border: "1px solid #2b7b79" }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography
                  variant="h6"
                  className="px-3 py-2"
                  style={{ border: "0px" }}
                >
                  Soil Drainage
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="col-12 py-4 text-right">
                  <SoilDrainageTimeline drainage={crop["Soil Drainage"]} />
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="col-6 basicAgWrapper">
          <div
            className="col-12 otherHeaderRow p-0"
            style={{ marginTop: "1em" }}
          >
            <Accordion defaultExpanded style={{ border: "1px solid #2b7b79" }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography
                  variant="h6"
                  className="px-3 py-2"
                  style={{ border: "0px" }}
                >
                  Growth
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="row col-12 py-4 text-right">
                  <div className="col-9 mb-2">
                    <Typography variant="body1">
                      Ease Of Establishment
                    </Typography>
                  </div>
                  <div className="col-3 mb-2">
                    {getRating(crop["Ease of Establishment"])}
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">Establishes Quickly</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    {getRating(crop["Establishes Quickly"])}
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">Early Spring Growth</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    {getRating(crop["Early Spring Growth"])}
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">Flowering Trigger</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {crop["Flowering Trigger"]}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">Root Architecture</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    {crop["Root Architecture"].map((val, index) => (
                      <div className="blue-bg bordered" key={index}>
                        <Typography variant="body1" className="text-capitalize">
                          {val}
                        </Typography>
                      </div>
                    ))}
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">Root Depth</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {crop["Root Depth"]}
                      </Typography>
                    </div>
                  </div>
                  {crop["Inoculant Type (Legumes Only)"] ? (
                    <Fragment>
                      <div className="col-9 mb-2">
                        <Typography variant="body1">Inoculant Type</Typography>
                      </div>
                      <div className="col-3 mb-2">
                        {crop["Inoculant Type (Legumes Only)"].map(
                          (val, index) => (
                            <div className="blue-bg bordered" key={index}>
                              <Typography
                                variant="body1"
                                className="text-capitalize"
                              >
                                {val}
                              </Typography>
                            </div>
                          )
                        )}
                      </div>
                    </Fragment>
                  ) : (
                    ""
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="col-6 basicAgWrapper">
          <div
            className="col-12 otherHeaderRow p-0"
            style={{ marginTop: "1em" }}
          >
            <Accordion defaultExpanded style={{ border: "1px solid #2b7b79" }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography
                  variant="h6"
                  className="px-3 py-2"
                  style={{ border: "0px" }}
                >
                  Planting
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="row col-12 py-4 text-right">
                  <div className="col-9 mb-2">
                    <Typography variant="body1">Seeds Per Lb</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {crop["Seeds per Pound"]}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">Seed Price Per Lb</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg no-bg">
                      <RenderSeedPriceIcons
                        val={crop["Seed Price per Pound"]}
                      />
                    </div>
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">
                      Base Seeding Rate (Lbs/A)
                    </Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {`${crop["Base Seeding Rate Min (lbs/A)"]} - ${crop["Base Seeding Rate Max (lbs/A)"]}`}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">Drilled Depth</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {`${crop["Drilled Depth Min"]}" - ${crop["Drilled Depth Max"]}"`}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">Can Aerial Seed?</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {crop["Aerial Seeding"] ? "Yes" : "No"}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">Can Frost Seed?</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {crop["Frost Seeding"] ? "Yes" : "No"}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">
                      Min Germination Temp (&deg;F)
                    </Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {crop["Min Germination Temp (F)"]}
                      </Typography>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="col-6 basicAgWrapper">
          <div
            className="col-12 otherHeaderRow p-0"
            style={{ marginTop: "1em" }}
          >
            <Accordion defaultExpanded style={{ border: "1px solid #2b7b79" }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography
                  variant="h6"
                  className="px-3 py-2"
                  style={{ border: "0px" }}
                >
                  Termination
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="row col-12 py-4 text-right">
                  <div className="col-9 mb-2">
                    <Typography variant="body1">
                      Tillage At Vegetative
                    </Typography>
                  </div>
                  <div className="col-3 mb-2">
                    {getRating(crop["Tillage at Vegetative"])}
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">
                      Tillage At Flowering
                    </Typography>
                  </div>
                  <div className="col-3 mb-2">
                    {getRating(crop["Tillage at Flowering"])}
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">
                      Freezing At Vegetative
                    </Typography>
                  </div>
                  <div className="col-3 mb-2">
                    {getRating(crop["Freezing at Vegetative"])}
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">
                      Freezing At Flowering
                    </Typography>
                  </div>
                  <div className="col-3 mb-2">
                    {getRating(crop["Freezing at Flowering"])}
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">
                      Chemical At Vegetative
                    </Typography>
                  </div>
                  <div className="col-3 mb-2">
                    {getRating(crop["Chemical at Vegetative"])}
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">
                      Chemical At Flowering
                    </Typography>
                  </div>
                  <div className="col-3 mb-2">
                    {getRating(crop["Chemical at Flowering"])}
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">Mow At Flowering</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    {getRating(crop["Mow at Flowering"])}
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">
                      Roller-Crimp At Flowering
                    </Typography>
                  </div>
                  <div className="col-3 mb-2">
                    {getRating(crop["Roller Crimp at Flowering"])}
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="col-6 basicAgWrapper">
          <div
            className="col-12 otherHeaderRow p-0"
            style={{ marginTop: "1em" }}
          >
            <Accordion defaultExpanded style={{ border: "1px solid #2b7b79" }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography
                  variant="h6"
                  className="px-3 py-2"
                  style={{ border: "0px" }}
                >
                  Planting Dates
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="row col-12 py-4 text-right">
                  <div className="col-9 mb-2">
                    <Typography variant="body1">Frost Seeding</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {crop["Frost Seeding"]
                          ? `${moment(crop["Frost Seeding Start"], "YYYY-MM-DD")
                              .format("MM/DD")
                              .toString()} - ${moment(
                              crop["Frost Seeding End"],
                              "YYYY-MM-DD"
                            )
                              .format("MM/DD")
                              .toString()}`
                          : "N/A"}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">
                      Reliable Establishment
                    </Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {getMonthDayString("reliable", crop)}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">
                      Temperature/Moisture Risk
                    </Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {getMonthDayString("temperature", crop)}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-9 mb-2">
                    <Typography variant="body1">Can Interseed</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {crop["Interseed possible"] ? "Yes" : "N/A"}
                      </Typography>
                    </div>
                  </div>
                  <table style={{ width: "100%", height: "40px" }}>
                    <tbody>
                      <tr>
                        {allMonths.map((month, index) => (
                          <GrowthWindowComponent
                            from="tableAll"
                            data={crop}
                            key={index}
                            id={`growthCell${index}`}
                            month={index}
                          />
                        ))}
                      </tr>
                      <tr>
                        {allMonths.map((month, index) => (
                          <td key={index}>{month}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InformationSheetContent;

const DummyText = () => {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. At imperdiet dui accumsan sit. Adipiscing tristique risus nec feugiat in fermentum posuere urna. Porta non pulvinar neque laoreet suspendisse interdum. Malesuada fames ac turpis egestas integer eget. Eget arcu dictum varius duis at consectetur lorem donec massa. Congue nisi vitae suscipit tellus mauris a diam maecenas sed. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Neque viverra justo nec ultrices dui sapien eget mi proin. Egestas maecenas pharetra convallis posuere. Tortor condimentum lacinia quis vel eros donec. Ultricies integer quis auctor elit sed. Nisi scelerisque eu ultrices vitae auctor eu. Eget felis eget nunc lobortis mattis aliquam faucibus. Mattis aliquam faucibus purus in massa tempor nec.";
};
const getMonthDayString = (type = "", crop = {}) => {
  switch (type) {
    case "reliable": {
      const startDate = moment(
        crop["Reliable Establishment/Growth Start"],
        "YYYY-MM-DD"
      );
      const endDate = moment(
        crop["Reliable Establishment/Growth End"],
        "YYYY-MM-DD"
      );

      return `${startDate.format("MM/DD")} - ${endDate.format("MM/DD")}`;
    }
    case "temperature": {
      return "N/A";
    }
    default:
      return "";
  }
};
