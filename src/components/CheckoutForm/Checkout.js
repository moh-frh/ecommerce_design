import React, {useState, useEffect} from 'react'
import { Paper, Stepper, Step, StepLabel, Typography,  } from '@material-ui/core';
import AdressForm from './AdressForm'
import Payment from './Payment'
import Confirmation from './Payment'

import useStyles from './styles'

import {commerce} from '../../lib/commerce'


const steps = ['shiping address', 'payement details']

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
    const [activeStep, setactiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    
    const [ShippingData, setShippingData] = useState({});

    const classes = useStyles();

    useEffect(() => {
        const generateToken = async () => {
            try{
                const token = await commerce.checkout.generateToken(cart.id, {  type: 'cart'  });
                setCheckoutToken(token)
            }catch(error){
            }
        }

        generateToken();

    }, [cart])

    const Form = () => (
        activeStep === 0
            ? <AdressForm checkoutToken={checkoutToken} next={next} />
            : <Payment ShippingData={ShippingData} checkoutToken={checkoutToken} nextStep={nextStep} prevStep={prevStep} onCaptureCheckout={onCaptureCheckout} />
        )

    const nextStep = () =>  setactiveStep( (prevActiveStep) => prevActiveStep + 1 )
    const prevStep = () =>  setactiveStep( (prevActiveStep) => prevActiveStep - 1 )    
    
    const next = (data) => {
        setShippingData(data);
        console.log(data)
        nextStep();
    }


    return (
        <>
            <div className={classes.toolbar}>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" align='center'> checkout </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map((step) => (
                                <Step key={step}>
                                    <StepLabel> {step} </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        { activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form next={next} /> }
                    </Paper>
                </main>
            </div>
        </>
    )
}

export default Checkout
