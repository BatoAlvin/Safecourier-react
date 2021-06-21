import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Redirect } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import "../App"

class Register extends React.Component {

    state = {
        name: '',
        email: '',
        password: '',
        posts: [],
        isLoggedIn: false
    };

    componentDidMount = () => {
        this.getApiPost();
    };

 
    getApiPost = () => {
        axios.get('https://parcelsapp.herokuapp.com/api/v1/auth/signup')
            .then((response) => {
                const data = response.data;
                this.setState({ posts: data });
                console.log('Data has been received!!');
            })
            .catch(() => {
            });
    }

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };


    submit = (event) => {
        event.preventDefault();

        const payload = {
            name: this.state.name,
            email: this.state.email,
            pass: this.state.password
        };

   
        axios({
            url: 'https://parcelsapp.herokuapp.com/api/v1/auth/signup',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log('Data has been sent to the server');
                alert("User created")
                this.resetUserInputs();
                this.setState({ isLoggedIn: true });
                this.getApiPost();
                
               
            })
            .catch(() => {
                console.log('Internal server error');
                alert("Invalid input")
            });;
    };

    resetUserInputs = () => {
        this.setState({
            name: '',
            email: '',
            pass: ''
        });
    };

    displayApiPost = (posts) => {
        console.log("clicked fetched")
        if (!posts.length) return null;


        return posts.map((post, index) => (
            <div key={index}>
                <div>{post.name}</div>
                <div> {post.email}</div>
            </div>
        ));
    };

    render() {
      if (this.state.isLoggedIn === true) {
        return <Redirect to='/' />
    }
        console.log('State: ', this.state);
        return (
            <Container component="main" maxWidth="xs" >
                <Box style={{ marginTop: '90px' }}>
                    <div className="paper">

                        <Typography component="h1" variant="h5">
                            Sign Up
          </Typography>

                        <form onSubmit={this.submit} className="box" noValidate method="post">

                            <TextField

                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Names"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                onChange={this.handleChange}
                                value={this.state.name}
                            />

                            <TextField

                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                autoFocus
                            />


                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                autoComplete="current-password"
                            />

                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />


                            <Link href="/" variant="body2">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className='submit'

                                >
                                    Sign Up
            </Button>
                            </Link>
                            <Grid container>

                                <Grid item>
                                    <Link href="/" variant="body2">
                                        {"Have an account? Log In"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>

                    </div>
                </Box>
            </Container>
        )

    }
}

export default Register;