import React from 'react'
import { Card, ButtonGroup  } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import CartItem from './CartItem/CartItem'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: '1%',
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    button_list: {
        '& > *': {
          margin: theme.spacing(1),
        },
    },
    button_delete_item:{
        margin: theme.spacing(1),
    }

  }));

const Cart = ({cart, emptyTheCart, HandleRemoveCart, HandleUpdateCartQty}) => {

    const classes = useStyles();

    const isEmpty = cart.total_items === 0;

    const EmptyCart = () => (
        <div> your cart is empty !! </div>
    );

    const FilledCart = () => (
        <>
        {cart.line_items.map((item) => (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                        <CartItem item={item} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                            {item.name}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                            {item.description}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                            {item.description}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                <ButtonGroup className="col-12">

                                    <ButtonGroup size="small" aria-label="small outlined button group">
                                        <Button onClick={() => HandleUpdateCartQty(item.id, item.quantity-1)}>-</Button>
                                        <Button>{item.quantity}</Button>
                                        <Button onClick={() => HandleUpdateCartQty(item.id, item.quantity+1)}>+</Button>
                                    </ButtonGroup>
                                    
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button_delete_item}
                                    startIcon={<DeleteIcon />}
                                    onClick={() => HandleRemoveCart(item.id)}
                                >
                                    Delete
                                </Button>
                                </ButtonGroup>
                            </Typography>
                        </Grid>
                        </Grid>
                        <Grid item>
                        <Typography variant="subtitle1"> {item.price.formatted_with_symbol} </Typography>
                        </Grid>
                    </Grid>
                    </Grid>
                </Paper>
                </div>
                ))}

                <div className={classes.button_list} >
                <b> total : {cart.subtotal.formatted_with_symbol} </b> <br></br>
                    <Button onClick={emptyTheCart} variant="outlined" color="secondary">
                    empty the cart
                    </Button>

                    <Link to='/checkout'>
                        <Button variant="outlined" color="primary" href="#outlined-buttons">
                        checkout
                        </Button>
                    </Link>
                </div>

        </>
    )

    if(!cart.line_items) return 'loading ...';

    return (
        <div>
            <Card className="text-center">
                <Card.Header className='h2'>your card <ShoppingCartIcon/></Card.Header>
            { isEmpty ? <EmptyCart/> : <FilledCart/> }
            </Card>
        </div>
    )
}

export default Cart
