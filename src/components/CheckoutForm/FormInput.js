import React from 'react'
import {TextField, Grid} from '@material-ui/core'
import {useFormContext, Controller} from 'react-hook-form'

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const FormInput = ({name, label, required}) => {
    const { control } = useFormContext();

    return (
        <Grid item xs={12} sm={6}>
            <Controller
            as={TextField}
            control={control}
            fullWidth
            name={name}
            label={label}
            required={required} />
            
        </Grid>
    )
}

export default FormInput
