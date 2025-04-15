'use client';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { useState } from 'react';

export default function RegistrationModal({ open, onClose, hackathonTitle }) {
  const [formData, setFormData] = useState({
    teamName: '',
    teamSize: '',
    projectIdea: '',
    techStack: '',
    email: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.teamName || !formData.teamSize || !formData.email) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      // Here you would typically make an API call to register
      console.log('Submitting registration:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear form and close modal
      setFormData({
        teamName: '',
        teamSize: '',
        projectIdea: '',
        techStack: '',
        email: '',
      });
      onClose(true); // true indicates successful registration
    } catch (err) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
      <DialogTitle>
        Register for {hackathonTitle}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <TextField
            required
            label="Team Name"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            fullWidth
          />

          <FormControl required fullWidth>
            <InputLabel>Team Size</InputLabel>
            <Select
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              label="Team Size"
            >
              <MenuItem value={1}>1 person</MenuItem>
              <MenuItem value={2}>2 people</MenuItem>
              <MenuItem value={3}>3 people</MenuItem>
              <MenuItem value={4}>4 people</MenuItem>
            </Select>
          </FormControl>

          <TextField
            required
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Project Idea"
            name="projectIdea"
            value={formData.projectIdea}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />

          <TextField
            label="Preferred Tech Stack"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            fullWidth
            placeholder="e.g., React, Node.js, Python"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleSubmit}
        >
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
} 