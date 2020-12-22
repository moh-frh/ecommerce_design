import React from 'react'
import {Grid} from '@material-ui/core'
import { CardDeck,  } from 'react-bootstrap';
import Product from './Product'


const Products = ({products, onAddToCart, HandleUpdateCartQty, HandleRemoveCart}) => {
    return(

        <CardDeck className='m-3'>
            {products.map((product) => (

                <Grid item key={product.id} xs={12} sm={6} ms={4} lg={3}>
                    <Product product={product} onAddToCart={onAddToCart} 
                                               HandleUpdateCartQty={HandleUpdateCartQty}
                                               HandleRemoveCart={HandleRemoveCart}
                    />
                </Grid>

            ))}
        </CardDeck>
    )
    
}

export default Products;