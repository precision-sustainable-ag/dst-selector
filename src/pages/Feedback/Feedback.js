import React, { useEffect, useContext, useState } from 'react';
import ReactGA from 'react-ga';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Snackbar,
  Checkbox,
  FormGroup,
  FormControlLabel,
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
    // screenshot: null,
    name: '',
    email: '',
  });

  const convertMessageArr = (arr) => {
    if (arr.length === 0) {
      return '';
    }
    if (arr.length === 1) {
      return `The "${arr[0]}" field is blank`;
    }
    if (arr.length === 2) {
      return `The "${arr.join('" and "')}" fields are blank`;
    }
    return `The "${arr.slice(0, -1).join('", "')}", and "${arr[arr.length - 1]}" fields are blank`;
  };

  const checkDisabled = () => {
    const titleMissing = feedbackData.title === '';
    const commentsMissing = feedbackData.comments === '';
    const labelsMissing = feedbackData.labels.length === 0;
    const messageArr = [];

    if (titleMissing) {
      messageArr.push('Title');
    }
    if (commentsMissing) {
      messageArr.push('Message');
    }
    if (labelsMissing) {
      messageArr.push('Topic');
    }
    const messageStr = convertMessageArr(messageArr);
    if (titleMissing || commentsMissing || labelsMissing) {
      return { state: true, message: messageStr };
    }
    return { state: false, message: '' };
  };

  useEffect(() => {
    if (state.consent === true) {
      ReactGA.initialize('UA-181903489-1');

      ReactGA.pageview('feedback');
    }
  }, [state.consent]);

  useEffect(() => {
    document.title = 'Feedback';
  }, []);

  // const handleScreenshotUpload = (event) => {
  //   setFeedbackData({ ...feedbackData, screenshot: event.target.files[0] });
  // };

  const handleTextInputChange = (event, propertyName) => {
    setFeedbackData({ ...feedbackData, [propertyName]: event.target.value });
  };

  const remove = (arr, value) => {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  };

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setFeedbackData({ ...feedbackData, labels: [...feedbackData.labels, event.target.name] });
    } else {
      setFeedbackData({ ...feedbackData, labels: remove(feedbackData.labels, event.target.name) });
    }
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
      body: JSON.stringify({ ...feedbackData, labels: ['cc-selecotor', ...feedbackData.labels] }),
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
      .catch((error) => {
        // eslint-disable-next-line
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
            <Typography variant="h3">Cover Crop Species Selector Feedback</Typography>
          </Grid>
        </Grid>

        {/* Feedback Title */}
        <Grid container item spacing={1} justifyContent="flex-start" alignItems="flex-start">
          <Grid item xs={12}>
            <Typography variant="h6" display="inline-block">Title</Typography>
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
            <Typography variant="h6" display="inline-block">Message </Typography>
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
            <Typography variant="h6" display="inline-block">Topic </Typography>
            <Typography variant="h6" display="inline-block" style={{ color: 'red' }}>
              *
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">What is this feedback about?</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onChange={handleCheckboxChange} name="About the Cover Crop Data" />}
                label="About the Cover Crop Data"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleCheckboxChange} name="About the Website" />}
                label="About the Website"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleCheckboxChange} name="Other" />}
                label="Other"
              />
            </FormGroup>
          </Grid>
        </Grid>

        {/* //Screenshot
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
        </Grid> */}

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
          {checkDisabled().state && (
            <Grid item xs={12}>
              <Typography variant="body1" style={{ color: 'red' }}>
                {checkDisabled().message}
                . Please fill all required fields before submitting.
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button disabled={checkDisabled().state} onClick={handleSubmit} size="large" variant="outlined">
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
