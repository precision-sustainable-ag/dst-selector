import React from 'react';
import { Typography } from '@mui/material';

const RenderExtendedComments = ({ crop = {} }) => {
  const allKeysWithNotes = Object.keys(crop)
    .filter((key) => key.includes('Notes:'))
    .map((str) => ({ key: str, name: str.split(':')[1].trimStart() }));

  return allKeysWithNotes.length > 0 ? (
    <div className="row">
      {allKeysWithNotes.map((obj, index) => (
        <div key={`notesKey-${index}`} className="col-12">
          <Typography variant="body1" className="p-3">
            <b>
              {obj.name}
              :
            </b>
            {crop[obj.key]}
          </Typography>
        </div>
      ))}
    </div>
  ) : (
    <div className="row">
      <div className="col-12">
        <Typography variant="body1" className="p-3">
          No Data
        </Typography>
      </div>
    </div>
  );
};

export default RenderExtendedComments;
