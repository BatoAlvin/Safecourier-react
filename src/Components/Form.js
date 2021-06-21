import React from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import axios from 'axios';

const initialState = {
  name: "",
  destination: "",
  duration: "",
  nameError: "",
  destinationError: "",
  durationError: ""
};

export default class Form extends React.Component {
  state = initialState;

  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };

  validate = () => {
    let nameError = "";
    let destinationError = "";
     let durationError = "";

    if (!this.state.name) {
      nameError = "Name cannot be blank";
    }

    if (!this.state.duration) {
      durationError = "Duration cannot be blank";
      }

    if (!this.state.destination) {
      destinationError = "Destination cannot be blank";
      }

    if (!this.state.destination.includes("")) {
      destinationError = "Destination cannot be blank";
    }

    if (destinationError || nameError || durationError) {
      this.setState({ destinationError, nameError, durationError });
      return false;
     }

    return true;
  };


  handleDuration = event => {
    this.setState({
        duration: event.target.value
    })
    }

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      axios.post('https://parcelsapp.herokuapp.com/api/v1/parcels/users/',
      this.state,
      {
         headers: {'Authorization': 'Bearer ' +localStorage.getItem('token')} ,
         }
      )
     .then(response => {
    
         console.log(response)
    
     })
     .catch(error => {
         console.log(error)
     })
      console.log(this.state);
      alert('Order Created')
      // clear form
      this.setState(initialState);
    }
  };

  render() {
    return (
      <Container maxWidth="sm">
      <Box style={{marginTop: '90px'}}>
      <Typography variant="h6" color="inherit" noWrap>
         Create Your Order
          </Typography>

      <form onSubmit={this.handleSubmit}>
      <TextField
         variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Preferred Order Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={this.state.name} 
            onChange={this.handleChange}
          />
            <div style={{ fontSize: 12, color: "red" }}>
            {this.state.nameError}
          </div>


<TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="destination"
              label="Destination"
              id="destination"
              autoComplete="destination"
              value={this.state.destination} 
            onChange={this.handleChange}
            />
  <div style={{ fontSize: 12, color: "red" }}>
            {this.state.destinationError}
          </div>


          <FormControl>
<inputLabel Style={{ width: 500}}>Duration</inputLabel>
              <Select   value={this.state.duration} 
            onChange={this.handleDuration}>
    <MenuItem value={`10000shs`} name='duration' >Within 6hrs</MenuItem>
    <MenuItem value={`10000shs`}>Within 12hrs</MenuItem>
      <MenuItem value={`3000shs`}>Within 24hrs</MenuItem>

</Select>  

<div style={{ fontSize: 12, color: "red" }}>
            {this.state.durationError}
          </div>

    <p>You Selected: {this.state.duration}</p> 
</FormControl> 


         <Grid container >
        <Grid item xs={6}>
        <Link href="/dataposting" variant="body2">
              <Button type='submit'
             
                fullWidth
                 variant="contained"
                 color="primary">Order</Button>
            </Link>

        </Grid>
        <Grid item xs={6}>
                                    <Link href="/order" variant="body2">
                                        {"View Order"}
                                    </Link>
                                </Grid>
            </Grid>    

      
      </form>
      </Box>
      </Container>
    );
  }
}