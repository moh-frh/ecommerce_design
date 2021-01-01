import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';
import Confirmation from './Confirmation';

import {Link} from 'react-router-dom'


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, nextStep, prevStep, shippingData, onCaptureCheckout }) => {
  const handleSubmit = () => {
   

    return (
    <>
        <Confirmation/>
    </>
    )

  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />

      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
      
      <Elements stripe={stripePromise}>
        <ElementsConsumer>{({ elements, stripe }) => (
          <form onSubmit={(e) => nextStep()}>
            <CardElement />
            <br /> <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={prevStep}>Back</Button>
              <Button component={Link} to='/confirm' variant='outlined' color="primary"> Pay {checkoutToken.live.subtotal.formatted_with_symbol} </Button>


              {/* <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                Pay {checkoutToken.live.subtotal.formatted_with_symbol}
              </Button> */}
            </div>
          </form>
        )}
        </ElementsConsumer>
      </Elements>
      
    </>
  );
};

export default PaymentForm;
