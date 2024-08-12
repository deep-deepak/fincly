import { Button, Typography } from '@mui/material'
import React from 'react'

export default function AddInvoice({ handleClick }) {



    return (
        <div>
            <Typography variant='h3'>
                Dodaj fakturę
            </Typography>
            <Button variant='contained'>składać</Button>
            <Button variant='contained' onClick={() => handleClick("")}>kank</Button>
        </div>
    )
}
