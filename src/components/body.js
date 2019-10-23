import React, { Component } from 'react';
import starWarsNames from 'starwars-names';
import { Grid } from '@material-ui/core';
// import { AutoCompleteCropName } from './autoCompleteCropName';
import Zipcode from './zipCode';
import CropSuggestions from './cropSuggestions';
// import axios from 'axios';


class Body extends Component {
    allItems = starWarsNames
        .random(7)
        .map(s => ({ name: s, id: s.toLowerCase() }));
    state = {
        starWarsNames: this.allItems,
        cropData: [],
        selectedItems: []
    };

    componentDidMount() {
        // fetch('https://api.airtable.com/v0/appC47111lCOTaMYe/Cover%20Crops%20Data?api_key=keywdZxSD9AC4vL6e')
        //     .then((resp) => resp.json())
        //     .then(data => {
        //         this.setState({ items: data.records.crover });
        //     })
        const hdrs = new Headers();
        hdrs.append('Cotent-Type', 'application/json');
        hdrs.append('secret-key', '$2b$10$cB.vdtYXdwSORs8uKPq9.uWi1vLDspYmJoHamkfLZxiwvZHsswg4m');
        fetch('https://api.jsonbin.io/b/5daab0ecee19b1311aa10fcf/latest', {
            headers: hdrs
        })
            .then(resp => resp.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    cropData: result.items
                })
            });
    }

    render() {
        // const { selectedItem, items } = this.state;
        return (

            <Grid container style={{ height: '60vh', padding: '2em' }}>
                <Grid item lg={12}>
                    <Zipcode />
                    <div style={{ padding: '3em' }}></div>
                    {/* <CropNameSearch /> */}
                    {/* <AutoCompleteCropName
                        suggestions={this.state.cropData.coverCropName}
                    /> */}

                </Grid>

                <CropSuggestions cropData={this.state.cropData} />
            </Grid>

        );
    }
}


export default Body;