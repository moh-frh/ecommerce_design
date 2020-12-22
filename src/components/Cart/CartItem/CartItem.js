import React from 'react'
import {Card} from 'react-bootstrap'

const CartItem = ({item}) => {
    return (
        <Card>
        <Card.Img  variant="top" src={item.media.source} />
        </Card>
    )
}

export default CartItem
