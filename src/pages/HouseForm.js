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

const HouseForm = () => {
    const { createHouse } = useAppContext();
    const [loading, setLoading] = useState(false);

    const [formValues, setFormValues] = useState({
        location: '',
        price: '',
        releaseDate: null,
        details: '',
        sellerName: '',
        file: null, // To store the uploaded file
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormValues({ ...formValues, releaseDate: date });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormValues({ ...formValues, file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('location', formValues.location);
            formDataToSend.append('price', formValues.price);
            formDataToSend.append('releaseDate', formValues.releaseDate);
            formDataToSend.append('details', formValues.details);
            formDataToSend.append('sellerName', formValues.sellerName);
            formDataToSend.append('file', formValues.file); // Append the file

            await createHouse(formDataToSend).then(() => setLoading(false));
        } catch (error) {
            console.error('Error adding house:', error);
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
                            name="sellerName"
                            label="Seller Name"
                            fullWidth
                            value={formValues.sellerName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".jpg, .jpeg, .png" // Add accepted file types
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default HouseForm;
