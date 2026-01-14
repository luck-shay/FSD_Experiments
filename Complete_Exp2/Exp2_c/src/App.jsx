import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Paper,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Send as SendIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    subscribe: false,
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Form submitted! Check console for data.');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          Material UI Form Design
        </Typography>
        
        <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary" sx={{ mb: 3 }}>
          Experiment-3: UI Design Using Material UI Components
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Text Field - Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>

            {/* Text Field - Email */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>

            {/* Text Field - Password */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                required
                helperText="Password must be at least 8 characters"
              />
            </Grid>

            {/* Select Dropdown */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Country</InputLabel>
                <Select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  label="Country"
                >
                  <MenuItem value="">
                    <em>Select Country</em>
                  </MenuItem>
                  <MenuItem value="usa">United States</MenuItem>
                  <MenuItem value="uk">United Kingdom</MenuItem>
                  <MenuItem value="india">India</MenuItem>
                  <MenuItem value="canada">Canada</MenuItem>
                  <MenuItem value="australia">Australia</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Radio Buttons */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Checkbox */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="subscribe"
                    checked={formData.subscribe}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Subscribe to newsletter"
              />
            </Grid>

            {/* Buttons */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={<SendIcon />}
                  size="large"
                >
                  Submit
                </Button>
                
                <Button
                  variant="outlined"
                  color="secondary"
                  endIcon={<EditIcon />}
                  size="large"
                >
                  Edit
                </Button>
                
                <Button
                  variant="text"
                  color="error"
                  endIcon={<DeleteIcon />}
                  size="large"
                >
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>

        <Divider sx={{ my: 3 }} />

        {/* Card Component Example */}
        <Card sx={{ mt: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Material UI Components Used:
            </Typography>
            <Typography variant="body2">
              • TextField (Text Inputs) • Button (Primary, Outlined, Text)
              • Select (Dropdown) • Checkbox • Radio Buttons
              • Card & CardContent • Container & Grid (Layouts)
              • Typography • Divider • Icons
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
}

export default App;
