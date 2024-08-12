import React, { useState } from 'react';
import {
    Button, FormControl, Grid, InputLabel, MenuItem, Select,Typography
} from '@mui/material';

export default function Add({ handleHideForm, onFormSubmit }) {

    const [addButton, setAddButton] = handleHideForm();
    const [errors, setErrors] = useState({
        month: '',
        year: '',
        type: '',
        files: '',
    })
    const [formData, setFormData] = useState({
        month: '',
        year: '',
        type: '',
        files: [],
    });

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: '',
        }));

        if (name === 'files') {
            setFormData(prevState => ({
                ...prevState,
                files: files,
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.month) newErrors.month = 'Month is required';
        if (!formData.year) newErrors.year = 'Year is required';
        if (!formData.type) newErrors.type = 'Type is required';
        if (formData.files.length === 0) newErrors.files = 'At least one file is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        onFormSubmit(formData);
        setAddButton(false)
        setFormData({
            month: '',
            year: '',
            type: '',
            files: [],
        });

    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom >
                Dodawanie nowych dokumentów
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth error={Boolean(errors.month)}>
                        <InputLabel id="select-month-label">Wybierz miesiąc</InputLabel>
                        <Select
                            labelId="select-month-label"
                            id="select-month"
                            name="month"
                            value={formData.month}
                            onChange={handleChange}
                            label="Wybierz miesiąc"
                            fullWidth
                        >
                            <MenuItem value="January">January</MenuItem>
                            <MenuItem value="February">February</MenuItem>
                            <MenuItem value="March">March</MenuItem>
                            <MenuItem value="April">April</MenuItem>
                            <MenuItem value="May">May</MenuItem>
                            <MenuItem value="June">June</MenuItem>
                            <MenuItem value="July">July</MenuItem>
                            <MenuItem value="August">August</MenuItem>
                            <MenuItem value="September">September</MenuItem>
                            <MenuItem value="October">October</MenuItem>
                            <MenuItem value="November">November</MenuItem>
                            <MenuItem value="December">December</MenuItem>
                        </Select>
                        {errors.month && <Typography color="error">{errors.month}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth error={Boolean(errors.year)}>
                        <InputLabel id="select-year-label">Wybierz rok</InputLabel>
                        <Select
                            labelId="select-year-label"
                            id="select-year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            label="Wybierz rok"
                            fullWidth
                        >
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2024">2024</MenuItem>
                        </Select>
                        {errors.year && <Typography color="error">{errors.year}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth error={Boolean(errors.type)}>
                        <InputLabel id="select-month-label">Wybierz rodzaj</InputLabel>
                        <Select
                            labelId="select-month-label"
                            id="select-month"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            label="Wybierz rodzaj"
                            fullWidth
                        >
                            <MenuItem value="type1">type1</MenuItem>
                            <MenuItem value="type2">type2</MenuItem>
                        </Select>
                        {errors.type && <Typography color="error">{errors.type}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth error={Boolean(errors.files)}>
                        <input
                            accept=".pdf,.doc,.docx"
                            id="upload-file"
                            type="file"
                            name="files"
                            multiple
                            onChange={handleChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="upload-file">
                            <Button variant="contained" component="span">
                                Dodaj kolejny plik do kolejki
                            </Button>
                        </label>
                        {errors.files && <Typography color="error">{errors.files}</Typography>}
                        {formData.files.length > 0 && (
                            <ul>
                                {Array.from(formData.files).map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        )}
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button type="button" variant="outlined" onClick={() => setAddButton(false)} sx={{ mr: 1 }}>
                        kank
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Składać
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
