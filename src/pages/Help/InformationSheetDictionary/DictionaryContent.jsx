/*
  Contains the data listed in InformationSheetContent
  RenderCats renders the categories
*/

import { Grid, Typography } from '@mui/material';

const DictionaryContent = ({ dictData = [{}], from = '' }) => {
  const getGridItem = (att) => {
    if (att.description?.length > 0) {
      return (
        <Grid
          size={{
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
            xl: 6,
          }}
        >
          <Typography variant="body1" key={att.id}>
            <b>{att.label}:</b> {att.description}
          </Typography>
        </Grid>
      );
    }
    return <div />;
  };

  const RenderCats = () =>
    dictData.map((catData) => (
      <Grid
        container
        key={catData.id}
        size={{
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12,
        }}
      >
        <Typography
          variant="h6"
          style={
            from === 'help'
              ? { border: '0px', borderBottom: '1px solid gray', width: '100%' }
              : { width: '100%' }
          }
          ml={2}
          mr={4}
        >
          {catData.label}
        </Typography>
        {catData.attributes.map((att) => getGridItem(att))}
      </Grid>
    ));

  return dictData.length > 0 ? <RenderCats /> : '';
};

export default DictionaryContent;
