import React from 'react'
import {Grid} from '@material-ui/core'
import Product from './Product'

const products = [
    {id:1, name:'audi', description: 'sport car', price: '5$', image: 'https://pict1.reezocar.com/images/autowereld.nl/RZCATWNL22286172/FORD-F-150-0.jpg'},
    {id:2, name:'megane', description: 'classic', price: '10$', image: 'https://www.autoaubaine.com/actualite-automobile/images-automobiles/54758.jpg'},
    {id:3, name:'ford F150', description: 'track', price: '15$', image: 'https://cdn.car-recalls.eu/wp-content/uploads/2020/04/Renault-Megane-RS-2018-recall-battery-768x432.jpg'},

]

const Products = () => {
    return(

    <main>
        <Grid container justify='center' spacing={4}>
            {products.map((product) => (

                <Grid item key={product.id} xs={12} sm={6} ms={4} lg={3}>
                    <Product product={product}/>
                </Grid>

            ))}
        </Grid>
    </main>

    )
    
}

export default Products;