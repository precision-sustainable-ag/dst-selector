import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";
import crops from "../shared/crop-data.json";

const tjson = crops;
let tjs = tjson.map((crop) => {
  // val["fields"] = val;
  let val = { fields: crop };
  // console.log(val);

  val.fields["Discourages Nematodes"] = val.fields["Disoucrages Nematodes"];
  val.fields["id"] = val.fields["__id"];
  val.fields["Drought"] = val.fields["Drought Tolerance"];
  val.fields["Flood"] = val.fields["Flood Tolerance"];
  val.fields["Heat"] = val.fields["Heat Tolerance"];
  val.fields["Low Fertility"] = val.fields["Low Fertility Tolerance"];
  val.fields["Salinity"] = val.fields["Salinity Tolerance"];
  val.fields["Shade"] = val.fields["Shade Tolerance"];
  val.fields["Tillage at Vegetative"] =
    val.fields["Tillage Termination at Vegetative"];
  val.fields["Tillage at Flowering"] =
    val.fields["Tillage Termination at Flowering"];
  val.fields["Freezing at Vegetative"] =
    val.fields["Freezing Termination at Vegetative"];
  val.fields["Chemical at Vegetative"] =
    val.fields["Chemical Termination at Vegetative"];
  val.fields["Mow at Flowering"] = val.fields["Mow Termination at Flowering"];
  val.fields["Roller Crimp at Flowering"] =
    val.fields["Roller Crimp Tolerance at Flowering"];

  if (!val.fields["Frost Seeding"]) {
    val.fields["Frost Seeding"] = -999;
  }
  if (!val.fields["Aerial Seeding"]) {
    val.fields["Aerial Seeding"] = -999;
  }

  if (!val.fields["Pollinator Habitat"]) {
    val.fields["Pollinator Habitat"] = 0;
  }
  if (!val.fields["Pollinator Food"]) {
    val.fields["Pollinator Food"] = 0;
  }

  // not mutating

  // delete val.fields["Drought Tolerance"];
  // delete val.fields["Flood Tolerance"];
  // delete val.fields["Heat Tolerance"];
  // delete val.fields["Low Fertility Tolerance"];
  // delete val.fields["Salinity Tolerance"];
  // delete val.fields["Shade Tolerance"];

  return val;
});

// console.log(tjs);

// const StoreContext = createContext();

const initialState = {
  // progress: 3,
  progress: 5,
  // address: "",
  address: "",
  addressSearchPreference: "address",
  zip: 0,
  markersCopy: [],
  markers: [[39.0255, -76.924]],
  // markers: [
  //   [39.025872701277045, -76.919398766395],
  //   [39.02453911720003, -76.92171701589375],
  //   [39.02343889139721, -76.92030030786674],
  //   [39.02518924258037, -76.9176171487247],
  // ],
  // markers: [[35.76422, 78.69976]],
  showAddressChangeBtn: false,
  selectedCheckboxes: [],
  selectedStars: {},
  allGoals: [],
  // allGoals: [
  //   {
  //     id: "rec4LcUaBDq5GCcXL",
  //     fields: {
  //       "Cover Crop Goal": "Lasting residue",
  //       Description:
  //         "Rates the effectiveness of the cover crop in providing a long-lasting mulch.",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recJPIQ6aEjfOtTgF",
  //         "recMjAddemfDnNFqI"
  //       ],
  //       "Thinking about Rules":
  //         "Dry matter - high, C to N ratio - high (3 star)",
  //       Notes:
  //         "Since this has the same consituent variables as Improve soil organic matter, could they be lumped together some how?",
  //       "Constituent Variables Priorities": "C to N Ratio, Dry Matter (lbs/A/y)"
  //     },
  //     createdTime: "2019-08-19T16:53:43.000Z"
  //   },
  //   {
  //     id: "rec7y2ybQxIFdIjbC",
  //     fields: {
  //       "Cover Crop Goal": "Nitrogen scavenging",
  //       Description:
  //         "Rates a cover crop’s ability to take up and store excess nitrogen. Bear in mind that the sooner you plant a cover after main crop harvest—or overseed a cover into the standing crop—the more N it will be able to absorb.",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recHtDRj37jAAzNIj",
  //         "recoB4dI7D89Dc7a6",
  //         "receCQBBxMfKbWEyv",
  //         "recMjAddemfDnNFqI",
  //         "recqucMZjRgbifMQN"
  //       ],
  //       "Thinking about Rules":
  //         "Dry matter - high, early spring growth - high (4-5 stars) , establishes quickly - high (4-5 stars), root depth - deep",
  //       Notes:
  //         "In areas where precip falls as rain for most of the winter, water will percolate causing N to move more; early planting is key to scavenging in such areas (as opposed to where ground freezes hard or snow cover is mostly present.)",
  //       "Constituent Variables Priorities":
  //         "Early spring growth, Establishes quickly, Root depth, Dry Matter (lbs/A/y), Family Common Name"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "rec9qULCT41IBsVUo",
  //     fields: {
  //       "Cover Crop Goal": "TBD- Suppress pest (non-weed) & diseases",
  //       Description:
  //         "Rates how well the cover crop suppresses diseases, insects, slugs, and other non-weed pests."
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recCO2vWyryVqhr6S",
  //     fields: {
  //       "Cover Crop Goal": "Forage harvest value",
  //       Description: "Suitability as harvested forage (e.g., haylage).",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recH1sx9ffdPlprUq",
  //         "recwPtOlsZzf8eesZ"
  //       ],
  //       "Thinking about Rules":
  //         "grazing value - high (4-5 stars), harvestability - high (4-5 stars)",
  //       "Constituent Variables Priorities": "Harvestability, Grazing value"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recNPzZAnuNCjqdAb",
  //     fields: {
  //       "Cover Crop Goal": "Pollinator support",
  //       Description:
  //         "Ability to provide resources needed by beneficials (e.g., shelter, nectar)",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recwPeXH4vksA8RE6",
  //         "recjWdifpop3L0cca"
  //       ],
  //       "Thinking about Rules":
  //         "pollinator habitat - high (4-5 stars), pollinator food - high (4-5 stars)",
  //       "Constituent Variables Priorities":
  //         "Pollinator food, Pollinator habitat"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recRLXdSv7FLRTceX",
  //     fields: {
  //       "Cover Crop Goal": "Nitrogen fixation",
  //       Description:
  //         "Rates cover crops for their relative ability to supply fixed N. Limiting to Legumes.",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recHtDRj37jAAzNIj",
  //         "recMjAddemfDnNFqI",
  //         "rec9PiL8Zj2uMWfHH"
  //       ],
  //       "Thinking about Rules":
  //         "total N fixed - high (4-5 stars), dry matter - high (4-5 stars), early spring growth - high (4-5 stars)",
  //       Notes: "total N fixed needs to be converted to a rating",
  //       "Constituent Variables Priorities":
  //         "Total N Fixed (lbs/A/y)\nEarly spring growth\nDry Matter (lbs/A/y)"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recdSAmLuTKzbcwln",
  //     fields: {
  //       "Cover Crop Goal": "Good grazing",
  //       Description: "Suitability for grazing.",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recoB4dI7D89Dc7a6",
  //         "recsNm4y8moJnMzw6",
  //         "recwPtOlsZzf8eesZ"
  //       ],
  //       "Thinking about Rules":
  //         "grazing value - high (4-5 stars), grazing tolerance - high (4-5 stars), establishes quickly - high (4-5 stars)",
  //       "Constituent Variables Priorities":
  //         "Establishes quickly, Grazing tolerance, Grazing value"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recfo3LgGYl8iI4Qp",
  //     fields: {
  //       "Cover Crop Goal": "Reduces subsurface soil compaction",
  //       Description: 'Reduces compaction in the top 0-6" and/or 6-12" of soil.',
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recVLbzeOzNMAdLZD",
  //         "receCQBBxMfKbWEyv",
  //         "rec6QUh7mboLxMjHp"
  //       ],
  //       "Thinking about Rules":
  //         "loosens subsurface soil - high (4-5 stars), root depth - deep, root architecture - tap",
  //       Notes:
  //         "do cover crops need to be rated high on loosens subsurface and top soil? or just one? or the other? Also, doesnt' that impact which root architecture matters? There seems to be a bit of nuance to this.",
  //       "Constituent Variables Priorities":
  //         "Root architecture, Root depth, Loosens subsurface soil"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recifuund3Kc4UuUt",
  //     fields: {
  //       "Cover Crop Goal": "TBD- Hinder crops (anti-goal)",
  //       Description:
  //         "Rates how likely the CC is to interfere with the cash crop (e.g., through creating a poor seed bed, immobilizing soil N, etc.)",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recJPIQ6aEjfOtTgF",
  //         "recMjAddemfDnNFqI"
  //       ],
  //       "Thinking about Rules":
  //         "Dry matter - low, C to N ratio - high (5 star)",
  //       "Constituent Variables Priorities": "C to N Ratio, Dry Matter (lbs/A/y)"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recjQE8nDL7x25vg6",
  //     fields: {
  //       "Cover Crop Goal": "Weed suppression",
  //       Description:
  //         "Rates how well the cover crop out-competes weeds by any means through its life cycle, including killed residue. || opposite description: \n[Risk that a cover crop could become a weed, either due to hard seed or due to flowering/setting seed that volunteers in later seasons; made worse when herbicide resistance is a known feature of the cover crop species/cultivar]",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recJPIQ6aEjfOtTgF",
  //         "recJ7JmQiCQKcgZD2",
  //         "recoB4dI7D89Dc7a6",
  //         "recMjAddemfDnNFqI"
  //       ],
  //       "Thinking about Rules":
  //         "Dry matter - high,  C to N - high, establishes quickly - high (4-5 stars), shape and orientation - ?",
  //       "Constituent Variables Priorities":
  //         "C to N Ratio, Shape & Orientation, Establishes quickly, Dry Matter (lbs/A/y)"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recneO0wlTb4t0KdC",
  //     fields: {
  //       "Cover Crop Goal": "Promote water quality",
  //       Description: "Improve or maintain water quality.",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "receCQBBxMfKbWEyv",
  //         "recVLbzeOzNMAdLZD",
  //         "recyMjvRTKgxpvVoX",
  //         "recJPIQ6aEjfOtTgF",
  //         "rec9vYObq3SiwL1rK",
  //         "recJ7JmQiCQKcgZD2",
  //         "recxcF1h42PcoEyAz",
  //         "recoB4dI7D89Dc7a6",
  //         "recHtDRj37jAAzNIj",
  //         "recMjAddemfDnNFqI"
  //       ],
  //       "Thinking about Rules":
  //         "Dry matter - high, early spring growth - high (4-5 stars) , establishes quickly - high (4-5 stars), Supports Mycorrhizae - high (4 and 5 stars), [goals: nitrogen scavenging, prevents soil erosion]",
  //       "Constituent Variables Priorities":
  //         "Root depth, Root architecture, Winter Survival, C to N Ratio, Growing window, Shape & Orientation, Supports mycorrhizae, Establishes quickly, Early spring growth, Dry Matter (lbs/A/y)"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recrZZvnT6xhPfTdN",
  //     fields: {
  //       "Cover Crop Goal": "Prevent soil erosion",
  //       Description:
  //         "Rates how extensive and how quickly a root system develops, how well it holds soil against sheet and water erosion and the influence the growth habit may have on fighting water erosion.",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recVLbzeOzNMAdLZD",
  //         "recJ7JmQiCQKcgZD2",
  //         "recyMjvRTKgxpvVoX",
  //         "recJPIQ6aEjfOtTgF",
  //         "rec9vYObq3SiwL1rK",
  //         "recMjAddemfDnNFqI"
  //       ],
  //       "Thinking about Rules":
  //         "Dry matter - high, growing window - long, C to N - high, winter survival - expected, shape and orientation -?, root architecture - fibrous",
  //       Notes: "Don't know how shape and orientation impact this.",
  //       "Constituent Variables Priorities":
  //         "Root architecture, Shape & Orientation, Winter Survival, C to N Ratio, Growing window, Dry Matter (lbs/A/y)"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recsQbgLYFneFwXyr",
  //     fields: {
  //       "Cover Crop Goal": "Reduces topsoil compaction",
  //       Description: 'Reduces compaction in the top 0-6" and/or 6-12" of soil.',
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recVLbzeOzNMAdLZD",
  //         "receCQBBxMfKbWEyv",
  //         "recLlVSvSYfmF7PZV"
  //       ],
  //       "Thinking about Rules":
  //         "loosens topsoil - high (4-5 stars), root depth - deep, root architecture - fibrous",
  //       Notes:
  //         "do cover crops need to be rated high on loosens subsurface and top soil? or just one? or the other? Also, doesnt' that impact which root architecture matters? There seems to be a bit of nuance to this.",
  //       "Constituent Variables Priorities":
  //         "Root architecture, Root depth, Loosens topsoil"
  //     },
  //     createdTime: "2019-10-28T19:23:21.000Z"
  //   },
  //   {
  //     id: "recvb8xD7c7teakpI",
  //     fields: {
  //       "Cover Crop Goal": "Improve soil organic matter",
  //       Description:
  //         "Rates a cover crop’s ability to produce organic matter and improve soil structure. The ratings assume that you plan to use cover crops regularly in your cropping system to provide ongoing additions to soil organic matter. Think quality and quantity.",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recJPIQ6aEjfOtTgF",
  //         "recMjAddemfDnNFqI"
  //       ],
  //       "Thinking about Rules":
  //         "5 stars: Dry matter = 3, C to N ratio = 2; 4 stars: Dry matter = 3 and C to N ratio = 3, or Dry matter = 2 and C to N ratio = 2; 3 stars: Dry matter = 2 and C to N ratio = 3;  2 stars: Dry matter = 2 and C to N ratio = 1; 1 star: Dry matter = 1 and C to N ratio = 1",
  //       Notes:
  //         "Convert dry matter to a rating. C to N is currently a 3 star rating.",
  //       "Constituent Variables Priorities": "C to N Ratio, Dry Matter (lbs/A/y)"
  //     },
  //     createdTime: "2019-08-19T16:53:43.000Z"
  //   },
  //   {
  //     id: "recwKWXsn8Xg5vdSI",
  //     fields: {
  //       "Cover Crop Goal": "Increase soil aggregation",
  //       Description: "Stability rather high turnover.",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recVLbzeOzNMAdLZD",
  //         "recxcF1h42PcoEyAz"
  //       ],
  //       "Thinking about Rules":
  //         "Supports Mycorrhizae - high (4 and 5 stars), root architecture - fibrous",
  //       "Constituent Variables Priorities":
  //         "Root architecture, Supports mycorrhizae"
  //     },
  //     createdTime: "2019-08-19T16:53:43.000Z"
  //   }
  // ],
  cropData: tjs,
  // selectedCrops: [],
  selectedCrops: [
    {
      id: "recDZFUe7kHsbhSGn",
      cropName: "Ryegrass, Annual",
      btnId: "cartBtn0",
      data: {
        _id: {
          $oid: "5f0607732241843e7da82c0c",
        },
        "Cover Crop Name": "Ryegrass, Annual",
        "Scientific Name": "Lolium multiflorum",
        "cv, var, or ssp to specify": "Italian Ryegrass",
        "Notes: Taxonomy":
          "Scientific name quandry! Lolium multiflorum deprecated: https://www.calflora.org/cgi-bin/species_query.cgi?where-taxon=Festuca+perennis",
        Origin: "MCCC Species tool",
        "Common Mixes": [
          "rec2lOtMp89DPlVk5",
          "recazjIkURftIEMrh",
          "recYVvnzarw6FnLvt",
          "rec82O0WEfDEsMU6M",
          "recHCKeKAh0r8cQGO",
        ],
        "Drought Tolerance": 2,
        "Shade Tolerance": 4,
        "Flood Tolerance": 4,
        "Low Fertility Tolerance": 2,
        "Salinity Tolerance": 2,
        "Winter Survival": ["Expected"],
        "Notes: Environmental Tolerances":
          "Does very poorly under low-N conditions like most grasses.",
        "Active Growth Period": ["Winter", "Spring", "Summer", "Fall"],
        Duration: ["Annual"],
        "Shape & Orientation": ["Erect"],
        "Review Status": "Zone Team Start",
        "Soil Drainage": [
          "Poorly drained",
          "Somewhat poorly drained",
          "Moderately well drained",
          "Well drained",
          "Saturated muck",
          "Well drained muck",
        ],
        "Min Germination Temp (F)": 40,
        "Seeds per Pound": 230000,
        "Inoculant Type (Legumes Only)": ["none"],
        "Seeding Rate: Broadcast (w/cultivation) (lbs/A)": "14-22",
        "Seeding Rate: Drilled (lbs/A)": "12-40",
        "Seeding Rate: Aerial (lbs/A)": "15-24",
        "Drilled Depth Min": 0.25,
        "Loosens Topsoil": 4,
        "Frees P & K": 3,
        "Growing Window": "Short",
        "Ease of Establishment": 3,
        "Family Common Name": "Grass family",
        "Family Scientific Name": "Poaceae",
        "Soil Textures": ["coarse", "medium", "fine"],
        "Minimum Tolerant Soil pH": 6,
        "Maximum Tolerant Soil pH": 8,
        "Soil Moisture Use": "Medium",
        "Cover Crop Group": "Grass",
        "Heat Tolerance": 3,
        "Seed Price per Pound": 2,
        "Can Aerial Seed": true,
        "USDA Symbol": "LOMU",
        "Zone Decision": "Include",
        "Zone Use": "Common",
        "Shape & Orientation-USDA PLANTS": "Erect",
        "Flooding Tolerance": "Good",
        "Nitrogen Accumulation Min, Legumes (lbs/A/y)": 0,
        "Dry Matter Min (lbs/A/y)": 1000,
        "C to N Ratio": 3,
        "Active Growth Period-USDA PLANTS": ["Fall", "Spring"],
        "Notes: Termination [Goal: Method: Timing]":
          'Herbicide resistance has been documented in annual ryegrass. If using tillage, multiple passes may be necessary. Mow to 6" height to improve likelihood of winter survival.',
        "Loosens Subsurface Soil": 3,
        "Supports Mycorrhizae": 4,
        "Early Spring Growth": 3,
        "Flowering Trigger": ["Long day (>14 hours)"],
        "Establishes Quickly": 3,
        "Root Architecture": ["Fibrous"],
        "Root Depth": "Medium",
        "Notes: Growth, Roots, and Nutrients":
          "Minimum Germination Temp. ~ 40˚F",
        "Tillage Termination at Vegetative": 1,
        "Tillage Termination at Flowering": 1,
        "Freezing Termination at Vegetative": 2,
        "Freezing Termination at Flowering": 4,
        "Chemical Termination at Flowering": 3,
        "Mow Termination at Flowering": 1,
        "Chemical Termination at Vegetative": 3,
        "Mow Tolerance at Vegetative": 3,
        "Roller Crimp Tolerance at Flowering": 1,
        "Roller Crimp Tolerance at Vegetative": 1,
        "Volunteer Establishment": 5,
        Persistence: 1,
        "Notes: Weeds":
          'If mowing, leave 3-4" to ensure regrowth;  Must be killed before it joints or after heading',
        "Seed price per acre: Drilled/Cultipack and Cultivation": 2,
        "Seed price per acre: Broadcast (w/cultivation)": 2,
        "Seed price per acre: Aerial": 2,
        "Improve Soil Organic Matter": 4,
        "Increase Soil Aggregation": 4,
        "Lasting Residue": 3,
        "Penetrates Plow Pan": 2,
        "Base Seeding Rate Min (lbs/A)": 12,
        "Base Seeding Rate Max (lbs/A)": 40,
        "Nitrogen Accumulation Max, Legumes (lbs/A/y)": 0,
        "Dry Matter Max (lbs/A/y)": 6000,
        "Drilled Depth Max": 0.5,
        "Reduces Topsoil Compaction": 5,
        "March, Early": ["Reliable establishment/growth"],
        "March, Mid": ["Reliable establishment/growth"],
        "April, Early": ["Reliable establishment/growth"],
        "April, Mid": ["Reliable establishment/growth"],
        "May, Early": ["Reliable establishment/growth"],
        "May, Mid": ["Reliable establishment/growth"],
        "June, Early": [
          "Temperature/moisture risk to establishment/growth",
          "Can interseed",
        ],
        "June, Mid": [
          "Temperature/moisture risk to establishment/growth",
          "Can interseed",
        ],
        "July, Early": ["Can interseed"],
        "July, Mid": ["Early seeding rate"],
        "August, Early": ["Early seeding rate"],
        "August, Mid": [
          "Reliable establishment/growth",
          "Standard seeding rate",
        ],
        "September, Early": [
          "Reliable establishment/growth",
          "Standard seeding rate",
        ],
        "September, Mid": [
          "Reliable establishment/growth",
          "Late seeding rate",
        ],
        "October, Early": ["Temperature/moisture risk to establishment/growth"],
        "Prevent Fall Soil Erosion": 5,
        "Prevent Spring Soil Erosion": 5,
        "Promote Water Quality": 4,
        "Nitrogen Scavenging": 4,
        "Good Grazing": 5,
        "Forage Harvest Value": 5,
        Image: [
          {
            id: "attv4K8z6tb1fe5kV",
            url:
              "https://dl.airtable.com/.attachments/d6385e2759f19e1419f6c082f592bfa3/627a6acb/Annualryegrass-mature-field-Ackroyd.JPG",
            filename: "Annual ryegrass - mature - field - Ackroyd.JPG",
            size: 2215254,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url:
                  "https://dl.airtable.com/.attachmentThumbnails/741060c0de18b471cde8cc4fe9c564a0/7966590c",
                width: 46,
                height: 36,
              },
              large: {
                url:
                  "https://dl.airtable.com/.attachmentThumbnails/45f9dca726c1469cfc7e25bdfa34e031/5009af78",
                width: 650,
                height: 512,
              },
              full: {
                url:
                  "https://dl.airtable.com/.attachmentThumbnails/058a98f788db438e13e247f6f959fb52/4ae9d753",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        "C to N Ratio - 3 stars": 3,
        "Residue Suppresses Summer Annual Weeds": 2,
        "Outcompetes Summer Annual Weeds": 4,
        "Disoucrages Nematodes": 4,
        "Promotes Nematodes": 3,
        "Discourages Pest Insects": 4,
        "Promotes Pest Insects": 3,
        "Suppresses Cash Crop Disease": 2,
        "Promotes Cash Crop Disease": 3,
        "Early Fall/Winter Seeding Rate Start": "2020-04-15",
        "Early Fall/ Winter Seeding Rate Stop": "2020-08-20",
        "Standard Fall/Winter Seeding Rate Date Start": "2020-08-20",
        "Standard Fall/Winter Seeding Rate Date End": "2020-10-15",
        "Late Fall/Winter Planting Date Start": "2020-10-15",
        "Late Fall/Winter Planting Date End": "2020-11-15",
        "Standard Spring Seeding Rate Date Start": "2020-03-15",
        "Standard Spring Seeding Rate Date End": "2020-06-15",
        "Suppresses Winter Annual Weeds": 5,
        "Reliable Establishment/Growth Start": "2020-03-15",
        "Reliable Establishment/Growth End": "2020-06-15",
        "Second Reliable Establishment/Growth Start": "2020-08-20",
        "Second Reliable Establishment/Growth End": "2020-10-15",
        "Temperature/Moisture Risk to Establishment Start": "2020-10-15",
        "Temperature/Moisture Risk to Establishment End": "2020-11-15",
        __id: "recDZFUe7kHsbhSGn",
        "Discourages Nematodes": 4,
        id: "recDZFUe7kHsbhSGn",
        Drought: 2,
        Flood: 4,
        Heat: 3,
        "Low Fertility": 2,
        Salinity: 2,
        Shade: 4,
        "Tillage at Vegetative": 1,
        "Tillage at Flowering": 1,
        "Freezing at Vegetative": 2,
        "Chemical at Vegetative": 3,
        "Mow at Flowering": 1,
        "Roller Crimp at Flowering": 1,
        "Frost Seeding": -999,
        "Aerial Seeding": -999,
        "Pollinator Habitat": 0,
        "Pollinator Food": 0,
      },
    },
    {
      id: "reckuBFcT4eLTW5Dw",
      cropName: "Oats, Spring",
      btnId: "cartBtn1",
      data: {
        _id: {
          $oid: "5f0607732241843e7da82c0d",
        },
        "Cover Crop Name": "Oats, Spring",
        "Scientific Name": "Avena sativa",
        "cv, var, or ssp to specify": "Spring cultivars",
        Origin: "MCCC Species tool",
        "Common Mixes": ["recud4Z1zxGdrNxbU"],
        "Drought Tolerance": 3,
        "Shade Tolerance": 2,
        "Flood Tolerance": 3,
        "Low Fertility Tolerance": 3,
        "Salinity Tolerance": 2,
        "Winter Survival": ["Seldom"],
        "Notes: Environmental Tolerances":
          "Does very poorly under low-N conditions like most grasses.",
        "Active Growth Period": ["Fall", "Spring"],
        Duration: ["Annual"],
        "Shape & Orientation": ["Erect"],
        "Notes: Basic Agronomics":
          "Dry matter highly dependent on planting and termination date and precipitation.  Prone to lodging in N-rich soil;  decomposition depends on maturity at kill. When planted in September will grow faster than rye. If planted early enough (e.g. after peas), it creates a very good lasting residue. Bloat potential that is easily managed. Nitrate testing of forage is recommended.",
        "Review Status": "Zone Team Start",
        "Soil Drainage": [
          "Somewhat poorly drained",
          "Moderately well drained",
          "Well drained",
          "Excessively drained",
          "Well drained muck",
        ],
        "Min Germination Temp (F)": 38,
        "Seeds per Pound": 19400,
        "Inoculant Type (Legumes Only)": ["none"],
        "Seeding Rate: Broadcast (w/cultivation) (lbs/A)": "75-125",
        "Seeding Rate: Drilled (lbs/A)": "60-100",
        "Seeding Rate: Aerial (lbs/A)": "75-125",
        "Drilled Depth Min": 0.75,
        Harvestability: 4,
        "Loosens Topsoil": 4,
        "Frees P & K": 5,
        "Growing Window": "Short",
        "Ease of Establishment": 3,
        "Family Common Name": "Grass family",
        "Family Scientific Name": "Poaceae",
        "Soil Textures": ["coarse", "fine", "medium"],
        "Minimum Tolerant Soil pH": 5.3,
        "Maximum Tolerant Soil pH": 8.5,
        "Soil Moisture Use": "Medium",
        "Cover Crop Group": "Grass",
        "Heat Tolerance": 4,
        "Seed Price per Pound": 1,
        "Can Aerial Seed": true,
        "USDA Symbol": "AVSA",
        "Zone Decision": "Include",
        "Zone Use": "Emerging",
        "Shape & Orientation-USDA PLANTS": "Erect",
        "Flooding Tolerance": "Moderate",
        "Nitrogen Accumulation Min, Legumes (lbs/A/y)": 0,
        "Dry Matter Min (lbs/A/y)": 1000,
        "C to N Ratio": 4,
        "Active Growth Period-USDA PLANTS": ["Spring", "Summer"],
        "Loosens Subsurface Soil": 1,
        "Supports Mycorrhizae": 5,
        "Early Spring Growth": 3,
        "Establishes Quickly": 4,
        "Root Architecture": ["Fibrous"],
        "Root Depth": "Medium",
        "Notes: Growth, Roots, and Nutrients":
          "Minimum Germination Temp. ~ 38˚F",
        "Tillage Termination at Vegetative": 1,
        "Grazing Value": 5,
        "Notes: Grazers & Pollinators":
          "Information too limited to rate P and K effect. Cleaned, bin-run seed will suffice; Non host for soybean cyst nematode and root knot nematode. Bears traffic very well when drilled. Some data suggest that oats were less effective at reducing marestail than barley or cereal rye.",
        "Tillage Termination at Flowering": 1,
        "Freezing Termination at Vegetative": 4,
        "Freezing Termination at Flowering": 4,
        "Chemical Termination at Flowering": 5,
        "Mow Termination at Flowering": 5,
        "Chemical Termination at Vegetative": 5,
        "Mow Tolerance at Vegetative": 5,
        "Roller Crimp Tolerance at Flowering": 5,
        "Roller Crimp Tolerance at Vegetative": 2,
        "Volunteer Establishment": 5,
        Persistence: 1,
        "Seed price per acre: Drilled/Cultipack and Cultivation": 2,
        "Seed price per acre: Broadcast (w/cultivation)": 2,
        "Seed price per acre: Aerial": 2,
        "Improve Soil Organic Matter": 3,
        "Increase Soil Aggregation": 4,
        "Lasting Residue": 3,
        "Penetrates Plow Pan": 1,
        "Base Seeding Rate Min (lbs/A)": 60,
        "Base Seeding Rate Max (lbs/A)": 100,
        "Nitrogen Accumulation Max, Legumes (lbs/A/y)": 0,
        "Dry Matter Max (lbs/A/y)": 4000,
        "Drilled Depth Max": 1.5,
        "Reduces Topsoil Compaction": 5,
        "March, Early": ["Reliable establishment/growth"],
        "March, Mid": ["Reliable establishment/growth"],
        "April, Early": ["Reliable establishment/growth"],
        "April, Mid": ["Reliable establishment/growth"],
        "August, Early": [
          "Reliable establishment/growth",
          "Early seeding rate",
        ],
        "August, Mid": ["Reliable establishment/growth", "Early seeding rate"],
        "September, Early": [
          "Reliable establishment/growth",
          "Standard seeding rate",
        ],
        "September, Mid": [
          "Reliable establishment/growth",
          "Late seeding rate",
        ],
        "October, Early": ["Reliable establishment/growth"],
        "Prevent Fall Soil Erosion": 2,
        "Prevent Spring Soil Erosion": 3,
        "Promote Water Quality": 4,
        "Nitrogen Scavenging": 4,
        "Good Grazing": 5,
        "Forage Harvest Value": 5,
        Image: [
          {
            id: "atts84eGTuVyX7gBl",
            url:
              "https://dl.airtable.com/.attachments/4aa57a28ec68ef40b55b24efcbaeaaca/9315a36d/Oats-close-up-Ackroyd.JPG",
            filename: "Oats - close-up - Ackroyd.JPG",
            size: 3199056,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url:
                  "https://dl.airtable.com/.attachmentThumbnails/b5486d63087397a509feb508932f1fd9/51413101",
                width: 57,
                height: 36,
              },
              large: {
                url:
                  "https://dl.airtable.com/.attachmentThumbnails/47d66f05742736ea3bea243dd4602e67/3c00a393",
                width: 805,
                height: 512,
              },
              full: {
                url:
                  "https://dl.airtable.com/.attachmentThumbnails/fed606fd388614aa2f3ecb2e4e02539c/c01c3511",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        "C to N Ratio - 3 stars": 1,
        "Residue Suppresses Summer Annual Weeds": 4,
        "Outcompetes Summer Annual Weeds": 4,
        "Disoucrages Nematodes": 1,
        "Promotes Nematodes": 2,
        "Discourages Pest Insects": 1,
        "Promotes Pest Insects": 2,
        "Notes: Disease & Non-Weed Pests":
          "Information too limited to rate P and K effect. Cleaned, bin-run seed will suffice; Non host for soybean cyst nematode and root knot nematode. Bears traffic very well when drilled. Some data suggest that oats were less effective at reducing marestail than barley or cereal rye.",
        "Suppresses Cash Crop Disease": 2,
        "Promotes Cash Crop Disease": 3,
        "Early Fall/Winter Seeding Rate Start": "2020-08-01",
        "Early Fall/ Winter Seeding Rate Stop": "2020-08-21",
        "Standard Fall/Winter Seeding Rate Date Start": "2020-08-01",
        "Standard Fall/Winter Seeding Rate Date End": "2020-10-15",
        "Late Fall/Winter Planting Date Start": "2020-10-15",
        "Late Fall/Winter Planting Date End": "2020-11-01",
        "Early Spring Seeding Rate Date Start": "2020-03-01",
        "Early Spring Seeding Rate Date End": "2020-05-15",
        "Standard Spring Seeding Rate Date Start": "2020-03-01",
        "Standard Spring Seeding Rate Date End": "2020-05-15",
        "Suppresses Winter Annual Weeds": 2,
        "Reliable Establishment/Growth Start": "2020-03-01",
        "Reliable Establishment/Growth End": "2020-05-15",
        "Second Reliable Establishment/Growth Start": "2020-08-01",
        "Second Reliable Establishment/Growth End": "2020-10-15",
        "Temperature/Moisture Risk to Establishment Start": "2020-10-15",
        "Temperature/Moisture Risk to Establishment End": "2020-11-01",
        __id: "reckuBFcT4eLTW5Dw",
        "Discourages Nematodes": 1,
        id: "reckuBFcT4eLTW5Dw",
        Drought: 3,
        Flood: 3,
        Heat: 4,
        "Low Fertility": 3,
        Salinity: 2,
        Shade: 2,
        "Tillage at Vegetative": 1,
        "Tillage at Flowering": 1,
        "Freezing at Vegetative": 4,
        "Chemical at Vegetative": 5,
        "Mow at Flowering": 5,
        "Roller Crimp at Flowering": 5,
        "Frost Seeding": -999,
        "Aerial Seeding": -999,
        "Pollinator Habitat": 0,
        "Pollinator Food": 0,
      },
    },
  ],
  selectedGoals: ["Good Grazing"],
  // selectedGoals: [],
  zoom: 13,
  addressVerified: false,
  snackOpen: false,
  snackVertical: "bottom",
  snackHorizontal: "right",
  snackMessage: "",
  modalOpen: false,
  modalSize: "lg", //sm,md,lg,fluid
  modalBody: {},
  addToCartBtnText: "add to list",
  zoneText: "Zone 7",
  zone: 7,
  soilData: {
    Map_Unit_Name: "",
    Drainage_Class: "",
    Flooding_Frequency: "",
    Ponding_Frequency: "",
  },

  weatherData: {
    averageFrost: {
      firstFrostDate: {
        month: "October",
        day: 21,
      },
      lastFrostDate: {
        month: "April",
        day: 20,
      },
    },
    averagePrecipitation: {
      thisMonth: 3.6, //inches
      annual: 43, //inches
    },
    frostFreeDays: 173,
  },
  myCoverCropActivationFlag: true,
  speciesSelectorActivationFlag: false,
  ajaxInProgress: false,
  cropDetailModal: false,
  greenbarExpanded: false,
  isSoilDataLoading: false,
  cashCropData: {
    name: "",
    dateRange: {
      startDate: "",
      endDate: "",
    },
  },
  weatherDataReset: false,
  filterString: "",
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};
export const Context = createContext(initialState);
export default Store;
