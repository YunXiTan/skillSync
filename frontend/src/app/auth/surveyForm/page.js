'use client';
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  FormControl,
  Button,
  Stack,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { Autocomplete, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SurveyForm() {
  const router = useRouter();
  const [selectedField, setSelectedField] = useState('');
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const fieldData = [
    'Technology',
    'Business',
    'Finance',
    'Design',
    'Marketing',
  ];

  const subcategoryData = {
    Technology: [
      'Web Development',
      'Mobile Development',
      'Cloud Computing',
      'Data Science',
      'Cybersecurity',
    ],
    Business: ['Strategy', 'Operations', 'Management', 'Entrepreneurship'],
    Finance: ['Investment', 'FinTech', 'Risk Management', 'Trading'],
    Design: ['UI/UX', 'Graphic Design', 'Product Design', 'Brand Design'],
    Marketing: [
      'Digital Marketing',
      'Content Marketing',
      'Social Media',
      'SEO',
    ],
  };

  const skillsData = [
    'JavaScript',
    'Python',
    'React',
    'Node.js',
    'AWS',
    'Machine Learning',
    'Business Analysis',
    'Project Management',
    'Strategic Planning',
    'Leadership',
    'Financial Analysis',
    'Risk Assessment',
    'Blockchain',
    'Trading Strategies',
    'UI Design',
    'User Research',
    'Wireframing',
    'Prototyping',
    'Social Media Marketing',
    'Content Strategy',
    'Analytics',
    'SEO Optimization',
  ];

  const handleFieldChange = (event) => {
    setSelectedField(event.target.value);
    setSelectedSubcategories([]); // Reset subcategories when field changes
    setSelectedSkills([]); // Reset skills when field changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Selected field:', selectedField);
    console.log('Selected subcategories:', selectedSubcategories);
    console.log('Selected skills:', selectedSkills);
    // Add your API call here
    
    // After successful submission, navigate to homepage
    router.push('/homepage');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            textAlign="center"
            color="primary"
            fontWeight="bold"
            sx={{ mb: 4 }}
          >
            Select Your Field of Study
          </Typography>

          <Typography
            variant="body1"
            color="textSecondary"
            textAlign="center"
            sx={{ mb: 4 }}
          >
            Choose your category, subcategory, and relevant skills
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* Field Selection */}
              <FormControl fullWidth>
              
                <InputLabel id="field-select-label">Category</InputLabel>
                <Select
                  labelId="field-select-label"
                  id="field-select"
                  value={selectedField}
                  label="Field of Study"
                  onChange={handleFieldChange}
                  sx={{ mb: 2 }}
                >
                  {fieldData.map((field) => (
                    <MenuItem key={field} value={field}>
                      {field}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Subcategories Selection */}
              {selectedField && subcategoryData[selectedField] && (
                <Box>
                  
                  <Paper elevation={2} sx={{ p: 3, bgcolor: 'background.paper' }}>
                    <FormControl fullWidth>
                      <InputLabel color="primary">Choose a Subcategory</InputLabel>
                      <Select
                        value={selectedSubcategories}
                        onChange={(event) => {
                          setSelectedSubcategories(event.target.value);
                        }}
                        label="Choose a Subcategory"
                        color="primary"
                        sx={{
                          '& .MuiSelect-select': {
                            py: 1.5,
                          },
                        }}
                      >
                        {subcategoryData[selectedField].map((subCat) => (
                          <MenuItem 
                            key={subCat} 
                            value={subCat}
                            sx={{
                              py: 1.5,
                              '&.Mui-selected': {
                                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                              },
                              '&.Mui-selected:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.12)',
                              },
                              '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                              },
                            }}
                          >
                            {subCat}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Paper>
                </Box>
              )}

              {/* Skills Selection */}
              <Box sx={{ mt: 4 }}>
                
                <Paper elevation={2} sx={{ p: 3, bgcolor: 'background.paper' }}>
                  <Autocomplete
                    multiple
                    options={skillsData}
                    getOptionLabel={(option) => option}
                    value={selectedSkills}
                    onChange={(event, newValue) => {
                      setSelectedSkills(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Search and Select Skills"
                        placeholder="Start typing..."
                      />
                    )}
                  />
                </Paper>
              </Box>
              
              <Link href="../homepage" passHref>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 4 }}
                  fullWidth
                  disabled={!selectedField}
                >
                  Complete Profile
                </Button>
              </Link>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
