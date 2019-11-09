import React, { Component } from 'react';
// import psaLogo from '../images/PSAlogo-text.png';
// import necccLogo from '../images/NECCCLogo.png';
// import nrcsLogo from '../images/USDANRCSLogo.png';
// import Container from '@material-ui/core/Container';

import necc from '../images/neccclogo-temp.png';
import Grid from '@material-ui/core/Grid';
import '../styles/header.css';
import { Container, Typography } from '@material-ui/core';



class Header extends Component {
    render() {

        return (

            <Container maxWidth="xl">
                <Grid container>
                    <Grid item md={1}>
                        <img src={necc} width="100%"></img>
                    </Grid>
                    <Grid item container md={11} direction="column" alignItems="flex-start" justify="center" spacing={2}>
                        <Grid item >
                            <Typography variant="h4">Northeast Cover Crops Councils</Typography>

                        </Grid>
                        <Grid item>
                            <Typography variant="h5">Cover Crop Decision Support Tools</Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </Container>


        );
    }
}

export default Header;