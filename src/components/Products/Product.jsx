import React from 'react'
import { Card, Button  } from 'react-bootstrap';


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
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">{product.price.formatted_with_symbol}</small>
              <Button variant="secondary" onClick={() => onAddToCart(product.id, 1)}>add to cart</Button>{' '}
            </Card.Footer>
            </Card>
          </div>
    )
}

export default Product;
