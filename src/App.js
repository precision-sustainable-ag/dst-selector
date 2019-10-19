import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Body from './components/body';
import Grid from '@material-ui/core/Grid';

function App() {
  return (
    <Grid>
      <Header />
      <Body />
    </Grid>

  );
}

export default App;
