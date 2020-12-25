import React, {useState, useEffect} from 'react'
import { Paper, Stepper, Step, StepLabel, Typography,  } from '@material-ui/core';
import AdressForm from './AdressForm'
import PaymentForm from './PaymentForm'
import Confirmation from './Confirmation'

import useStyles from './styles'

import {commerce} from '../../lib/commerce'


const steps = ['shiping address', 'payement details']

const Checkout = ({cart}) => {
    const [activeStep, setactiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const classes = useStyles();

    useEffect(() => {
        const generateToken = async () => {
            try{
                const token = await commerce.checkout.generateToken(cart.id, {  type: 'cart'  });
                console.log("**********************************************************************")
                console.log(token)

                setCheckoutToken(token)

            }catch(error){
            }
        }

        generateToken();

    }, [cart])

    const Form = () => (
        activeStep === 0
            ? <AdressForm checkoutToken={checkoutToken} />
            : <PaymentForm />
        )

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
                        { activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/> }
                    </Paper>
                </main>
            </div>
        </>
    )
}

export default Checkout
