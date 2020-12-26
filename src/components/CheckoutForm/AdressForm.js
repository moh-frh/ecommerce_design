import React, {useState, useEffect} from 'react'
import { Button, MenuItem, Grid, Typography, InputLabel, Select} from '@material-ui/core'
import {useForm, FormProvider} from 'react-hook-form'
import FormInput from './FormInput'
import {Link} from 'react-router-dom'



// import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';

import { makeStyles } from '@material-ui/core/styles';

import {commerce} from '../../lib/commerce'


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const AdressForm = ({checkoutToken, next}) => {
    const methods = useForm();

    const [ShippingCountries, setShippingCountries] = useState([]);
    const [ShippingCountry, setShippingCountry] = useState('');
    const [Shippingsubdivisions, setShippingsubdivisions] = useState([]);
    const [Shippingsubdivision, setShippingsubdivision] = useState('');
    const [Shippingoptions, setShippingoptions] = useState([]);
    const [Shippingoption, setShippingoption] = useState('');

    const countries = Object.entries(ShippingCountries).map( ([code, name]) => ({id: code, label: name }));
    const subdivisions = Object.entries(Shippingsubdivisions).map( ([code, name]) => ({id: code, label: name }));
    const options = Shippingoptions.map( (SO) => ({id: SO.id, label: `${SO.description} - (${SO.price.formatted_with_symbols})`  }) );


    // console.log(subdivisions)
    

    const fetshShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
        // console.log(countries)
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0]);
    }

    const fetshSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
        // console.log(countries)
        setShippingsubdivisions(subdivisions)
        setShippingsubdivision(Object.keys(subdivisions)[0]);
    }

    const fetshShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options  = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});
        // console.log(countries)
        setShippingoptions(options);
        setShippingoption(options[0].id);
    }
    

    useEffect(() => {
        fetshShippingCountries(checkoutToken.id);
    }, [])

    useEffect(() => {
        if (ShippingCountry) fetshSubdivisions(ShippingCountry);
    }, [ShippingCountry])

    useEffect(() => {
        if (Shippingsubdivision) fetshShippingOptions(checkoutToken.id, ShippingCountry, Shippingsubdivision );
    }, [Shippingsubdivision])


    return (
        <>
            <Typography variant="h6" gutterBottom> shipping address </Typography>
            <FormProvider {...methods}>
                <form onSubmit={ methods.handleSubmit( (data) => next({...data, ShippingCountry, Shippingsubdivision, Shippingoption}) ) }>
                    <Grid container spacing={3}>
                        <FormInput name='firstName' label='First Name' />
                        <FormInput name='lastName' label='last Name' />
                        <FormInput name='adresse1' label='adresse 1' />
                        <FormInput name='email' label='email' />
                        <FormInput name='city' label='city' />
                        <FormInput name='ZIP' label='ZIP' />

                        <Grid item xs={12} sm={6}>
                            <InputLabel> shipping country </InputLabel>

                            <Select value={ShippingCountry} fullWidth onChange={(e)=> setShippingCountry(e.target.value)}>
                                {countries.map( (country) => (
                                    <MenuItem key={country.id} value={country.label}>
                                        {country.label}
                                    </MenuItem>
                                ) )}
                                
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel> shipping subdivision </InputLabel>

                            <Select value={Shippingsubdivision} fullWidth onChange={(e) => setShippingsubdivision(e.target.value)}>
                                {subdivisions.map((subdiv) => (
                                    <MenuItem key={subdiv.id} value={subdiv.label}>
                                        {subdiv.label}
                                    </MenuItem>
                                ))}
                                
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel> shipping options </InputLabel>

                            <Select value={Shippingoption} fullWidth onChange={(e)=>setShippingoption(e.target.value)}>
                                {options.map((opt) => (
                                    <MenuItem key={opt.id} value={opt.label}>
                                        {opt.label}
                                    </MenuItem>
                                ))}
                                
                            </Select>
                        </Grid>

                    </Grid>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to='/cart' variant='outlined'> back to cart </Button>
                        <Button type='submit' variant='contained' color='primary'> next </Button>                        
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AdressForm
