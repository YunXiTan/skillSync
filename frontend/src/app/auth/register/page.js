'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Container,
  TextField,
  MenuItem
} from '@mui/material';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    university: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const universities = [
    "Universiti Malaya (UM)",
    "Universiti Kebangsaan Malaysia (UKM)",
    "Universiti Teknologi Malaysia (UTM)",
    "Universiti Sains Malaysia (USM)",
    "Universiti Teknologi MARA (UiTM)",
    "International Islamic University Malaysia (IIUM)",
    "Universiti Putra Malaysia (UPM)",
    "Universiti Malaysia Sarawak (UNIMAS)",
    "Universiti Malaysia Sabah (UMS)",
    "Universiti Pendidikan Sultan Idris (UPSI)",
    "Universiti Malaysia Terengganu (UMT)",
    "Universiti Utara Malaysia (UUM)",
    "Universiti Malaysia Pahang (UMP)",
    "Universiti Malaysia Kelantan (UMK)",
    "Universiti Tun Hussein Onn Malaysia (UTHM)",
    "Universiti Teknikal Malaysia Melaka (UTeM)",
    "Universiti Islam Antarabangsa Sultan Abdul Halim Mu'adzam Shah (UniSHAMS)",
    "Universiti Sultan Zainal Abidin (UniSZA)"
  ];
  
  return (
    <Container maxWidth="md">
      <Box sx={{ minHeight: '100vh', py: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ p: 6, borderRadius: 2, width:'65%'}}>
          <Typography variant="h5" component="h1" gutterBottom textAlign="center" color="primary" fontWeight="bold">
            SkillSync
          </Typography>
          <Typography variant="body1" color="textSecondary" textAlign="center" gutterBottom>
            Register your account to get started
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                id="name"
                name="name"
                label="Full Name"
                variant="outlined"
                required
                fullWidth
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                id="phone"
                name="phone"
                label="Phone Number"
                type="tel"
                variant="outlined"
                required
                fullWidth
                value={formData.phone}
                onChange={handleChange}
              />
              <TextField
                id="email"
                name="email"
                label="Email Address"
                type="email"
                variant="outlined"
                required
                fullWidth
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                id="university"
                name="university"
                select
                label="University"
                variant="outlined"
                required
                fullWidth
                value={formData.university}
                onChange={handleChange}
              >
                {universities.map((university) => (
      <MenuItem key={university} value={university}>
        {university}
      </MenuItem>
    ))}
  </TextField>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                required
                fullWidth
                value={formData.password}
                onChange={handleChange}
              />
              <Link href="/auth/surveyForm" passHref>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Account
              </Button>
              </Link>
              
            </Stack>
          </form>
          <Typography variant="body2" textAlign="center" mt={2}>
            Already have an account?{' '}
            <Link href="/auth/login" passHref>
              <Button variant="text" color="secondary">
                Sign in
              </Button>
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
