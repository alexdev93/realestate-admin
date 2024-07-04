import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Grid,
    Box,
} from '@mui/material';
import { DatePicker } from '@mui/lab';
import { useAppContext } from '../AppContext';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const HouseForm = ({ onSubmit }) => {

    const { createHouse } = useAppContext();

    const [formValues, setFormValues] = useState({
        location: '',
        price: '',
        releaseDate: null,
        details: '',
        imagePath: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormValues({ ...formValues, releaseDate: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const formDataToSend = new FormData();
        formDataToSend.append('location', formValues.location);
        formDataToSend.append('price', formValues.price);
        formDataToSend.append('releaseDate', formValues.releaseDate);
        formDataToSend.append('details', formValues.details);
        formDataToSend.append('imagePath', formValues.imagePath);

        await createHouse(formDataToSend);
        }catch(e){
            throw Error(e);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={4} mb={2}>
                <Typography variant="h4" component="h1" align="center">
                    Add New House
                </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="location"
                            label="Location"
                            fullWidth
                            value={formValues.location}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="price"
                            label="Price"
                            fullWidth
                            value={formValues.price}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Release Date"
                                value={formValues.releaseDate}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="details"
                            label="Details"
                            fullWidth
                            multiline
                            rows={4}
                            value={formValues.details}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="imagePath"
                            label="Image Path"
                            fullWidth
                            value={formValues.imagePath}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Add House
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default HouseForm;
