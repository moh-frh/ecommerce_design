import React from 'react'
import { Card, Button  } from 'react-bootstrap';
import Grid from '@material-ui/core'


const Product = ({product, onAddToCart}) => {

    return (
      
          <div>
            <Card item key={product.id}>
            <Card.Img variant="top" src={product.media.source} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
              { product.description}
              </Card.Text>
              <small className="text-muted">{product.price.formatted_with_symbol}</small> 

            </Card.Body>
            <Card.Footer>
              <Button variant="secondary" onClick={() => onAddToCart(product.id, 1)}>add to cart</Button>{' '}
            </Card.Footer>
            </Card>
          </div>
    )
}

export default Product;
