/*
  This file contains the FeedbackComponent component, helper functions
  The FeedbackComponent page is a static page that shows an airtable form
*/

import React, { useEffect, useContext, useState } from 'react';
import ReactGA from 'react-ga';
import { Grid, Typography, TextField, Select, MenuItem, Button, Snackbar } from '@mui/material';
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
  const isDisabled = feedbackData.message === '' || feedbackData.topic === '';

  useEffect(() => {
    if (state.consent === true) {
      ReactGA.initialize('UA-181903489-1');

      ReactGA.pageview('feedback');
    }
  }, [state.consent]);

  useEffect(() => {
    document.title = 'Feedback';
  }, []);

  const handleDropdownChange = (event) => {
    const { value } = event.target;
    setFeedbackData((prevData) => ({ ...prevData, labels: value }));
  };

  const handleScreenshotUpload = (event) => {
    setFeedbackData({ ...feedbackData, screenshot: event.target.files[0] });
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
    <Grid container rowSpacing={4} justifyContent="center">
      {/* Title */}
      <Grid container item spacing={2} justifyContent="flex-start" alignItems="flex-start">
        <Grid item>
          <Typography variant="h1">NECCC Species Selector Feedback</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h3">Beta-Testing Feedback</Typography>
        </Grid>
      </Grid>

      {/* Feedback Title */}
      <Grid container item spacing={2} justifyContent="flex-start" alignItems="flex-start">
        <Grid item>
          <Typography variant="h6">Feedback Title </Typography>
          <Typography variant="h6" style={{ color: 'red' }}>
            *
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">Give your feedback a short descriptive title.</Typography>
        </Grid>
        <Grid item>
          <TextField
            required
            label="Title"
            placeholder="Enter Your Title"
            variant="outlined"
            fullWidth
            onChange={(event) => handleTextInputChange(event, 'title')}
          />
        </Grid>
      </Grid>

      {/* Feedback Messsage */}
      <Grid container item spacing={2} justifyContent="flex-start" alignItems="flex-start">
        <Grid item>
          <Typography variant="h6">Feedback Message </Typography>
          <Typography variant="h6" style={{ color: 'red' }}>
            *
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            Explain your feedback as thoroughly as you can. Your feedback will help us improve the
            species selection experience. You can attach a screenshot of your feedback below.
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            required
            label="Message"
            placeholder="Enter your Feedback"
            multiline
            variant="outlined"
            fullWidth
            onChange={(event) => handleTextInputChange(event, 'comments')}
          />
        </Grid>
      </Grid>

      {/* Feedback Topic */}
      <Grid container item spacing={2} justifyContent="flex-start" alignItems="flex-start">
        <Grid item>
          <Typography variant="h6">Feedback Topic </Typography>
          <Typography variant="h6" style={{ color: 'red' }}>
            *
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">What is this feedback about?</Typography>
        </Grid>
        <Grid item>
          <Select
            multiple
            value={feedbackData.topic}
            onChange={handleDropdownChange}
            inputProps={{ name: 'topic', id: 'topic-select' }}
            fullWidth
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>
            <MenuItem value="About the Cover Crop Data">About the Cover Crop Data</MenuItem>
            <MenuItem value="About the Website">About the Website</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {/* Screenshot */}
      <Grid container item spacing={2} justifyContent="flex-start" alignItems="flex-start">
        <Grid item>
          <Typography variant="h6">Screen Shot Upload</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            Upload a screenshot demonstrating your feedback. We welcome marked up screenshots to
            further your point.
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Upload Screenshot"
            type="file"
            onChange={handleScreenshotUpload}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>

      {/* Name */}
      <Grid container item spacing={2} justifyContent="flex-start" alignItems="flex-start">
        <Grid item>
          <Typography variant="h6">Name </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Name"
            placeholder="Enter Name"
            variant="outlined"
            fullWidth
            onChange={(event) => handleTextInputChange(event, 'name')}
          />
        </Grid>
      </Grid>

      {/* Email */}
      <Grid container item spacing={2} justifyContent="flex-start" alignItems="flex-start">
        <Grid item>
          <Typography variant="h6">Email </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Email"
            placeholder="Enter Email"
            variant="outlined"
            fullWidth
            onChange={(event) => handleTextInputChange(event, 'email')}
          />
        </Grid>
      </Grid>

      {/* Submit */}
      <Grid container item spacing={2} justifyContent="flex-start" alignItems="flex-start">
        {isDisabled && (
          <Grid item>
            <Typography variant="body1">
              Please fill all required fields before submitting.
            </Typography>
          </Grid>
        )}
        <Grid item>
          <Button disabled={isDisabled} onClick={handleSubmit}>
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
  );
};

export default FeedbackComponent;
