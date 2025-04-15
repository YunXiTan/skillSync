import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Grid,
  Button,
  Stack,
  Card,
  CardContent,
  Divider,
  Link,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; 
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';

export default function ProfilePage() {
  const user = {
    name: "Ivan Tan",
    email: "ivantan@email.com",
    rank: "Silver",
    category: 'Technology',
    subCategory: 'Web Development',
    university: 'Universiti Malaya (UM)',
    challenges: [
      {
        title: 'Build a REST API',
        difficulty: 'Medium',
        points: 90,
        subCategory: 'Web Development',
        skills: ['Node.js', 'Express', 'MongoDB'],
        role: 'Backend Developer',
        description: 'Create a RESTful API with Node.js and Express, including authentication and database integration.'
      },
      {
        title: 'React State Management',
        difficulty: 'Hard',
        points: 150,
        subCategory: 'Web Development',
        skills: ['React', 'Redux', 'JavaScript'],
        role: 'Frontend Developer',
        description: 'Implement complex state management in a React application using Redux and middleware.'
      }
    ],
    coursesCompleted: 10,
    skills: [
      { skill: "JavaScript" },
      { skill: "React" },
      { skill: "Node.js" },
    ],
    courses: [
      { 
        name: "Full Stack Web Development", 
        date: "1 Jan 2024",
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        description: 'Master modern web development with MERN stack. Build real-world projects from scratch to deployment.',
        rating: 4.8,
      },
      { 
        name: "Python for Data Science", 
        date: "31 Dec 2024",
        skills:  ['Python', 'Data Analysis', 'Machine Learning'],
        description: 'Learn Python programming for data analysis, visualization, and machine learning.',
        rating: 4.7,
      },
      { 
        name: "Mobile App Development", 
        date: "24 Dec 2024",
        skills: ['React Native', 'JavaScript', 'Mobile Design'],
        description: 'Create cross-platform mobile applications using React Native framework.',
        rating: 4.6,
      },
    ],
    hackathons: [
      { name: "AI Innovation Challenge", date: "24 Jan 2024" },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Profile Header */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box textAlign="center">
          <Avatar
            src="https://via.placeholder.com/150"
            alt="Profile Picture"
            sx={{ width: 100, height: 100, margin: "0 auto" }}
          />
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
            {user.name}
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 1,
              mt: 1
            }}
          >
            <EmailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
            <Link 
              href={`mailto:${user.email}`}
              style={{ 
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  '&:hover': {
                    textDecoration: 'underline',
                    color: 'primary.main'
                  }
                }}
              >
                {user.email}
              </Typography>
            </Link>
          </Box>

          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 1,
              mt: 1,
              color: 'text.secondary'
            }}
          >
            <Typography variant="body2">
              {user.category}
            </Typography>
            <Typography variant="body2">|</Typography>
            <Typography variant="body2">
              {user.subCategory}
            </Typography>
            <Typography variant="body2">|</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <SchoolIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">
                {user.university}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid
            item
            xs={4}
            textAlign="center"
            sx={{
                position: "relative",
                "&::after": {
                content: '""',
                position: "absolute",
                right: 0,
                top: "25%",
                height: "65%",
                width: "1px",
                backgroundColor: "#CCCCCC",
                },
            }}
            >
            <Box
                sx={{
                display: "flex",
                flexDirection: "row", // Arrange icon and text in a row
                alignItems: "center", // Center-align icon and text
                justifyContent: "center", // Center the content
                gap: 1, // Add spacing between icon and text
                }}
            >
                <EmojiEventsIcon sx={{ fontSize: 40, color: "#C0C0C0" }} /> {/* Changed to silver color */}
                <Box>
                <Typography variant="h6">
                    {user.rank}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Rank
                </Typography>
                </Box>
            </Box>
            </Grid>
          <Grid item xs={4} textAlign="center" sx={{ 
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              right: 0,
              top: '25%',
              height: '65%',
              width: '1px',
              backgroundColor: '#CCCCCC'
            }
          }}>
            <Typography variant="h6">{user.challenges.length}</Typography>
            <Typography variant="body2" color="textSecondary">
              Challenges
            </Typography>
          </Grid>
          
          <Grid item xs={4} textAlign="center">
            <Typography variant="h6">{user.coursesCompleted}</Typography>
            <Typography variant="body2" color="textSecondary">
              Courses Completed
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Challenges Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Challenges
        </Typography>
        <Grid container spacing={2}>
          {user.challenges.map((challenge, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                elevation={0} 
                sx={{ 
                  border: '1px solid #CCCCCC',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#1976d2',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="body1" fontWeight="bold">
                      {challenge.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'white',
                        bgcolor: challenge.difficulty === 'Hard' ? '#f44336' : '#ff9800',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.75rem'
                      }}
                    >
                      {challenge.difficulty}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {challenge.description}
                  </Typography>

                  <Box sx={{ my: 2 }}>
                    {challenge.skills.map((skill, skillIndex) => (
                      <Typography
                        key={skillIndex}
                        component="span"
                        sx={{
                          border: '1px solid #FF7409',
                          backgroundColor: 'transparent',
                          color: '#FF7409',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          mr: 0.5,
                          mb: 0.5,
                          display: 'inline-block',
                          fontSize: '0.75rem',
                        }}
                      >
                        {skill}
                      </Typography>
                    ))}
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2 
                  }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'primary.main',
                        fontWeight: 'medium'
                      }}
                    >
                      {challenge.role}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'success.main',
                        fontWeight: 'bold'
                      }}
                    >
                      {challenge.points} pts
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button variant="text" sx={{ mt: 2 }}>
          Show All →
        </Button>
      </Paper>

      {/* Courses Enrolled Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Courses Enrolled
        </Typography>
        <Grid container spacing={2}>
          {user.courses.map((course, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                elevation={0} 
                sx={{ 
                  border: '1px solid #CCCCCC',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#1976d2',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)'
                  }
                }}
              >
                <CardContent>
                  <Typography variant="body1" fontWeight="bold" gutterBottom>
                    {course.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {course.description}
                  </Typography>
                  <Box sx={{ my: 1 }}>
                    {course.skills.map((skill, skillIndex) => (
                      <Typography
                        key={skillIndex}
                        component="span"
                        sx={{
                          border: '1px solid #FF7409',
                          backgroundColor: 'transparent',
                          color: '#FF7409',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          mr: 0.5,
                          mb: 0.5,
                          display: 'inline-block',
                          fontSize: '0.75rem',
                        }}
                      >
                        {skill}
                      </Typography>
                    ))}
                  </Box>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 2 
                    }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      {course.date}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'success.main',
                        fontWeight: 'bold'
                      }}
                    >
                      ★ {course.rating}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button variant="text" sx={{ mt: 2 }}>
          Show All →
        </Button>
      </Paper>

      {/* Hackathon Experiences Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Hackathon Experiences
        </Typography>
        <Stack spacing={2}>
          {user.hackathons.map((hackathon, index) => (
            <Box key={index}>
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {hackathon.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {hackathon.date}
                </Typography>
              </Box>
              {/* Add divider if not the last item */}
              {index < user.hackathons.length - 1 && (
                <Box sx={{ 
                  height: '1px',
                  backgroundColor: '#e0e0e0',
                  width: '100%',
                  mt: 2,
                  mb: 2
                }} />
              )}
            </Box>
          ))}
        </Stack>
        <Button 
          variant="text" 
          sx={{ 
            mt: 2,
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline'
            }
          }}
        >
          Show All →
        </Button>
      </Paper>

      {/* Skills Section */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Skills
        </Typography>
        <Stack spacing={2}>
          {user.skills.map((skill, index) => (
            <Box key={index}>
              <Box>
                <Typography variant="body1">
                  {skill.skill}
                </Typography>
              </Box>
              {/* Add divider if not the last item */}
              {index < user.skills.length - 1 && (
                <Box sx={{ 
                  height: '1px',
                  backgroundColor: '#e0e0e0',
                  width: '100%',
                  mt: 2,
                  mb: 2
                }} />
              )}
            </Box>
          ))}
        </Stack>
        <Button 
          variant="text" 
          sx={{ 
            mt: 2,
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline'
            }
          }}
        >
          Show all skills →
        </Button>
      </Paper>
    </Container>
  );
}
