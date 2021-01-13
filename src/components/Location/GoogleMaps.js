import React, { useContext, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { googleApiKey } from "../../shared/keys";
import { Context } from "../../store/Store";
import "../../styles/googleMaps.scss";
import { Room } from "@material-ui/icons";
import { CustomStyles } from "../../shared/constants";

const GoogleMaps = ({
  center = { lat: 40.78489145, lng: -74.80733626930342 },
  zoom = 13,
}) => {
  const [state, dispatch] = useContext(Context);

  const getMapOptions = (maps) => {
    return {
      streetViewControl: false,
      scaleControl: true,
      fullscreenControl: false,
      styles: [
        {
          featureType: "all",
          elementType: "labels",
          stylers: [
            {
              visibility: "on",
            },
          ],
        },
      ],
      gestureHandling: "greedy",
      disableDoubleClickZoom: true,
      minZoom: 11,
      maxZoom: 18,

      mapTypeControl: true,
      mapTypeId: maps.MapTypeId.SATELLITE,
      mapTypeControlOptions: {
        style: maps.MapTypeControlStyle.VERTICAL_BAR,
        position: maps.ControlPosition.TOP_LEFT,
        mapTypeIds: [
          maps.MapTypeId.ROADMAP,
          maps.MapTypeId.SATELLITE,
          maps.MapTypeId.HYBRID,
        ],
      },

      zoomControl: true,
      clickableIcons: false,
    };
  };

  const [showMarker, setShowMarker] = useState(false);

  useEffect(() => {
    if (state.markers.length > 1) {
      setShowMarker(false);
    } else {
      setShowMarker(true);
    }
  }, [state.markers]);
  const mapChange = (e) => {
    console.log(e);
  };
  const drawSVG = () => {};
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        options={(map) => ({
          mapTypeId: map.MapTypeId.HYBRID,
          mapTypeControl: false,
          styles: [
            {
              featureType: "all",
              elementType: "labels",
              stylers: [
                {
                  visibility: "on",
                },
              ],
            },
          ],
        })}
        bootstrapURLKeys={{
          key: googleApiKey,
          libraries: ["places", "geometry", "drawing"],
          language: "EN",
          region: "US",
        }}
        center={state.markers[0]}
        zoom={13}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onChange={mapChange}
        // onGoogleApiLoaded={(google) => {
        //   const map = google.map;
        //   const drawingManager = new google.maps.drawing.DrawingManager({
        //     drawingMode: google.maps.drawing.OverlayType.MARKER,
        //     drawingControl: true,
        //     drawingControlOptions: {
        //       position: google.maps.ControlPosition.TOP_CENTER,
        //       drawingModes: [
        //         google.maps.drawing.OverlayType.MARKER,
        //         // google.maps.drawing.OverlayType.CIRCLE,
        //         google.maps.drawing.OverlayType.POLYGON,
        //         // google.maps.drawing.OverlayType.POLYLINE,
        //         // google.maps.drawing.OverlayType.RECTANGLE,
        //       ],
        //     },
        //     markerOptions: {
        //       icon:
        //         "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        //     },
        //     polygonOptions: {
        //       fillColor: CustomStyles().progressColor,
        //       fillOpacity: 0.6,
        //       strokeWeight: 5,
        //       clickable: false,
        //       editable: true,
        //       zIndex: 1,
        //     },
        //   });
        //   drawingManager.setMap(map);
        // }}
      >
        {state.markers.length === 1 && showMarker ? (
          <GMarker
            lat={state.markers[0][0]}
            lng={state.markers[0][1]}
            text="My Location"
          />
        ) : (
          drawSVG()
        )}
      </GoogleMapReact>
    </div>
  );
};

const GMarker = (props) => {
  return (
    <div>
      {/* <span>{props.text}</span> */}
      <Room className="marker" fontSize="large" style={{}} />
    </div>
  );
};
export default GoogleMaps;
