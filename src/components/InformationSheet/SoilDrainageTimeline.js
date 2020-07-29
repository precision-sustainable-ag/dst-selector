import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { CustomStyles } from "../../shared/constants";

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
      {drainageClasses.map((classes, index) => {
        const fullLength = drainageClasses.length;
        return (
          <TimelineItem key={index}>
            <TimelineSeparator>
              {drainage.includes(classes) ? (
                <TimelineDot
                  style={{
                    backgroundColor: CustomStyles().progressColor,
                  }}
                />
              ) : (
                <TimelineDot />
              )}
              {index === fullLength - 1 ? "" : <TimelineConnector />}
            </TimelineSeparator>

            {drainage.includes(classes) ? (
              <TimelineContent className="text-capitalize font-weight-bold">
                {classes}
              </TimelineContent>
            ) : (
              <TimelineContent className="text-capitalize">
                {classes}
              </TimelineContent>
            )}
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default SoilDrainageTimeline;
