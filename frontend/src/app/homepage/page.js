'use client';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    Stack,
    Menu,
    MenuItem,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Grid,
    Card,
    CardContent,
    CardActions,
    Chip,
    FormControl,
    Select
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import StarIcon from '@mui/icons-material/Star';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CodeIcon from '@mui/icons-material/Code';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PieChartIcon from '@mui/icons-material/PieChart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useRouter } from 'next/navigation';
import WorkIcon from '@mui/icons-material/Work';

// New array-based data structure
const mockCourses = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    subCategory: 'Web Development',
    description: 'Master modern web development with MERN stack. Build real-world projects from scratch to deployment.',
    rating: 4.8,
    enrolledCount: 156,
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB']
  },
  {
    id: 2,
    title: 'Python for Data Science',
    subCategory: 'Data Science',
    description: 'Learn Python programming for data analysis, visualization, and machine learning.',
    rating: 4.7,
    enrolledCount: 80,
    skills: ['Python', 'Data Analysis', 'Machine Learning']
  },
];

const mockChallenges = [
  {
    id: 1,
    title: 'Build a REST API',
    difficulty: 'Medium',
    category: 'Web Development',
    description: 'Create a RESTful API with Node.js and Express, including authentication and database integration.',
    timeEstimate: '2 hours',
    points: 100,
    skills: ['Node.js', 'Express', 'MongoDB']
  },
  {
    id: 2,
    title: 'React State Management',
    difficulty: 'Hard',
    category: 'Web Development',
    description: 'Implement complex state management in a React application using Redux and middleware.',
    timeEstimate: '3 hours',
    points: 150,
    skills: ['React', 'Redux', 'JavaScript']
  }
];

const mockHackathons = [
  {
    id: 1,
    title: 'AI Innovation Challenge',
    category: 'AI/ML',
    subCategory: 'Innovation',
    description: 'Create innovative AI solutions for real-world problems using cutting-edge technologies.',
    startDate: 'Jan 31, 2025',
    endDate: 'Feb 1, 2025',
    location: 'Online',
    skills: ['Machine Learning', 'Python', 'Deep Learning'],
    participants: 120,
    prizePool: '$5000'
  },
  {
    id: 2,
    title: 'Green Tech Hackathon',
    category: 'Sustainability',
    subCategory: 'Technology',
    description: 'Develop sustainable technology solutions to address environmental challenges.',
    startDate: 'Feb 15, 2025',
    endDate: 'Feb 16, 2025',
    location: 'Online',
    skills: ['IoT', 'Data Analysis', 'Web Development'],
    participants: 85,
    prizePool: '$3000'
  }
];

export default function Homepage() {
  const steps = [
    'Introduction to Programming',
    'Web Development Basics',
    'Database Fundamentals',
    'Advanced Programming',
    'Final Project'
  ];

  const router = useRouter();

  const [selectedFieldForSkills, setSelectedFieldForSkills] = useState('Technology');
  const [selectedSubCategory, setSelectedSubCategory] = useState('Web Development');

  // Data for bar chart (trending skills) using subcategories
  const [trendingSkillsData] = useState({
    Technology: [
      { name: 'Web Development', growth: 75 },
      { name: 'Mobile Development', growth: 70 },
      { name: 'Cloud Computing', growth: 65 },
      { name: 'Data Science', growth: 60 },
      { name: 'Cybersecurity', growth: 55 },
    ],
    Business: [
      { name: 'Strategy', growth: 70 },
      { name: 'Operations', growth: 65 },
      { name: 'Management', growth: 60 },
      { name: 'Entrepreneurship', growth: 55 },
    ],
    Finance: [
      { name: 'Investment', growth: 70 },
      { name: 'FinTech', growth: 65 },
      { name: 'Risk Management', growth: 60 },
      { name: 'Trading', growth: 55 },
    ],
    Design: [
      { name: 'UI/UX', growth: 70 },
      { name: 'Graphic Design', growth: 65 },
      { name: 'Product Design', growth: 60 },
      { name: 'Brand Design', growth: 55 },
    ],
    Marketing: [
      { name: 'Digital Marketing', growth: 70 },
      { name: 'Content Marketing', growth: 65 },
      { name: 'Social Media', growth: 60 },
      { name: 'SEO', growth: 55 },
    ],
  });

  // Data for challenges acceptance rate
  const [challengeAcceptanceData] = useState([
    { name: 'Web Development', rate: 85 },
    { name: 'Mobile Development', rate: 75 },
    { name: 'Cloud Computing', rate: 70 },
    { name: 'Data Science', rate: 80 },
    { name: 'Cybersecurity', rate: 65 },
  ]);

  // Data for job employment ability rate
  const [employmentRateData] = useState([
    { name: 'Web Development', rate: 90 },
    { name: 'Mobile Development', rate: 85 },
    { name: 'Cloud Computing', rate: 88 },
    { name: 'Data Science', rate: 92 },
    { name: 'Cybersecurity', rate: 95 },
  ]);

  const categoryConfig = {
    Technology: {
      subCategories: ['Web Development', 'Mobile Development', 'Cloud Computing', 'Data Science', 'Cybersecurity'],
      skills: ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Machine Learning'],
    },
    Business: {
      subCategories: ['Strategy', 'Operations', 'Management', 'Entrepreneurship'],
      skills: ['Business Analysis', 'Project Management', 'Strategic Planning', 'Leadership'],
    },
    Finance: {
      subCategories: ['Investment', 'FinTech', 'Risk Management', 'Trading'],
      skills: ['Financial Analysis', 'Risk Assessment', 'Blockchain', 'Trading Strategies'],
    },
    Design: {
      subCategories: ['UI/UX', 'Graphic Design', 'Product Design', 'Brand Design'],
      skills: ['UI Design', 'User Research', 'Wireframing', 'Prototyping'],
    },
    Marketing: {
      subCategories: ['Digital Marketing', 'Content Marketing', 'Social Media', 'SEO'],
      skills: ['Social Media Marketing', 'Content Strategy', 'Analytics', 'SEO Optimization'],
    }
  };

  // Update the orange color palette
  const ORANGE_COLORS = [
    '#A83000',
    '#D53C00', // Dark orange
    '#FD6E00',
    '#FBAC01',
    '#FFC23D',
    '#F6DB2E',
  ];

  // Helper function to get skills data for pie chart with different percentages
  const getSkillsData = (field, subCategory) => {
    const subCategorySkillsData = {
      'Web Development': [
        { name: 'JavaScript', value: 20 },
        { name: 'Python', value: 30 },
        { name: 'React', value: 40 },
        { name: 'Node.js', value: 10 },
      ],
      'Mobile Development': [
        { name: 'React Native', value: 35 },
        { name: 'Flutter', value: 25 },
        { name: 'Swift', value: 20 },
        { name: 'Kotlin', value: 20 },
      ],
      'Cloud Computing': [
        { name: 'AWS', value: 40 },
        { name: 'Azure', value: 30 },
        { name: 'Docker', value: 20 },
        { name: 'Kubernetes', value: 10 },
      ],
      'Data Science': [
        { name: 'Python', value: 35 },
        { name: 'R', value: 25 },
        { name: 'SQL', value: 25 },
        { name: 'Tableau', value: 15 },
      ],
      'Cybersecurity': [
        { name: 'Network Security', value: 30 },
        { name: 'Cryptography', value: 25 },
        { name: 'Ethical Hacking', value: 25 },
        { name: 'Security Tools', value: 20 },
      ],
      'Strategy': [
        { name: 'Strategic Planning', value: 40 },
        { name: 'Market Analysis', value: 30 },
        { name: 'Risk Management', value: 30 },
      ],
      'Operations': [
        { name: 'Process Optimization', value: 35 },
        { name: 'Quality Management', value: 35 },
        { name: 'Supply Chain', value: 30 },
      ],
      'Management': [
        { name: 'Leadership', value: 40 },
        { name: 'Team Management', value: 30 },
        { name: 'Project Management', value: 30 },
      ],
      'Entrepreneurship': [
        { name: 'Business Planning', value: 35 },
        { name: 'Innovation', value: 35 },
        { name: 'Marketing', value: 30 },
      ]
    };

    // Return specific data for the selected subcategory
    return subCategorySkillsData[subCategory] || [];
  };

  // Update selectedSubCategory when field changes
  const handleFieldChange = (event) => {
    const newField = event.target.value;
    setSelectedFieldForSkills(newField);
    // Automatically set to first subcategory of new field
    setSelectedSubCategory(categoryConfig[newField].subCategories[0]);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ minHeight: 'calc(100vh - 64px)', py: 4 }}>
        {/* Skills Analytics Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
            Skills Analytics
          </Typography>

          <Grid container spacing={3}>
            {/* Trending Skills Section */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Box>
                      <Box display="flex" alignItems="center">
                        <TrendingUpIcon sx={{ mr: 1 }} />
                        <Typography variant="h6">Trending Skills</Typography>
                      </Box>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 0.5, mb: 2, fontStyle: 'italic' }}>
                        Trending subcategories for each field
                      </Typography>
                    </Box>
                    <FormControl size="small" sx={{ minWidth: 200 }}>
                      <Select
                        value={selectedFieldForSkills}
                        onChange={handleFieldChange}
                        sx={{ height: 40 }}
                      >
                        {Object.keys(categoryConfig).map((field) => (
                          <MenuItem key={field} value={field}>
                            {field}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart 
                      data={trendingSkillsData[selectedFieldForSkills]} 
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end" 
                        height={60} 
                        interval={0}
                      />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="growth" fill="#ff9800" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Skills Popularity Section */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Box>
                      <Box display="flex" alignItems="center">
                        <PieChartIcon sx={{ mr: 1 }} />
                        <Typography variant="h6">Skill Popularity</Typography>
                      </Box>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 0.5, mb: 2, fontStyle: 'italic' }}>
                        Popularity of Skills for selected subcategory
                      </Typography>
                    </Box>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <Select
                        value={selectedSubCategory}
                        onChange={(e) => setSelectedSubCategory(e.target.value)}
                        sx={{ height: 40 }}
                      >
                        {categoryConfig[selectedFieldForSkills].subCategories.map((subCat) => (
                          <MenuItem key={subCat} value={subCat}>
                            {subCat}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={getSkillsData(selectedFieldForSkills, selectedSubCategory)}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {getSkillsData(selectedFieldForSkills, selectedSubCategory).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={ORANGE_COLORS[index % ORANGE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend formatter={(value) => <span style={{ color: '#000000' }}>{value}</span>} />
                      <RechartsTooltip contentStyle={{ color: '#000000' }} itemStyle={{ color: '#000000' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Roadmap Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
            Personalized Learning Roadmap
          </Typography>

          <Box sx={{ width: '100%', mt: 4 }}>
            <Stepper activeStep={1} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Paper>

        {/* Explore Section */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
            Explore Learning Opportunities
          </Typography>

          <Grid container spacing={4}>
            {/* Courses Card */}
            <Grid item xs={12} md={4}>
              <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    Courses
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Popular courses:
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {mockCourses.map((course) => (
                      <Paper 
                        key={course.id}
                        elevation={0}
                        sx={{ 
                          p: 2, 
                          mb: 2,
                          border: '1px solid #e0e0e0',
                          borderRadius: 2,
                          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.03)' }
                        }}
                      >
                        <Typography variant="h6" gutterBottom>
                          {course.title}
                        </Typography>
                        
                        <Chip 
                          label={course.subCategory}
                          variant="outlined"
                          size="small"
                          sx={{ mb: 2 }}
                        />
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {course.description}
                        </Typography>

                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <StarIcon sx={{ color: 'grey' }} />
                            <Typography variant="body2" color="text.secondary">
                              {course.rating}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <SchoolIcon sx={{ color: 'grey' }} />
                            <Typography variant="body2" color="text.secondary">
                              {course.enrolledCount} enrolled
                            </Typography>
                          </Box>
                        </Stack>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {course.skills.map((skill) => (
                            <Chip 
                              key={skill}
                              label={skill}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>

                        <Button 
                          variant="contained" 
                          fullWidth
                          startIcon={<SchoolIcon />}
                          onClick={() => router.push(`/course/${course.id}`)}
                          sx={{
                            bgcolor: 'orange',
                            '&:hover': {
                              bgcolor: 'darkorange',
                            }
                          }}
                        >
                          View Course
                        </Button>
                      </Paper>
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', px: 2 }}>
                  <Button size="small" color="primary">
                    View All Courses
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* Mini Challenges Card */}
            <Grid item xs={12} md={4}>
              <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    Mini Challenges
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Popular challenges:
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {mockChallenges.map((challenge) => (
                      <Paper 
                        key={challenge.id}
                        elevation={0}
                        sx={{ 
                          p: 2, 
                          mb: 2,
                          border: '1px solid #e0e0e0',
                          borderRadius: 2,
                          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.03)' }
                        }}
                      >
                        <Box sx={{ mb: 2 }}>
                          <Chip 
                            label={challenge.difficulty} 
                            color={challenge.difficulty === 'Easy' ? 'success' : challenge.difficulty === 'Medium' ? 'warning' : 'error'}
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          <Chip 
                            label={challenge.category}
                            variant="outlined"
                            size="small"
                          />
                        </Box>
                        
                        <Typography variant="h6" gutterBottom>
                          {challenge.title}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {challenge.description}
                        </Typography>

                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTimeIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {challenge.timeEstimate}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <StarIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {challenge.points} pts
                            </Typography>
                          </Box>
                        </Stack>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {challenge.skills.map((skill) => (
                            <Chip 
                              key={skill}
                              label={skill}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>

                        <Button 
                          variant="contained" 
                          fullWidth
                          startIcon={<CodeIcon />}
                          onClick={() => router.push(`/challenges/${challenge.id}`)}
                          sx={{
                            bgcolor: 'orange',
                            '&:hover': {
                              bgcolor: 'darkorange',
                            }
                          }}
                        >
                          View Challenge
                        </Button>
                      </Paper>
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', px: 2 }}>
                  <Button size="small" color="primary">
                    View All Challenges
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* Hackathon Card */}
            <Grid item xs={12} md={4}>
              <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    Hackathons
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Upcoming events:
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {mockHackathons.map((hackathon) => (
                      <Paper 
                        key={hackathon.id}
                        elevation={0}
                        sx={{ 
                          p: 2, 
                          mb: 2,
                          border: '1px solid #e0e0e0',
                          borderRadius: 2,
                          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.03)' }
                        }}
                      >
                        <Typography variant="h6" gutterBottom>
                          {hackathon.title}
                        </Typography>

                        <Box sx={{ mb: 2 }}>
                          <Chip 
                            label={hackathon.category}
                            color="primary"
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          <Chip 
                            label={hackathon.subCategory}
                            variant="outlined"
                            size="small"
                          />
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {hackathon.description}
                        </Typography>

                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarTodayIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {hackathon.startDate} - {hackathon.endDate}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <GroupsIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {hackathon.participants} participants
                            </Typography>
                          </Box>
                        </Stack>

                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <LocationOnIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {hackathon.location}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <EmojiEventsIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {hackathon.prizePool}
                            </Typography>
                          </Box>
                        </Stack>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {hackathon.skills.map((skill) => (
                            <Chip 
                              key={skill}
                              label={skill}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>

                        <Button 
                          variant="contained" 
                          fullWidth
                          startIcon={<RocketLaunchIcon />}
                          sx={{
                            bgcolor: 'orange',
                            '&:hover': {
                              bgcolor: 'darkorange',
                            }
                          }}
                        >
                          View Hackathon
                        </Button>
                      </Paper>
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', px: 2 }}>
                  <Button size="small" color="primary">
                    View All Hackathons
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* New Charts Section */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {/* Challenges Acceptance Rate */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <TrendingUpIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Challenges Acceptance Rate</Typography>
                </Box>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  sx={{ mb: 2, fontStyle: 'italic' }}
                >
                  Percentage of successfully completed challenges by category
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={challengeAcceptanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      interval={0}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <RechartsTooltip
                      formatter={(value) => [`${value}%`, 'Acceptance Rate']}
                    />
                    <Bar
                      dataKey="rate"
                      fill="#ff9800"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Job Employment Ability Rate */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <WorkIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Job Employment Ability Rate</Typography>
                </Box>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  sx={{ mb: 2, fontStyle: 'italic' }}
                >
                  Employment success rate by specialization
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={employmentRateData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      interval={0}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <RechartsTooltip
                      formatter={(value) => [`${value}%`, 'Employment Rate']}
                    />
                    <Bar
                      dataKey="rate"
                      fill="#ff9800"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
