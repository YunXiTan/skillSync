'use client';
import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Box,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Autocomplete,
 InputAdornment,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const categories = {
  mainCategories: ['Technology', 'Business', 'Finance', 'Design', 'Marketing'],
  subCategories: {
    Technology: ['Web Development', 'Mobile Development', 'Data Science', 'Cloud Computing'],
    Business: ['Strategy', 'Management', 'Operations', 'Leadership'],
    Finance: ['Investment', 'FinTech', 'Banking', 'Trading'],
    Design: ['UI/UX', 'Graphic Design', 'Web Design', 'Product Design'],
    Marketing: ['Digital Marketing', 'Content Marketing', 'Social Media', 'SEO'],
  },
  skills: {
    Technology: ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Machine Learning'],
    Business: ['Strategic Planning', 'Project Management', 'Business Analysis', 'Team Leadership'],
    Finance: ['Financial Analysis', 'Blockchain', 'Risk Assessment', 'Trading'],
    Design: ['User Research', 'Wireframing', 'Typography', 'Visual Design'],
    Marketing: ['Content Strategy', 'SEO', 'Social Media Marketing', 'Analytics'],
  }
};

export default function CreateCoursePage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mainCategory: '',
    subCategory: '',
    skills: [],
    points: '',
    tags: [],
    learningObjectives: '',
    prerequisites: '',
    curriculum: '',
    resources: '',
    enrollmentDetails: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.mainCategory) newErrors.mainCategory = 'Category is required';
    if (!formData.subCategory) newErrors.subCategory = 'Sub-category is required';
    if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
    if (!formData.learningObjectives.trim()) newErrors.learningObjectives = 'Learning objectives are required';
    if (!formData.curriculum.trim()) newErrors.curriculum = 'Curriculum is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      console.log('Submitting course:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Course created successfully!');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Create New Course
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Basic Information */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Course Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  error={!!errors.title}
                  helperText={errors.title || 'Enter a clear, descriptive title'}
                  fullWidth
                  required
                />

                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description || 'Provide a comprehensive overview of the course'}
                  multiline
                  rows={3}
                  fullWidth
                  required
                />
              </Stack>
            </Box>

            {/* Category and Skills */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Classification
              </Typography>
              <Stack spacing={2}>
                <FormControl fullWidth error={!!errors.mainCategory} required>
                  <InputLabel>Main Category</InputLabel>
                  <Select
                    name="mainCategory"
                    value={formData.mainCategory}
                    onChange={handleChange}
                    label="Main Category"
                  >
                    {categories.mainCategories.map(category => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth error={!!errors.subCategory} required>
                  <InputLabel>Sub-Category</InputLabel>
                  <Select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    label="Sub-Category"
                    disabled={!formData.mainCategory}
                  >
                    {formData.mainCategory 
                      ? categories.subCategories[formData.mainCategory]?.map(subCategory => (
                          <MenuItem key={subCategory} value={subCategory}>
                            {subCategory}
                          </MenuItem>
                        ))
                      : <MenuItem value="">Select a main category first</MenuItem>
                    }
                  </Select>
                </FormControl>

                <Autocomplete
                  multiple
                  options={formData.mainCategory ? categories.skills[formData.mainCategory] || [] : []}
                  value={formData.skills}
                  onChange={(e, newValue) => {
                    setFormData(prev => ({ ...prev, skills: newValue }));
                  }}
                  disabled={!formData.mainCategory}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Skills Covered"
                      error={!!errors.skills}
                      helperText={errors.skills || 'Select a main category to choose skills'}
                      required
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} {...getTagProps({ index })} />
                    ))
                  }
                />
              </Stack>
            </Box>

            {/* Course Details */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Course Details
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Points"
                  name="points"
                  type="number"
                  value={formData.points}
                  onChange={handleChange}
                  error={!!errors.points}
                  helperText={errors.points || 'Reward points for completing the course'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <StarIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </Box>

            {/* Course Content */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Course Content
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Learning Objectives"
                  name="learningObjectives"
                  value={formData.learningObjectives}
                  onChange={handleChange}
                  error={!!errors.learningObjectives}
                  helperText={errors.learningObjectives || 'What will students learn from this course?'}
                  multiline
                  rows={4}
                  fullWidth
                  required
                />

                <TextField
                  label="Prerequisites"
                  name="prerequisites"
                  value={formData.prerequisites}
                  onChange={handleChange}
                  helperText="Optional: List any required skills or knowledge"
                  multiline
                  rows={2}
                  fullWidth
                />

                <TextField
                  label="Curriculum"
                  name="curriculum"
                  value={formData.curriculum}
                  onChange={handleChange}
                  error={!!errors.curriculum}
                  helperText={errors.curriculum || 'Outline the course modules and topics'}
                  multiline
                  rows={4}
                  fullWidth
                  required
                />

                <TextField
                  label="Additional Resources"
                  name="resources"
                  value={formData.resources}
                  onChange={handleChange}
                  helperText="Optional: Add links to supplementary materials"
                  multiline
                  rows={2}
                  fullWidth
                />

                <TextField
                  label="What You'll Get"
                  name="enrollmentDetails"
                  value={formData.enrollmentDetails}
                  onChange={handleChange}
                  error={!!errors.enrollmentDetails}
                  helperText={errors.enrollmentDetails || 'List what students will receive upon enrollment (e.g., Course Materials, Certificate, etc.)'}
                  multiline
                  rows={4}
                  fullWidth
                  required
                />
              </Stack>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
              <Button 
                variant="outlined" 
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                type="submit"
                sx={{
                  bgcolor: 'orange',
                  '&:hover': {
                    bgcolor: 'darkorange',
                  }
                }}
              >
                Create Course
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
