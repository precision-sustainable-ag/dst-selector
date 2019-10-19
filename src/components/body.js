import React, { Component, useState } from 'react';


import { TextField, Paper, Grid } from '@material-ui/core';

// const airtableKey = '***REMOVED***';

// var Airtable = require('airtable');
// Airtable.configure({
//     endpointUrl: 'https://api.airtable.com',
//     apiKey: airtableKey
// });
// var base = Airtable.base('appC47111lCOTaMYe');

// base('Cover Crops Data').select({
//     fields: ["Cover Crop Name", "Scientific Name", "Synonyms"]
// }).eachPage(function page(records, fetchNextPage) {
//     records.forEach((record) => {
//         console.log(record.get('Cover Crop Name'));
//     })
// });

class Body extends Component {
    render() {
        return (
            // <Paper >
            <Grid container style={{ height: '60vh', padding: '2em' }}>
                <Grid item lg={12}>
                    <Zipcode />
                </Grid>
            </Grid>
            // </Paper>
        );
    }
}

function Zipcode() {
    const [values, setValues] = useState({
        location: '27606',

    });

    const handleChange = location => event => {
        setValues({
            ...values, [location]: event.target.value
        });
        console.log('value changed')
    }
    return (

        <form noValidate autoComplete="off">
            <h3 style={{ textAlign: 'center' }}>Tell Us Your Location</h3>
            <TextField
                id="locationField"
                label="Set Your Location"
                value={values.location}
                onChange={handleChange('location')}
                margin='normal'
                fullWidth
            />


        </form>

    );
}

// componentDidMount() {
//     fetch('../airtable.json').then(res =>res.json())
//     .then((res)=> {
//         this.setState({
//             isLoaded: true,
//             items: res.items
//         });
//     });
// }

export default Body;