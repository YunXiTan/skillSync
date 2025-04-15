'use client';
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  TextField,
  MenuItem,
  Avatar,
  Button,
  Stack,
  Paper,
  InputAdornment,
  IconButton,
  Rating,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SchoolIcon from '@mui/icons-material/School';
import ComputerIcon from '@mui/icons-material/Computer';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BrushIcon from '@mui/icons-material/Brush';
import CampaignIcon from '@mui/icons-material/Campaign';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Link from 'next/link';

// Category configuration
const categoryConfig = {
    Technology: {
      icon: ComputerIcon,
      subCategories: ['Web Development', 'Mobile Development', 'Cloud Computing', 'Data Science', 'Cybersecurity'],
      skills: ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Machine Learning'],
    },
    Business: {
      icon: BusinessIcon,
      subCategories: ['Strategy', 'Operations', 'Management', 'Entrepreneurship'],
      skills: ['Business Analysis', 'Project Management', 'Strategic Planning', 'Leadership'],
    },
    Finance: {
      icon: AccountBalanceIcon,
      subCategories: ['Investment', 'FinTech', 'Risk Management', 'Trading'],
      skills: ['Financial Analysis', 'Risk Assessment', 'Blockchain', 'Trading Strategies'],
    },
    Design: {
      icon: BrushIcon,
      subCategories: ['UI/UX', 'Graphic Design', 'Product Design', 'Brand Design'],
      skills: ['UI Design', 'User Research', 'Wireframing', 'Prototyping'],
    },
    Marketing: {
      icon: CampaignIcon,
      subCategories: ['Digital Marketing', 'Content Marketing', 'Social Media', 'SEO'],
      skills: ['Social Media Marketing', 'Content Strategy', 'Analytics', 'SEO Optimization'],
    }
  };

// Mock student data
const mockStudents = [
  // Technology Students
  {
    id: 1,
    name: 'Ivan Tay',
    avatar: '/avatars/ivan.jpg',
    category: 'Technology',
    subCategory: 'Web Development',
    skills: ['JavaScript', 'React', 'Node.js', 'AWS'],
    education: 'Computer Science, Universiti Malaya (UM)',
    miniChallenges: 8,
    hackathons: 3,
  },
  {
    id: 2,
    name: 'Tan Wei Ling',
    avatar: '/avatars/weiling.jpg',
    category: 'Technology',
    subCategory: 'Data Science',
    skills: ['Python', 'Machine Learning', 'AWS'],
    education: 'Data Science, Universiti Teknologi Malaysia (UTM)',
    miniChallenges: 7,
    hackathons: 2,
  },
  {
    id: 3,
    name: 'Raj Kumar',
    avatar: '/avatars/raj.jpg',
    category: 'Technology',
    subCategory: 'Mobile Development',
    skills: ['React', 'JavaScript', 'Node.js'],
    education: 'Software Engineering, Universiti Putra Malaysia (UPM)',
    miniChallenges: 6,
    hackathons: 1,
  },

  // Business Students
  {
    id: 4,
    name: 'Nurul Izzah',
    avatar: '/avatars/nurul.jpg',
    category: 'Business',
    subCategory: 'Strategy',
    skills: ['Business Analysis', 'Strategic Planning', 'Leadership'],
    education: 'MBA, Universiti Kebangsaan Malaysia (UKM)',
    miniChallenges: 9,
    hackathons: 4,
  },
  {
    id: 5,
    name: 'Wong Jun Jie',
    avatar: '/avatars/junjie.jpg',
    category: 'Business',
    subCategory: 'Management',
    skills: ['Project Management', 'Leadership', 'Strategic Planning'],
    education: 'Business Administration, HELP University',
    miniChallenges: 8,
    hackathons: 3,
  },
  {
    id: 6,
    name: 'Siti Aminah',
    avatar: '/avatars/siti.jpg',
    category: 'Business',
    subCategory: 'Entrepreneurship',
    skills: ['Business Analysis', 'Strategic Planning', 'Leadership'],
    education: 'Entrepreneurship, Taylors University',
    miniChallenges: 7,
    hackathons: 2,
  },

  // Finance Students
  {
    id: 7,
    name: 'Lee Ming Chen',
    avatar: '/avatars/mingchen.jpg',
    category: 'Finance',
    subCategory: 'FinTech',
    skills: ['Financial Analysis', 'Blockchain', 'Risk Assessment'],
    education: 'Finance, Sunway University',
    miniChallenges: 6,
    hackathons: 1,
  },
  {
    id: 8,
    name: 'Aisha Abdullah',
    avatar: '/avatars/aisha.jpg',
    category: 'Finance',
    subCategory: 'Investment',
    skills: ['Financial Analysis', 'Trading Strategies', 'Risk Assessment'],
    education: 'Economics, INTI International University',
    miniChallenges: 7,
    hackathons: 2,
  },
  {
    id: 9,
    name: 'Suresh Muthu',
    avatar: '/avatars/suresh.jpg',
    category: 'Finance',
    subCategory: 'Trading',
    skills: ['Trading Strategies', 'Risk Assessment', 'Financial Analysis'],
    education: 'Finance, Asia Pacific University (APU)',
    miniChallenges: 5,
    hackathons: 0,
  },

  // Design Students
  {
    id: 10,
    name: 'Nur Syafiqah',
    avatar: '/avatars/syafiqah.jpg',
    category: 'Design',
    subCategory: 'UI/UX',
    skills: ['UI Design', 'User Research', 'Wireframing', 'Prototyping'],
    education: 'Digital Design, Multimedia University (MMU)',
    miniChallenges: 9,
    hackathons: 4,
  },
  {
    id: 11,
    name: 'Chong Wei Kit',
    avatar: '/avatars/weikit.jpg',
    category: 'Design',
    subCategory: 'Product Design',
    skills: ['UI Design', 'Prototyping', 'User Research'],
    education: 'Product Design, Limkokwing University',
    miniChallenges: 8,
    hackathons: 3,
  },
  {
    id: 12,
    name: 'Priya Shankar',
    avatar: '/avatars/priya.jpg',
    category: 'Design',
    subCategory: 'Brand Design',
    skills: ['UI Design', 'Wireframing', 'Prototyping'],
    education: 'Graphic Design, The One Academy',
    miniChallenges: 7,
    hackathons: 2,
  },

  // Marketing Students
  {
    id: 13,
    name: 'Muhammad Hafiz',
    avatar: '/avatars/hafiz.jpg',
    category: 'Marketing',
    subCategory: 'Digital Marketing',
    skills: ['Social Media Marketing', 'Content Strategy', 'Analytics'],
    education: 'Marketing, Universiti Sains Malaysia (USM)',
    miniChallenges: 10,
    hackathons: 5,
  },
  {
    id: 14,
    name: 'Lim Mei Ying',
    avatar: '/avatars/meiying.jpg',
    category: 'Marketing',
    subCategory: 'Content Marketing',
    skills: ['Content Strategy', 'SEO Optimization', 'Analytics'],
    education: 'Communications, UCSI University',
    miniChallenges: 9,
    hackathons: 4,
  },
  {
    id: 15,
    name: 'Kavitha Raj',
    avatar: '/avatars/kavitha.jpg',
    category: 'Marketing',
    subCategory: 'SEO',
    skills: ['SEO Optimization', 'Analytics', 'Content Strategy'],
    education: 'Digital Marketing, Management & Science University (MSU)',
    miniChallenges: 8,
    hackathons: 3,
  }
];

export default function TalentPoolPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState(mockStudents);

  // Filter function
  const filterStudents = () => {
    return mockStudents.filter(student => {
      const matchesCategory = !selectedCategory || student.category === selectedCategory;
      const matchesSubCategory = !selectedSubCategory || student.subCategory === selectedSubCategory;
      const matchesSkills = selectedSkills.length === 0 || 
        selectedSkills.every(skill => student.skills.includes(skill));

      return matchesCategory && matchesSubCategory && matchesSkills;
    });
  };

  // Handle filter changes
  const handleFilterChange = () => {
    setFilteredStudents(filterStudents());
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Talent Pool
      </Typography>

      {/* Filter Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Category"
              value={selectedCategory}
              onChange={(e) => {
                const newCategory = e.target.value;
                setSelectedCategory(newCategory);
                setSelectedSubCategory('');  // Reset subcategory
                setSelectedSkills([]); // Reset skills
                
                // Immediately filter students based on new category
                const newFilteredStudents = mockStudents.filter(student => {
                  return !newCategory || student.category === newCategory;
                });
                setFilteredStudents(newFilteredStudents);
              }}
            >
              <MenuItem value="">All Categories</MenuItem>
              {Object.keys(categoryConfig).map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Sub-Category"
              value={selectedSubCategory}
              disabled={!selectedCategory}
              onChange={(e) => {
                const newSubCategory = e.target.value;
                setSelectedSubCategory(newSubCategory);
                
                // Immediately filter students based on category and new subcategory
                const newFilteredStudents = mockStudents.filter(student => {
                  const matchesCategory = !selectedCategory || student.category === selectedCategory;
                  const matchesSubCategory = !newSubCategory || student.subCategory === newSubCategory;
                  return matchesCategory && matchesSubCategory;
                });
                setFilteredStudents(newFilteredStudents);
              }}
            >
              <MenuItem value="">All Sub-Categories</MenuItem>
              {selectedCategory &&
                categoryConfig[selectedCategory].subCategories.map((subCategory) => (
                  <MenuItem key={subCategory} value={subCategory}>
                    {subCategory}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Skills Filter */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Skills
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {selectedCategory &&
              categoryConfig[selectedCategory].skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onClick={() => {
                    const newSkills = selectedSkills.includes(skill)
                      ? selectedSkills.filter(s => s !== skill)
                      : [...selectedSkills, skill];
                    setSelectedSkills(newSkills);
                    
                    // Immediately filter students based on category, subcategory, and new skills
                    const newFilteredStudents = mockStudents.filter(student => {
                      const matchesCategory = !selectedCategory || student.category === selectedCategory;
                      const matchesSubCategory = !selectedSubCategory || student.subCategory === selectedSubCategory;
                      const matchesSkills = newSkills.length === 0 || 
                        newSkills.every(skill => student.skills.includes(skill));
                      return matchesCategory && matchesSubCategory && matchesSkills;
                    });
                    setFilteredStudents(newFilteredStudents);
                  }}
                  color={selectedSkills.includes(skill) ? "primary" : "default"}
                  sx={{ m: 0.5 }}
                />
              ))}
          </Stack>
        </Box>
      </Paper>

      {/* Results Section */}
      <Grid container spacing={3}>
        {filteredStudents.map((student) => (
          <Grid item xs={12} md={6} lg={4} key={student.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column',
                height: '400px',
                p: 3 
              }}>
                <Stack spacing={2} sx={{ height: '100%' }}>
                  {/* Header - Avatar and Name */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    height: '72px'
                  }}>
                    <Avatar
                      src={student.avatar}
                      sx={{ width: 56, height: 56 }}
                    />
                    <Box>
                      <Typography variant="h6" noWrap>{student.name}</Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {student.category} • {student.subCategory}
                      </Typography>
                    </Box>
                  </Box>
                  {/* Education */}
                  <Box sx={{ height: '24px', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SchoolIcon color="action" fontSize="small" />
                    <Typography variant="body2" noWrap>{student.education}</Typography>
                  </Box>

                  {/* Challenges and Hackathons */}
                  <Stack direction="row" spacing={3} sx={{ height: '24px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmojiEventsIcon color="action" fontSize="small" />
                      <Typography variant="body2">
                        {student.miniChallenges} Mini Challenges
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <RocketLaunchIcon color="action" fontSize="small" />
                      <Typography variant="body2">
                        {student.hackathons} Hackathons
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Skills */}
                  <Box sx={{ flex: 1, minHeight: '100px' }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Skills:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {student.skills.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          size="small"
                          variant="outlined"
                          sx={{ m: 0.5 }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  {/* View Profile Button */}
                  <Link 
                    href={`/profile?id=${student.id}`} 
                    style={{ textDecoration: 'none', width: '100%' }}
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 'auto',
                        bgcolor: 'orange',
                        '&:hover': {
                          bgcolor: 'darkorange',
                        }
                      }}
                    >
                      View Profile
                    </Button>
                  </Link>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
