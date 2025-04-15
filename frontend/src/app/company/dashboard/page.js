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
  Divider,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CompanyDashboard() {
  const router = useRouter();

  // Example data - replace with actual data from your backend
  const stats = [
    {
      title: "Total Challenges",
      count: 24,
      icon: <EmojiEventsIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      change: "+3 this month"
    },
    {
      title: "Active Courses",
      count: 12,
      icon: <MenuBookIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
      change: "+2 this month"
    },
    {
      title: "Hackathons Posted",
      count: 8,
      icon: <GroupsIcon sx={{ fontSize: 40, color: '#ed6c02' }} />,
      change: "+1 this month"
    },
    {
      title: "Total Participants",
      count: 456,
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#9c27b0' }} />,
      change: "+45 this month"
    }
  ];

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Company Name and Welcome Message */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Company Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Welcome back, Tech Corp
        </Typography>
      </Box>

      {/* Statistics Overview */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              elevation={0}
              sx={{ 
                height: '100%',
                border: '1px solid #e0e0e0',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)'
                }
              }}
            >
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2 
                }}>
                  {stat.icon}
                  <Typography 
                    variant="h4" 
                    fontWeight="bold"
                  >
                    {stat.count}
                  </Typography>
                </Box>
                <Typography variant="h6" gutterBottom>
                  {stat.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="success.main"
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    mb: stat.title === "Total Participants" ? 2 : 0
                  }}
                >
                  {stat.change}
                </Typography>
                {stat.title === "Total Participants" && (
                  <Link href="../company/talentpool" passHref>
                    <Button 
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        mt: 1,
                        borderColor: '#9c27b0',
                        color: '#9c27b0',
                        '&:hover': {
                          borderColor: '#7b1fa2',
                          backgroundColor: 'rgba(156, 39, 176, 0.04)'
                        }
                      }}
                    >
                      View Talents
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Button 
              variant="contained" 
              fullWidth
              sx={{ height: '48px' }}
              onClick={() => handleNavigation('/company/challenges/create')}
            >
              Post New Challenge
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button 
              variant="contained" 
              fullWidth
              sx={{ height: '48px' }}
              onClick={() => handleNavigation('/company/courses/upload')}
            >
              Create Course
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button 
              variant="contained" 
              fullWidth
              sx={{ height: '48px' }}
              onClick={() => handleNavigation('/company/hackathon/create')}
            >
              Schedule Hackathon
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Recent Activity */}
      <Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Recent Activity
        </Typography>
        <Card elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
          <CardContent>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body1" fontWeight="medium">
                  New challenge submissions
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  5 new submissions for &quot;Web Development Challenge&quot;
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="body1" fontWeight="medium">
                  Course completion
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  12 students completed &quot;Advanced JavaScript Course&quot;
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="body1" fontWeight="medium">
                  Upcoming hackathon
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  &quot;Innovation Challenge&quot; starts in 3 days
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
