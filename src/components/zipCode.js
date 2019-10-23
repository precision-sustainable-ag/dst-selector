import React, { Component, useState } from 'react';
import TextField from '@material-ui/core/TextField';

class Zipcode extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location: ''
        }
    }

    componentDidMount() {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then((data) => {

                this.setState({
                    location: data.postal
                })
            })
    }
    render() {
        // const [values, setValues] = useState({
        //     location: '27606',

        // });
        // const handleChange = location => event => {
        //     setValues({
        //         ...values, [location]: event.target.value
        //     });
        //     console.log('value changed')
        // }
        return (
            <form noValidate autoComplete="off">
                <h3 style={{ textAlign: 'center' }}>Tell Us Your Location</h3>
                <TextField
                    id="locationField"
                    label="Set Your Location"
                    value={this.state.location}
                    // onChange={handleChange('location')}
                    margin='normal'
                    fullWidth
                />


            </form>
        );


    }
}

export default Zipcode