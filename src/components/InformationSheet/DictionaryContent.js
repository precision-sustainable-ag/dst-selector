import React, { useState, useEffect, Fragment, useMemo } from "react";
import { Typography } from "@material-ui/core";

const DictionaryContent = ({ dictData = [{}] }) => {
  const [groupedCats, setGroupedCats] = useState({});

  const groupBy = (arr, property) => {
    return arr.reduce((acc, cur) => {
      acc[cur[property]] = [...(acc[cur[property]] || []), cur];
      return acc;
    }, {});
  };

  const allCats = useMemo(() => {
    return dictData.filter(
      (dict) =>
        dict["Information Sheet"] === "checked" ||
        dict["Infromation Sheet"] === "checked"
    );
  }, [dictData]);

  useEffect(() => {
    const groupedCategories = groupBy(allCats, "Category");
    setGroupedCats(groupedCategories);
  }, [allCats]);

  const RenderCats = () => {
    const catOptions = Object.keys(groupedCats).map((key, index) => (
      <div className="row col-12" key={index}>
        <div className="col-12">
          <Typography variant="h6"> {key}</Typography>
        </div>
        {groupedCats[key].map((innerCat, index2) => (
          <div className="col-6" key={index2}>
            <Typography variant="body1" className="p-3">
              <b>{innerCat["Variable"]}:</b> {innerCat["Description"]}
            </Typography>
          </div>
        ))}
      </div>
    ));

    return catOptions;
  };

  return (
    <div className="row pt-4 dictionaryContentWrapper">
      {Object.keys(groupedCats).length > 0 ? <RenderCats /> : ""}
    </div>
  );
};

export default DictionaryContent;
