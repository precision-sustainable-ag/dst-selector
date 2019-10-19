import React, { Component } from 'react';
import psaLogo from '../images/PSAlogo-text.png';
import necccLogo from '../images/NECCCLogo.png';
import nrcsLogo from '../images/USDANRCSLogo.png';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import '../styles/header.css';

class Header extends Component {
    render() {
        return (
            <header>
                <Grid container spacing={3} style={{ maxHeight: '100px' }}>
                    <Grid item xs={12} sm={6} lg={6} className="psaLogo">
                    </Grid>
                    <Grid item xs={12} sm={3} lg={3} className="necccLogo">

                    </Grid>
                    <Grid item xs={12} sm={3} lg={3} className="nrcsLogo">

                    </Grid>
                </Grid>
            </header>
        );
    }
}

export default Header;