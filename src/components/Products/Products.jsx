import React from 'react'
import {Grid} from '@material-ui/core'
// import { CardDeck,  } from 'react-bootstrap';
import Product from './Product'


const Products = ({products, onAddToCart, HandleUpdateCartQty, HandleRemoveCart}) => {
    return(

        <main>
            <Grid container justify='center' spacing={4}>
            {products.map((product) => (

                <Grid item key={product.id} style={{margin: '2%'}} xs={12} sm={6} ms={4} lg={3}>
                    <Product product={product} onAddToCart={onAddToCart} 
                                               HandleUpdateCartQty={HandleUpdateCartQty}
                                               HandleRemoveCart={HandleRemoveCart}
                    />
                </Grid>

            ))}
            </Grid>
        </main>
    )
    
}

export default Products;