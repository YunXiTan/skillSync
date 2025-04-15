'use client';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';
import { useRef } from 'react';

export default function LandingPage() {
  const registerSectionRef = useRef(null);

  const scrollToRegister = () => {
    registerSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      title: "Challenge-Based Learning",
      description: "Engage in real industry challenges, from hackathons to policy analysis. Win job offers and internships while you learn.",
      icon: <StarIcon sx={{ fontSize: 40, color: '#1976d2' }} />
    },
    {
      title: "Progress Through Ranks",
      description: "Advance from Bronze to Gold level as you complete challenges and courses, showcasing your growing expertise.",
      icon: <EmojiEventsIcon sx={{ fontSize: 40, color: '#FFD700' }} />
    },
    {
      title: "University Integration",
      description: "Access industry-verified content that aligns with your curriculum and future career path.",
      icon: <SchoolIcon sx={{ fontSize: 40, color: '#1976d2' }} />
    },
    {
      title: "Industry Connection",
      description: "Connect directly with companies through challenges and showcase your skills to potential employers.",
      icon: <BusinessIcon sx={{ fontSize: 40, color: '#1976d2' }} />
    }
  ];

  const rankingLevels = [
    {
      level: "Bronze",
      color: "#CD7F32",
      description: "Start your journey with introductory challenges and fundamental skills development."
    },
    {
      level: "Silver",
      color: "#C0C0C0",
      description: "Take on more complex tasks and practical applications as you advance."
    },
    {
      level: "Gold",
      color: "#FFD700",
      description: "Master advanced challenges and connect directly with industry opportunities."
    }
  ];

  const handleRegister = (type) => {
    router.push(`/auth/register?type=${type}`);
  };

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ 
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        py: 8
      }}>
        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          SkillSync
        </Typography>
        <Typography variant="h4" color="textSecondary" sx={{ mb: 4 }}>
          Where Learning Meets Opportunity
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 4, maxWidth: '800px' }}>
          Connect with industry challenges, advance your skills, and land your dream job through verified learning experiences.
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          sx={{ mt: 2 }}
          onClick={scrollToRegister}
        >
          Get Started
        </Button>
      </Box>

      {/* Key Features Section */}
      <Box sx={{ py: 8 }}>
        <Typography variant="h3" textAlign="center" gutterBottom fontWeight="bold">
          Key Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card elevation={0} sx={{ height: '100%', border: '1px solid #eee' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {feature.icon}
                    <Typography variant="h5" sx={{ ml: 2 }} fontWeight="bold">
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="textSecondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Ranking System Section */}
      <Box sx={{ py: 8, bgcolor: '#f5f5f5' }}>
        <Typography variant="h3" textAlign="center" gutterBottom fontWeight="bold">
          Progress Through Ranks
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {rankingLevels.map((rank, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card elevation={0} sx={{ height: '100%', border: '1px solid #eee' }}>
                <CardContent>
                  <EmojiEventsIcon sx={{ fontSize: 40, color: rank.color, mb: 2 }} />
                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    {rank.level}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {rank.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box 
        ref={registerSectionRef}
        sx={{ py: 8, textAlign: 'center' }}
      >
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Ready to Begin Your Journey?
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
          Join SkillSync today and start your path to success
        </Typography>
        
        {/* Register Buttons */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={3} 
          justifyContent="center"
          alignItems="center"
        >
          <Link href="auth/register" passHref>
            <Button 
              variant="contained" 
              size="large"
              startIcon={<SchoolIcon />}
              sx={{
                backgroundColor: '#FBAC01',
                '&:hover': {
                  backgroundColor: '#FBAC01',
                },
                minWidth: 200,
                py: 1.5
              }}
            >
              Register as Student
            </Button>
          </Link>
          <Link href="auth/registerEmp" passHref>
            <Button 
              variant="outlined" 
              size="large"
              startIcon={<BusinessIcon />}
              sx={{
                borderColor: '#FF7409',
                color: '#FF7409',
                '&:hover': {
                  borderColor: '#FF4F09',
                  color: '#FF4F09',
                  backgroundColor: 'rgba(255, 116, 9, 0.04)'
                },
                minWidth: 200,
                py: 1.5
              }}
            >
              Register as Employer
            </Button>
          </Link>
        </Stack>
      </Box>
    </Container>
  );
}