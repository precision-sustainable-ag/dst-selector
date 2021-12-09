/*
  Contains the soil drainage timeline component in the information 
  styled using CustomStyles from ../../shared/constants
*/

import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { CustomStyles } from "../../shared/constants";
import { Typography } from "@material-ui/core";

const SoilDrainageTimeline = ({ drainage = [] }) => {
  const drainageClasses = [
    "Very poorly drained",
    "Poorly drained",
    "Somewhat poorly drained",
    "Moderately well drained",
    "Well drained",
    "Excessively drained",
    "Saturated muck",
    "Well drained muck",
  ];
  //   const classIntersection = drainageClasses.filter((x) => drainage.includes(x));
  //   console.log(classIntersection);
  return (
    <Timeline align="right">
      {drainageClasses.map((drainageClass, index) => {
        const fullLength = drainageClasses.length;
        return (
          <TimelineItem key={index}>
            <TimelineSeparator>
              {drainage.includes(drainageClass) ? (
                <TimelineDot
                  style={{
                    backgroundColor: CustomStyles().progressColor,
                  }}
                />
              ) : (
                ""
              )}
              {index === fullLength ? "" : <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent className="text-capitalize">
              {drainage.includes(drainageClass) ? (
                <Typography variant="body1" className="font-weight-bold">
                  {drainageClass}
                </Typography>
              ) : (
                <Typography variant="body1">{drainageClass}</Typography>
              )}
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default SoilDrainageTimeline;
