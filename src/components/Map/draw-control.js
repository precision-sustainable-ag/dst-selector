/*
  Handles drawing shapes (polygon) on the map component
  Styles are created using sass - stored in ../../styles/map.scss
*/

import '../../styles/map.scss';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { useControl } from 'react-map-gl';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const DrawControl = ({
  onCreate,
  onUpdate,
  onDelete,
  onSelection,
  position,
  controlFlags,
}) => {
  useControl(
    () => new MapboxDraw({
      displayControlsDefault: false,
      controls: controlFlags,
    }),
    ({ map }) => {
      map.on('draw.create', onCreate);
      map.on('draw.update', onUpdate);
      map.on('draw.delete', onDelete);
      map.on('draw.selectionchange', onSelection);
    },
    ({ map }) => {
      map.on('draw.create', onCreate);
      map.on('draw.update', onUpdate);
      map.on('draw.delete', onDelete);
      map.on('draw.selectionchange', onSelection);
    },
    {
      position,
    },
  );

  return null;
};

DrawControl.defaultProps = {
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {},
};

export default DrawControl;
