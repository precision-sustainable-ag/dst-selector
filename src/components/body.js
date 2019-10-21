import React, { Component, useState } from 'react';
import starWarsNames from 'starwars-names';
import { TextField, Grid, FormGroup, FormControl, FormLabel } from '@material-ui/core';
import { AutoCompleteCropName } from './autoCompleteCropName';
// import axios from 'axios';


class Body extends Component {
    allItems = starWarsNames
        .random(7)
        .map(s => ({ name: s, id: s.toLowerCase() }));
    state = {
        items: this.allItems,
        selectedItems: []
    };
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         items: [],
    //         selectedItem: []
    //     }

    // }

    componentDidMount() {
        fetch('https://api.airtable.com/v0/appC47111lCOTaMYe/Cover%20Crops%20Data?api_key=***REMOVED***')
            .then((resp) => resp.json())
            .then(data => {
                this.setState({ items: data.records });
            })
    }

    render() {
        const { selectedItem, items } = this.state;
        return (

            <Grid container style={{ height: '60vh', padding: '2em' }}>
                <Grid item lg={12}>
                    <Zipcode />
                    <div style={{ padding: '3em' }}></div>
                    {/* <CropNameSearch /> */}
                    <AutoCompleteCropName
                        suggestions={['White', 'Black', 'Orange', 'Yellow', 'Blue', 'Red']}
                    />
                    {/* <table>
                        <thead>
                            <tr>
                                <th>Cover Crop Name</th>
                                <th>Scientific Name</th>
                                <th>Origin</th>
                                <th>Drought Tolerance</th>
                                <th>Flood Tolerance</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.items.map((item, key) =>
                                <tr>
                                    <td>{item.fields.coverC}</td>
                                </tr>
                                )}
                        </tbody>
                    </table> */}
                </Grid>
            </Grid>

        );
    }
}

// const CropNameSearch = ({ title, year, description, imageURL }) => {

// }



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



export default Body;