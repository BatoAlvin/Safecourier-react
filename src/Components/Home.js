import React from 'react'
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


function Home() {
    return (
        <Container maxWidth="sm">
       
       <Typography variant="h6" color="inherit" noWrap>
       Safe Courier
          </Typography>

          <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Safe Courier is a courier service that helps users deliver parcels to different destinations. Safe Courier provides courier quotes based on weight categories.
            </Typography>


        <Grid container >
        <Grid item xs={6}>
        <Link href="/form" variant="body2">
              <Button type='submit'
             
                fullWidth
                 variant="contained"
                 color="primary">Order</Button>
            </Link>

        </Grid>
        <Grid item xs={6}>
        <Link href="/order" variant="body2">
              <Button type='submit'
               style={{marginLeft: '30px'}}
                fullWidth
                 variant="contained"
                 color="danger">View Order</Button>
            </Link>

        </Grid>
            </Grid>
       
        </Container>
    )
}

export default Home
