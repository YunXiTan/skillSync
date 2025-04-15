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
    email: '',
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


  return (
    <Container maxWidth="md">
      <Box sx={{ minHeight: '100vh', py: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ p: 6, borderRadius: 2, width:'65%'}}>
          <Typography variant="h5" component="h1" gutterBottom textAlign="center" color="primary" fontWeight="bold">
            SkillSync
          </Typography>
          <Typography variant="body1" color="textSecondary" textAlign="center" gutterBottom>
          Login your account to get started
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>                   
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
              <Link href="../../homepage" passHref>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Sign in  
                </Button>
              </Link>
            </Stack>
          </form>
          <Typography variant="body2" textAlign="center" mt={2}>
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" passHref>
              <Button variant="text" color="secondary">
                Create Account
              </Button>
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
