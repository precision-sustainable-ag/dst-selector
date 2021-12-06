/*
  This file contains the Zipcode component
  The Zipcode allows the user to enter their zipcode to fetch their plant hardiness zone
*/

import TextField from "@material-ui/core/TextField";
import React, { Component } from "react";

class Zipcode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "10000",
    };
  }

  handleChange = (e) => {
    var isZipCode = true;
    if (isNaN(e.target.value)) {
      isZipCode = false;
      // search for a city and update the state for a relevant zip
    }

    this.setState({
      location: e.target.value,
    });
  };
  componentDidMount() {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        // this.setState({
        //     location: data.postal
        // })
      });
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
        <h3 style={{ textAlign: "center" }}>Tell Us Your Location</h3>
        <TextField
          id="locationField"
          label="Set Your Location"
          value={this.state.location}
          onChange={this.handleChange}
          // onChange={handleChange('location')}
          margin="normal"
          fullWidth
        />
      </form>
    );
  }
}

export default Zipcode;
