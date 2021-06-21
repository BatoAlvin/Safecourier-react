import React, {useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import axios from 'axios';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      marginTop: 90
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  


  function Order() {
    const classes = useStyles();
    const [product, setProduct] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(()=>{
        axios.get('https://parcelsapp.herokuapp.com/api/v1/parcels/users',
        {
            headers: {'Authorization': 'Bearer ' +localStorage.getItem('token')} ,
            }
        )
        .then(res => {
            console.log(res)
            setProduct(res.data)
        })
        .catch(err => {
            console.log(err)})
    },[])
    
    return (
        <div className="App">
        <h1 style={{marginBottom: '30px'}}>Your Orders</h1>
        <input
        style={{marginBottom: '30px'}}
          type="text"
          placeholder="Search here"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
  
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Order Name</StyledTableCell>
                <StyledTableCell align="right">Destination</StyledTableCell>
                <StyledTableCell align="right">Duration</StyledTableCell>
          
              </TableRow>
            </TableHead>
            <TableBody>
              {product
                .filter((item) => {
                  if (search == "") {
                    return item;
                  } else if (
                    item.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((item) => {
                  return (
                    <StyledTableRow key={item.id}>
                      <StyledTableCell component="th" scope="row">
                        {item.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.destination}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.duration}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <Link href="/home" variant="body2">
              <Button type='submit'
                style={{marginTop: '30px'}}
                 variant="contained"
                 color="primary">Back To Home</Button>
            </Link>
      </div>
    )
}

export default Order

