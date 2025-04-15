'use client';
import { useState } from 'react';
import { use } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  Stack,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Snackbar,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import RegistrationModal from '@/components/hackathon/RegistrationModal';

// Mock data - move to a service later
const getHackathonDetails = (id) => ({
  id,
  title: "AI Innovation Challenge",
  company: "Tech Corp",
  description: "Build the next generation of AI applications that solve real-world problems. This hackathon focuses on creating innovative solutions using artificial intelligence and machine learning.",
  image: "/images/hackathon_1.jpg",
  prizes: [
    { title: "First Place", value: "$10,000" },
    { title: "Second Place", value: "$5,000" },
    { title: "Third Place", value: "$2,500" }
  ],
  deadline: "2024-02-15",
  startDate: "2024-02-01",
  endDate: "2024-02-15",
  participants: 156,
  maxParticipants: 200,
  tags: ["AI", "Machine Learning", "Innovation"],
  requirements: [
    "Basic knowledge of Python",
    "Understanding of ML concepts",
    "GitHub account",
    "Team of 2-4 members"
  ],
  timeline: [
    { date: "2024-02-01", event: "Registration Opens" },
    { date: "2024-02-10", event: "Team Formation Deadline" },
    { date: "2024-02-12", event: "Kickoff Event" },
    { date: "2024-02-15", event: "Project Submission" }
  ],
  opportunities: [
    "Job opportunities at Tech Corp",
    "Mentorship from industry experts",
    "Networking with tech leaders",
    "Project incubation support"
  ]
});

export default function HackathonDetail({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const hackathon = getHackathonDetails(unwrappedParams.id);
  const [isRegistering, setIsRegistering] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleRegister = () => {
    setOpenModal(true);
  };

  const handleModalClose = (success) => {
    setOpenModal(false);
    if (success) {
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mb: 2 }}
        >
          Back to Hackathons
        </Button>

        {/* Hero Section */}
        <Paper 
          sx={{ 
            position: 'relative',
            backgroundImage: `url(${hackathon.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: 300,
            mb: 4,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }
          }}
        >
          <Box sx={{ position: 'relative', color: 'white' }}>
            <Typography variant="h2" gutterBottom>
              {hackathon.title}
            </Typography>
            <Typography variant="h5">
              {hackathon.company}
            </Typography>
          </Box>
        </Paper>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                About the Hackathon
              </Typography>
              <Typography paragraph>
                {hackathon.description}
              </Typography>

              <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
                {hackathon.tags.map((tag) => (
                  <Chip key={tag} label={tag} color="primary" />
                ))}
              </Stack>

              <Typography variant="h6" gutterBottom>
                Requirements
              </Typography>
              <List>
                {hackathon.requirements.map((req) => (
                  <ListItem key={req}>
                    <ListItemText primary={req} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Timeline
              </Typography>
              <List>
                {hackathon.timeline.map((item) => (
                  <ListItem key={item.date}>
                    <ListItemIcon>
                      <CalendarTodayIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.event}
                      secondary={item.date}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, mb: 4 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleRegister}
              >
                Register Now
              </Button>

              <Box sx={{ mt: 4 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Registration Deadline
                    </Typography>
                    <Typography variant="body1">
                      {hackathon.deadline}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Participants
                    </Typography>
                    <Typography variant="body1">
                      {hackathon.participants} / {hackathon.maxParticipants}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Paper>

            <Paper sx={{ p: 4, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Prizes
              </Typography>
              <List>
                {hackathon.prizes.map((prize) => (
                  <ListItem key={prize.title}>
                    <ListItemIcon>
                      <EmojiEventsIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={prize.title}
                      secondary={prize.value}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>

            <Paper sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Opportunities
              </Typography>
              <List>
                {hackathon.opportunities.map((opp) => (
                  <ListItem key={opp}>
                    <ListItemIcon>
                      <WorkIcon />
                    </ListItemIcon>
                    <ListItemText primary={opp} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Add the Registration Modal */}
      <RegistrationModal
        open={openModal}
        onClose={handleModalClose}
        hackathonTitle={hackathon.title}
      />

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Registration successful! Check your email for confirmation."
      />
    </Container>
  );
} 