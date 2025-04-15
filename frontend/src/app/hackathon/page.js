'use client';
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Tabs,
  Tab,
  Chip,
  Stack,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import PaidIcon from '@mui/icons-material/Paid';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HackathonCard from '@/components/hackathon/HackathonCard';

// Mock data - move to a separate file later
const hackathons = {
  ongoing: [
    {
      id: 1,
      title: "AI Innovation Challenge",
      company: "Tech Corp",
      description: "Build the next generation of AI applications",
      image: '/images/hackathon_1.jpg',
      prizes: ["$10,000", "Job Opportunities", "Mentorship"],
      deadline: "2024-02-15",
      participants: 156,
      tags: ["AI", "Machine Learning", "Innovation"]
    },{
      id: 2,
      title: "AI Innovation Challenge",
      company: "Tech Corp",
      description: "Build the next generation of AI applications",
      image: '/images/hackathon_2.jpg',
      prizes: ["$10,000", "Job Opportunities", "Mentorship"],
      deadline: "2024-02-15",
      participants: 156,
      tags: ["AI", "Machine Learning", "Innovation"]
    },{
      id: 3,
      title: "AI Innovation Challenge",
      company: "Tech Corp",
      description: "Build the next generation of AI applications",
      image: '/images/hackathon_3.jpg',
      prizes: ["$10,000", "Job Opportunities", "Mentorship"],
      deadline: "2024-02-15",
      participants: 156,
      tags: ["AI", "Machine Learning", "Innovation"]
    },
  ],
  past: [
    {
      id: 3,
      title: "Web3 Development Challenge",
      company: "Blockchain Inc",
      description: "Building the future of decentralized applications",
      image: "https://via.placeholder.com/400x200",
      prizes: ["$15,000", "Job Offers", "Investment Opportunity"],
      winners: ["Team Alpha", "Team Beta", "Team Gamma"],
      tags: ["Blockchain", "Web3", "DeFi"]
    },
    // ... other past hackathons
  ]
};

export default function HackathonPage() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom>
          Explore Hackathons
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Participate in challenges, win prizes, and land your dream job
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          <Chip icon={<PaidIcon />} label="Cash Prizes" color="primary" />
          <Chip icon={<WorkIcon />} label="Job Opportunities" color="primary" />
          <Chip icon={<EmojiEventsIcon />} label="Recognition" color="primary" />
        </Stack>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={currentTab} onChange={handleTabChange} centered>
          <Tab label="Ongoing Hackathons" />
          <Tab label="Past Hackathons" />
        </Tabs>
      </Box>

      {/* Hackathon Grid */}
      <Grid container spacing={4}>
        {(currentTab === 0 ? hackathons.ongoing : hackathons.past).map((hackathon) => (
          <Grid item xs={12} md={6} key={hackathon.id}>
            <HackathonCard 
              hackathon={hackathon} 
              isOngoing={currentTab === 0}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
