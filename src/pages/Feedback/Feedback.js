/*
  This file contains the FeedbackComponent component, helper functions
  The FeedbackComponent page is a static page that shows an airtable form
*/

import React, { useEffect, useContext, useState } from 'react';
import ReactGA from 'react-ga';
import {
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Snackbar,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
  FormControl,
} from '@mui/material';
import Header from '../Header/Header';
import { Context } from '../../store/Store';

const FeedbackComponent = () => {
  const { state } = useContext(Context);
  const [snackbarData, setSnackbarData] = useState({ open: false, message: '', color: '' });
  const [feedbackData, setFeedbackData] = useState({
    repository: 'dst-feedback',
    title: '',
    comments: '',
    labels: [],
    screenshot: null,
    name: '',
    email: '',
  });
  const topicOptions = [
    'About the Cover Crop Data',
    'About the Website',
    'Other',
  ];
  const isDisabled = feedbackData.title === '' || feedbackData.comments === '' || feedbackData.topic === '';

  useEffect(() => {
    if (state.consent === true) {
      ReactGA.initialize('UA-181903489-1');

      ReactGA.pageview('feedback');
    }
  }, [state.consent]);

  useEffect(() => {
    document.title = 'Feedback';
  }, []);

  const handleScreenshotUpload = (event) => {
    setFeedbackData({ ...feedbackData, screenshot: event.target.files[0] });
  };

  const handleDropdownChange = (event) => {
    const {
      target: { value },
    } = event;
    setFeedbackData({
      ...feedbackData,
      // On autofill we get a stringified value.
      labels: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleTextInputChange = (event, propertyName) => {
    setFeedbackData({ ...feedbackData, [propertyName]: event.target.value });
  };

  const handleSnackbarClose = () => {
    setSnackbarData({ ...snackbarData, open: false });
  };

  const handleSubmit = () => {
    fetch('https://developfeedback.covercrop-data.org/v1/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    })
      .then((response) => {
        if (response.status === 201) {
          setSnackbarData({
            open: true,
            message: 'Feedback Successfully Submitted!',
            color: 'green',
          });
        } else if (response.status === 400) {
          setSnackbarData({
            open: true,
            message: `Error ${response.status}. Bad Request`,
            color: 'red',
          });
        } else if (response.status === 422) {
          setSnackbarData({
            open: true,
            message: `Error ${response.status}. Unprocessable Entry`,
            color: 'red',
          });
        } else if (response.status === 500) {
          setSnackbarData({
            open: true,
            message: `Error ${response.status}. Internal Server Error`,
            color: 'red',
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Header />
      <Grid
        container
        rowSpacing={5}
        style={{
          paddingLeft: '10%',
          paddingRight: '10%',
          paddingTop: '3%',
          paddingBottom: '3%',
        }}
      >
        {/* Title */}
        <Grid container item spacing={1} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h3">NECCC Species Selector Feedback</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Beta-Testing Feedback</Typography>
          </Grid>
        </Grid>

        {/* Feedback Title */}
        <Grid container item spacing={1} justifyContent="flex-start" alignItems="flex-start">
          <Grid item xs={12}>
            <Typography variant="h6" display="inline-block">Feedback Title</Typography>
            <Typography variant="h6" display="inline-block" style={{ color: 'red' }}>
              *
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Give your feedback a short descriptive title.</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Enter Your Title"
              variant="outlined"
              onChange={(event) => handleTextInputChange(event, 'title')}
            />
          </Grid>
        </Grid>

        {/* Feedback Messsage */}
        <Grid container item spacing={1} justifyContent="flex-start" alignItems="flex-start">
          <Grid item xs={12}>
            <Typography variant="h6" display="inline-block">Feedback Message </Typography>
            <Typography variant="h6" display="inline-block" style={{ color: 'red' }}>
              *
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Explain your feedback as thoroughly as you can. Your feedback will help us improve the
              species selection experience. You can attach a screenshot of your feedback below.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Enter Your Feedback"
              multiline
              variant="outlined"
              fullWidth
              minRows={3}
              onChange={(event) => handleTextInputChange(event, 'comments')}
            />
          </Grid>
        </Grid>

        {/* Feedback Topic */}
        <Grid container item spacing={1} justifyContent="flex-start" alignItems="flex-start">
          <Grid item xs={12}>
            <Typography variant="h6" display="inline-block">Feedback Topic </Typography>
            <Typography variant="h6" display="inline-block" style={{ color: 'red' }}>
              *
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">What is this feedback about?</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ minWidth: 250 }}>
              <InputLabel id="topic-dropdown-label">Select at least one option</InputLabel>
              <Select
                labelId="topic-dropdown-label"
                id="topic-dropdown"
                multiple
                required
                autoWidth
                value={feedbackData.labels}
                onChange={handleDropdownChange}
                input={<OutlinedInput label="Select at least one option" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {topicOptions.map((topic) => (
                  <MenuItem key={topic} value={topic}>
                    <Checkbox checked={feedbackData.labels.indexOf(topic) > -1} />
                    <ListItemText primary={topic} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Screenshot */}
        <Grid container item spacing={1} justifyContent="flex-start" alignItems="flex-start">
          <Grid item xs={12}>
            <Typography variant="h6">Screen Shot Upload</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Upload a screenshot demonstrating your feedback. We welcome marked up screenshots to
              further your point.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="file"
              onChange={handleScreenshotUpload}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>
        </Grid>

        {/* Name */}
        <Grid container item spacing={1} justifyContent="flex-start" alignItems="flex-start">
          <Grid item xs={12}>
            <Typography variant="h6">Name </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Enter Name"
              variant="outlined"
              onChange={(event) => handleTextInputChange(event, 'name')}
            />
          </Grid>
        </Grid>

        {/* Email */}
        <Grid container item spacing={1} justifyContent="flex-start" alignItems="flex-start">
          <Grid item xs={12}>
            <Typography variant="h6">Email </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Enter Email"
              variant="outlined"
              onChange={(event) => handleTextInputChange(event, 'email')}
            />
          </Grid>
        </Grid>

        {/* Submit */}
        <Grid container item spacing={1} justifyContent="flex-start" alignItems="flex-start">
          {isDisabled && (
            <Grid item xs={12}>
              <Typography variant="body1">
                You are missing one or more required fields. Please fill all required fields before submitting.
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button disabled={isDisabled} onClick={handleSubmit} size="large">
              Submit
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          open={snackbarData.open}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          message={snackbarData.message}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          color={snackbarData.color}
        />
      </Grid>
    </>
  );
};

export default FeedbackComponent;
