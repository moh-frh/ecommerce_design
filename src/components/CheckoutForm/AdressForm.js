import React, {useState, useEffect} from 'react'
import { MenuItem, Grid, Typography, InputLabel, Select} from '@material-ui/core'
import {useForm, FormProvider} from 'react-hook-form'
import FormInput from './FormInput'



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

const AdressForm = ({checkoutToken}) => {
    const methods = useForm();

    const [ShippingCountries, setShippingCountries] = useState([]);
    const [ShippingCountry, setShippingCountry] = useState('');
    const [Shippingsubdivisions, setShippingsubdivisions] = useState([]);
    const [Shippingsubdivision, setShippingsubdivision] = useState('');
    const [Shippingoptions, setShippingoptions] = useState([]);
    const [Shippingoption, setShippingoption] = useState('');

    const countries = Object.entries(ShippingCountries).map( ([code, name]) => ({id: code, label: name }));
    console.log(countries)

    const fetshShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
        // console.log(countries)
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0]);

    }

    useEffect(() => {
        fetshShippingCountries(checkoutToken.id);
    }, [])


    return (
        <>
            <Typography variant="h6" gutterBottom> shipping address </Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput required name='first name' label='First Name' />
                        <FormInput required name='last name' label='last Name' />
                        <FormInput required name='adresse 1' label='adresse 1' />
                        <FormInput required name='email name' label='email' />
                        <FormInput required name='city' label='city' />
                        <FormInput required name='ZIP' label='ZIP' />

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

                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel> shipping subdivision </InputLabel>

                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    select me
                                </MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel> shipping options </InputLabel>

                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    select me
                                </MenuItem>
                            </Select>
                        </Grid> */}

                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AdressForm
