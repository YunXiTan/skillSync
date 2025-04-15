'use client';
import React, { useState } from 'react';
import {
Container,
Typography,
Box,
Button,
Paper,
Chip,
Stack,
Stepper,
Step,
StepLabel,
List,
ListItem,
ListItemIcon,
ListItemText,
Card,
CardContent,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

const steps = ['Overview', 'Curriculum', 'Enrollment'];

export default function CourseDetailPage({ params }) {
  const unwrappedParams = React.use(params);
  const courseId = unwrappedParams.id;
  
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  // Mock course data
  const course = {
    id: courseId,
    title: 'Full Stack Web Development',
    subCategory: 'Web Development',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    description: 'Master modern web development with MERN stack. Build real-world projects from scratch to deployment.',
    rating: 4.8,
    enrolledCount: 156,
    learningObjectives: [
        'Build full-stack web applications using MERN stack',
        'Implement user authentication and authorization',
        'Create RESTful APIs with Node.js and Express',
        'Design and integrate MongoDB databases',
        'Deploy applications to cloud platforms'
    ],
    prerequisites: [
        'Basic understanding of HTML, CSS, and JavaScript',
        'Familiarity with web development concepts',
        'Basic command line knowledge'
    ],
    curriculum: [
        {
        title: 'Introduction to Web Development',
        topics: ['HTML5', 'CSS3', 'JavaScript Basics']
        },
        {
        title: 'Frontend Development with React',
        topics: ['React Fundamentals', 'State Management', 'Routing']
        },
        {
        title: 'Backend Development with Node.js',
        topics: ['Node.js Basics', 'Express.js', 'RESTful APIs']
        },
        {
        title: 'Database Integration',
        topics: ['MongoDB', 'Mongoose ODM', 'Data Modeling']
        }
    ],
    resources: [
        {
        title: 'Course Materials',
        url: 'https://example.com/materials'
        },
        {
        title: 'Documentation Hub',
        url: 'https://example.com/docs'
        }
    ],
    enrollmentDetails: [
        'Access to all course materials',
        'Project-based assignments',
        'Certificate upon completion',
        'Community support',
        'Live coding sessions'
    ]
  };

  const handleEnroll = () => {
    router.push(`/courses/${courseId}/enroll`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={4}>
        {/* Navigation */}
        <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{ alignSelf: 'flex-start' }}
        >
            Back to Courses
        </Button>

        {/* Header */}
        <Paper sx={{ p: 3 }}>
            <Stack spacing={2}>
            <Chip 
                label={course.subCategory}
                variant="outlined"
                size="small"
            />

            <Typography variant="h4">
                {course.title}
            </Typography>

            <Typography variant="body1" color="text.secondary">
                {course.description}
            </Typography>

            <Stack direction="row" spacing={3} alignItems="center">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StarIcon color="action" />
                <Typography>{course.rating} rating</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <GroupIcon color="action" />
                <Typography>{course.enrolledCount} enrolled</Typography>
                </Box>
            </Stack>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {course.skills.map((skill) => (
                <Chip 
                    key={skill}
                    label={skill}
                    size="small"
                    variant="outlined"
                />
                ))}
            </Box>
            </Stack>
        </Paper>

        {/* Content */}
        <Box>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
                <Step key={label}>
                <StepLabel>{label}</StepLabel>
                </Step>
            ))}
            </Stepper>

            <Stack spacing={4}>
            {activeStep === 0 && (
                <>
                {/* Learning Objectives */}
                <Card>
                    <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Learning Objectives
                    </Typography>
                    <List>
                        {course.learningObjectives.map((objective, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>
                            <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={objective} />
                        </ListItem>
                        ))}
                    </List>
                    </CardContent>
                </Card>

                {/* Prerequisites */}
                <Card>
                    <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Prerequisites
                    </Typography>
                    <List>
                        {course.prerequisites.map((req, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>
                            <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={req} />
                        </ListItem>
                        ))}
                    </List>
                    </CardContent>
                </Card>

                {/* Resources */}
                <Card>
                    <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Course Resources
                    </Typography>
                    <List>
                        {course.resources.map((resource, index) => (
                        <ListItem key={index}>
                            <ListItemText 
                            primary={
                                <a 
                                href={resource.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ color: 'inherit', textDecoration: 'none' }}
                                >
                                {resource.title}
                                </a>
                            }
                            />
                        </ListItem>
                        ))}
                    </List>
                    </CardContent>
                </Card>
                </>
            )}

            {activeStep === 1 && (
                <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                    Course Curriculum
                    </Typography>
                    <List>
                    {course.curriculum.map((module, moduleIndex) => (
                        <React.Fragment key={moduleIndex}>
                        <ListItem>
                            <ListItemIcon>
                            <MenuBookIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                            primary={module.title}
                            secondary={
                                <List dense>
                                {module.topics.map((topic, topicIndex) => (
                                    <ListItem key={topicIndex}>
                                    <ListItemText primary={`• ${topic}`} />
                                    </ListItem>
                                ))}
                                </List>
                            }
                            />
                        </ListItem>
                        </React.Fragment>
                    ))}
                    </List>
                </CardContent>
                </Card>
            )}

            {activeStep === 2 && (
                <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                    What You'll Get
                    </Typography>
                    <List>
                    {course.enrollmentDetails.map((detail, index) => (
                        <ListItem key={index}>
                        <ListItemIcon>
                            <SchoolIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={detail} />
                        </ListItem>
                    ))}
                    </List>
                </CardContent>
                </Card>
            )}
            </Stack>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
            disabled={activeStep === 0}
            onClick={() => setActiveStep((prev) => prev - 1)}
            >
            Previous
            </Button>
            <Box>
            {activeStep === steps.length - 1 ? (
                <Button
                variant="contained"
                startIcon={<SchoolIcon />}
                onClick={handleEnroll}
                sx={{
                    bgcolor: 'orange',
                    '&:hover': {
                    bgcolor: 'darkorange',
                    }
                }}
                >
                Enroll Now
                </Button>
            ) : (
                <Button
                variant="contained"
                onClick={() => setActiveStep((prev) => prev + 1)}
                sx={{
                    bgcolor: 'orange',
                    '&:hover': {
                    bgcolor: 'darkorange',
                    }
                }}
                >
                Next
                </Button>
            )}
            </Box>
        </Box>
        </Stack>
    </Container>
  );
} 