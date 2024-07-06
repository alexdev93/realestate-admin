import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';

const NewsForm = () => {

  const { createArticle } = useAppContext();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    releaseDate: '',
    author: '',
    file: null,
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
      setLoading(true)
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('releaseDate', formData.releaseDate);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('file', formData.file);

      await createArticle(formDataToSend).then(() => setLoading(false));
      
  };

  return (
    <Container maxWidth="sm" sx={{margin: 10}}>
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
    </Container>
  );
};

export default NewsForm;
