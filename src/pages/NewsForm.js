import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { TextField, Button, Grid, Typography, Container, CircularProgress, Backdrop } from '@mui/material';

const NewsForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    releaseDate: '',
    author: '',
    file: null, // to store the uploaded file
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    setLoading(true); // Set loading to true when the form is submitted
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('releaseDate', formData.releaseDate);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('file', formData.file);

      const response = await fetch(`https://back-api-cvlq.onrender.com/api/news`, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        alert('Failed to create news');
        throw new Error('Failed to create news');
      }

      const news = await response.json();
      console.log('Created news:', news);
      alert('Created news');
      // Optionally, redirect or show success message
    } catch (error) {
      console.error('Error creating news:', error);
      // Handle error (show error message, etc.)
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add News
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Content"
              name="content"
              multiline
              rows={4}
              value={formData.content}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Release Date"
              name="releaseDate"
              type="date"
              value={formData.releaseDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleChange}
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
      <Backdrop open={loading} style={{ zIndex: 1300 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default NewsForm;
