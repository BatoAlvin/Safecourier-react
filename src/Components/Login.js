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

class Login extends React.Component {

    state = {
        email: '',
        password: '',
        posts: [],
        isLoggedIn: false
    };

    componentDidMount = () => {
        this.getApiPost();
    };

    //https://parcelsapp.herokuapp.com/api/v1/auth/login
    getApiPost = () => {
        axios.get('https://parcelsapp.herokuapp.com/api/v1/auth/login')
            .then((response) => {
                const data = response.data;
                this.setState({ posts: data });
                console.log('Login!!');
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
            email: this.state.email,
            pass: this.state.password
        };

      
        axios({
            url: 'https://parcelsapp.herokuapp.com/api/v1/auth/login',
            method: 'POST',
            data: payload
        })
            .then((response) => {
                localStorage.setItem('token', response.data.token)
                console.log('Data has been sent to the server');
                alert("Login")
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
            email: '',
            password: ''
        });
    };

    displayApiPost = (posts) => {
        console.log("clicked fetched")
        if (!posts.length) return null;


        return posts.map((post, index) => (
            <div key={index}>
                <div>{post.email}</div>
                <div> {post.password}</div>
            </div>
        ));
    };

    render() {
      if (this.state.isLoggedIn === true) {
        return <Redirect to='/home' />
    }
        console.log('State: ', this.state);
        return (
            <Container component="main" maxWidth="xs" >
                <Box style={{ marginTop: '90px' }}>
                    <div className="paper">

                        <Typography component="h1" variant="h5">
                        Login
          </Typography>

                        <form onSubmit={this.submit} className="box" noValidate method="post">

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
                                    Login
            </Button>
                            </Link>
                            <Grid container>

                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Dont Have an account? Signup In"}
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

export default Login;