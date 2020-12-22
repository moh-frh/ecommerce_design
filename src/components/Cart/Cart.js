import React from 'react'
import { Card, Button, ButtonGroup  } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import CartItem from './CartItem/CartItem'

const Cart = ({cart, emptyTheCart, HandleRemoveCart, HandleUpdateCartQty}) => {
    const isEmpty = cart.total_items === 0;

    const EmptyCart = () => (
        <div> your cart is empty !! </div>
    );

    const FilledCart = () => (
        <>
            <Card.Body className='m-2'>
                {cart.line_items.map((item) => (
                <Card item key={item.name}  className='col-6'>
                    <Card.Body>
                        <Card.Title> <CartItem item={item} /> </Card.Title>
                        <Card.Title>( {item.price.formatted_with_symbol} )</Card.Title>
                       
                        <ButtonGroup className="col-6">
                            <Button onClick={() => HandleUpdateCartQty(item.id, item.quantity-1)} variant="light">-</Button>
                            {item.quantity}
                            <Button onClick={() => HandleUpdateCartQty(item.id, item.quantity+1)} variant="light">+</Button>
                            <Button onClick={() => HandleRemoveCart(item.id)} variant="outline-danger">remove</Button>{' '}

                        </ButtonGroup>
                    </Card.Body>

                </Card>
                 ))}

                    <Card.Footer>
                        <small className="text-muted"></small>
                        <Button variant="secondary" onClick={emptyTheCart}>empty the cart</Button>{' '}
                        <Link to='/checkout'> <Button variant="secondary" onClick=''>checkout</Button>{' '} </Link>
                    </Card.Footer>
                    <Card.Footer className="text-muted">total : {cart.subtotal.formatted_with_symbol}</Card.Footer>

            </Card.Body>
        </>
    )

    if(!cart.line_items) return 'loading ...';

    return (
        <div>
            <Card className="text-center">
                <Card.Header className='h2'>your card</Card.Header>
            { isEmpty ? <EmptyCart/> : <FilledCart/> }
            </Card>
        </div>
    )
}

export default Cart
