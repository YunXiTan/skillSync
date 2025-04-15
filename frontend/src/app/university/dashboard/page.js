'use client';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Container,
  Button,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import EmailIcon from '@mui/icons-material/Email';
import PieChartIcon from '@mui/icons-material/PieChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export default function LecturerDashboard() {
    const [mounted, setMounted] = useState(false);
  const [selectedFieldForSkills, setSelectedFieldForSkills] = useState('Technology');
  const [selectedSubCategory, setSelectedSubCategory] = useState('Web Development');

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

  // Data for pie chart (subcategories distribution)
  const getSubCategoryData = (field) => {
    const subCategories = categoryConfig[field].subCategories;
    const total = subCategories.length;
    return subCategories.map((subCat, index) => ({
      name: subCat,
      value: Math.floor(100 / total)
    }));
  };

  const [regionalSkills] = useState([
    {
      location: 'Malaysia',
      skills: ['Python', 'AWS', 'SQL', 'React Native', 'Node.js']
    },
    {
      location: 'Singapore',
      skills: ['Data Science', 'Cloud Architecture', 'Blockchain', 'AI']
    },
    {
      location: 'Indonesia',
      skills: ['Full Stack Development', 'Mobile Development', 'Java', 'Flutter']
    },
    {
      location: 'Thailand',
      skills: ['Web Development', 'UI/UX Design', 'Digital Marketing']
    }
  ]);

  const [selectedField, setSelectedField] = useState('All');

  const fields = [
    'All',
    'Computing',
    'Business',
    'Engineering',
    'Accounting',
    'Education',
    'Marketing'
  ];

  const [recommendations] = useState([
    {
      id: 1,
      title: 'Web3 Development Hackathon',
      company: 'Microsoft',
      field: 'Computing',
      description: 'Three-day virtual hackathon focusing on blockchain and Web3 development. Great opportunity for students to gain hands-on experience.',
      tags: ['Blockchain', 'Web3', 'Smart Contracts'],
      prizes: {
        first: 'Job Opportunity',
        second: 'RM 4,000',
        third: 'Mentorship'
      },
      deadline: '2024-05-15'
    },
    {
      id: 2,
      title: 'AI & Machine Learning Challenge',
      company: 'Google',
      field: 'Computing',
      description: 'Develop innovative AI solutions using machine learning and deep learning technologies. Perfect for students interested in artificial intelligence.',
      tags: ['AI', 'Machine Learning', 'Python', 'Data Science'],
      prizes: {
        first: 'Job Opportunity',
        second: 'RM 4,000',
        third: 'Mentorship'
      },
      deadline: '2024-04-30'
    },
    {
      id: 3,
      title: 'Cloud Computing Workshop',
      company: 'AWS',
      field: 'Computing',
      description: 'Hands-on workshop series on cloud architecture, serverless computing, and DevOps practices.',
      tags: ['Cloud', 'AWS', 'DevOps', 'Serverless'],
      prizes: {
        first: 'Job Opportunity',
        second: 'RM 4,000',
        third: 'Mentorship'
      },
      deadline: '2024-05-20'
    },
    {
      id: 4,
      title: 'Business Strategy Competition',
      company: 'Deloitte',
      field: 'Business',
      description: 'Solve real-world business cases and present innovative strategies to industry leaders.',
      tags: ['Strategy', 'Innovation', 'Business Analysis'],
      prizes: {
        first: 'Job Opportunity',
        second: 'RM 4,000',
        third: 'Mentorship'
      },
      deadline: '2024-05-01'
    },
    {
      id: 5,
      title: 'Entrepreneurship Pitch Challenge',
      company: 'Y Combinator',
      field: 'Business',
      description: 'Present your startup ideas to venture capitalists and receive valuable feedback and potential funding.',
      tags: ['Entrepreneurship', 'Startup', 'Pitch'],
      prizes: {
        first: 'Job Opportunity',
        second: 'RM 4,000',
        third: 'Mentorship'
      },
      deadline: '2024-05-30'
    },
    {
      id: 6,
      title: 'Global Business Management Challenge',
      company: 'McKinsey',
      field: 'Business',
      description: 'International business simulation competition focusing on strategic management and decision-making.',
      tags: ['Management', 'Strategy', 'Global Business'],
      prizes: {
        first: 'Job Opportunity',
        second: 'RM 4,000',
        third: 'Mentorship'
      },
      deadline: '2024-06-15'
    },
    
  ]);

  const [monthlyTrends] = useState([
    { month: 'Jan', students: 150 },
    { month: 'Feb', students: 230 },
    { month: 'Mar', students: 280 },
    { month: 'Apr', students: 340 },
    { month: 'May', students: 420 },
    { month: 'Jun', students: 550 },
  ]);

  const [selectedSkillField, setSelectedSkillField] = useState('Computing');

  const skillFields = ['Computing', 'Business'];

  const [skillDistribution] = useState({
    Computing: [
      { name: 'Python', value: 35 },
      { name: 'Java', value: 25 },
      { name: 'C++', value: 20 },
      { name: 'JavaScript', value: 15 },
      { name: 'React', value: 5 },
    ],
    Business: [
      { name: 'Financial Reporting', value: 30 },
      { name: 'Budget Management', value: 25 },
      { name: 'Auditing', value: 20 },
      { name: 'Financial Analysis', value: 15 },
      { name: 'Data Visualization', value: 10 },
    ],
    
  });

  // Update the orange color palette with your specified colors
  const ORANGE_COLORS = [
    '#A83000',
    '#D53C00', // Dark orange
    '#FD6E00',
    '#FBAC01',
    '#FFC23D',
   
  ];

  // Add new state for success rates data
  const [successRatesData] = useState([
    { name: 'Challenge Acceptance Rate', rate: 85 },
    { name: 'Job Employment Rate', rate: 78 },
  ]);

useEffect(() => {
    setMounted(true);
  }, []);

  // Update when field changes to select first subcategory of that field
  useEffect(() => {
    if (categoryConfig[selectedFieldForSkills]) {
      setSelectedSubCategory(categoryConfig[selectedFieldForSkills].subCategories[0]);
    }
  }, [selectedFieldForSkills]);

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

  // Return null on server-side and initial render
  if (!mounted) {
    return null;
  }
  const handleContactClick = (company, title) => {
    const subject = encodeURIComponent(`Collaboration Interest: ${title}`);
    const body = encodeURIComponent(`Dear ${company} team,\n\nI am interested in collaborating regarding the "${title}" challenge.\n\nBest regards,`);
    window.location.href = `mailto:contact@${company.toLowerCase().replace(/\s+/g, '')}.com?subject=${subject}&body=${body}`;
  };

  const handleJoinNow = (rec) => {
    // You can replace this with your desired action
    alert(`Registration for ${rec.title} will be available soon!`);
  };

  // Filter recommendations based on selected field
  const filteredRecommendations = recommendations.filter(rec => 
    selectedField === 'All' ? true : rec.field === selectedField
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Trending Skills Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Box>
                  <Box display="flex" alignItems="center">
                    <TrendingUpIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">Trending Skills</Typography>
                  </Box>
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary" 
                    sx={{ 
                      mt: 0.5,
                      mb: 2,
                      fontStyle: 'italic'
                    }}
                  >
                    Trending skills for each study field
                  </Typography>
                </Box>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <Select
                    value={selectedFieldForSkills}
                    onChange={(e) => setSelectedFieldForSkills(e.target.value)}
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
                  <YAxis 
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <RechartsTooltip />
                  <Bar 
                    dataKey="growth" 
                    fill="#ff9800" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* SubCategories Distribution Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Box>
                  <Box display="flex" alignItems="center">
                    <PieChartIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">Skill Popularity</Typography>
                  </Box>
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary" 
                    sx={{ 
                      mt: 0.5,
                      mb: 2,
                      fontStyle: 'italic'
                    }}
                  >
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

        {/* Success Rates Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', minHeight: 450 }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <TrendingUpIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Overall Success Rates</Typography>
              </Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                Overall challenge acceptance and employment rates
              </Typography>
              <Box sx={{ flexGrow: 1, minHeight: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={successRatesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis 
                      dataKey="name"
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <RechartsTooltip formatter={(value) => [`${value}%`, 'Rate']} />
                    <Bar 
                      dataKey="rate" 
                      fill="#ff9800"
                      radius={[4, 4, 0, 0]}
                      label={{
                        position: 'top',
                        fill: '#666666',
                        formatter: (value) => `${value}%`
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Growth Trend */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <TimelineIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Student Engagement Growth</Typography>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrends} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line 
                    type="monotone" 
                    dataKey="students" 
                    stroke="#FF7409"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#FF7409" }}
                    activeDot={{ r: 8, fill: "#FF7409" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recommendations Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems="center">
                  <EventIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Recommended Challenges</Typography>
                </Box>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <Select
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                    displayEmpty
                    sx={{ height: 40 }}
                  >
                    <MenuItem value="All">All Fields of Study</MenuItem>
                    {fields.slice(1).map((field) => (
                      <MenuItem key={field} value={field}>{field}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Grid container spacing={2}>
                {filteredRecommendations.map((rec) => (
                  <Grid item xs={12} md={4} key={rec.id}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          {rec.title}
                        </Typography>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1,
                          mb: 1
                        }}>
                          <Typography 
                            variant="body2" 
                            color="primary" 
                            sx={{ fontWeight: 500 }}
                          >
                            {rec.company}
                          </Typography>
                          <Tooltip title="Contact for Collaboration">
                            <IconButton 
                              size="small"
                              onClick={() => handleContactClick(rec.company, rec.title)}
                              sx={{ 
                                color: 'primary.main',
                                '&:hover': {
                                  backgroundColor: 'primary.50'
                                }
                              }}
                            >
                              <EmailIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>

                        {/* Tags for Skills */}
                        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                          {rec.tags && rec.tags.length > 0 && rec.tags.map((tag, index) => (
                            <Chip 
                              key={index} 
                              label={tag} 
                              size="small" 
                              sx={{ backgroundColor: '#E8E8E8', color: '#000' }} // Light gray background with black text
                            />
                          ))}
                        </Stack>

                        <Typography variant="body2" paragraph>
                          {rec.description}
                        </Typography>

                        {/* Prizes Section with Chips */}
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          <strong>Prizes:</strong>
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {Object.values(rec.prizes).map((prize, index) => (
                            <Chip 
                              key={index} 
                              label={prize} 
                              size="small" 
                              sx={{ backgroundColor: 'white', color: '#ff9800', border: '1px solid #ff9800' }}
                            />
                          ))}
                        </Stack>

                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                          <Typography variant="body2" color="error">
                            Deadline: {new Date(rec.deadline).toLocaleDateString()}
                          </Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleJoinNow(rec)}
                            sx={{ minWidth: '100px' }}
                          >
                            Join Now
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}