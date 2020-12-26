import React from 'react'
import { Button, Divider, Typography} from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'
import Review from './Review'

const StripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const Payment = ({ShippingData, checkoutToken, nextStep, prevStep, onCaptureCheckout}) => {

    const handleSubmit = async (e, element, stripe) => {
        e.preventDefault()

        if( !stripe || !element ) return;

        const cardElement = element.getElement(cardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

        if(error){
            console.log(error)
        }else{
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {firstname: ShippingData.firstname, lastname: ShippingData.lastname, email: ShippingData.email},
                shipping: {
                    name: 'Primary',
                    street: ShippingData.address1,
                    town_city: ShippingData.city,
                },
                fulfillment: { shipping_method: ShippingData.shipping_option },
                payment:{
                    gateway: 'stripe',
                    stripe:{
                        payment_method_id: paymentMethod.id
                    }
                }
            }

            onCaptureCheckout(checkoutToken.id, orderData)
            nextStep()
        }
    }

    return (
        <div>
            <Review checkoutToken={checkoutToken} />
            <Divider/>
            <Typography variant='h6' gutterBottom style={{ margin: '20px 0' }}> payement method </Typography>
            <Elements stripe={StripePromise}>
                <ElementsConsumer>
                    {({elements, stripe}) => (
                        <form onClick={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement />
                            <br/><br/>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant='outlined' onClick={prevStep} > back </Button>
                                <Button type='submit' variant='contained' disabled={!stripe} color='primary' >
                                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </div>
    )
}

export default Payment
