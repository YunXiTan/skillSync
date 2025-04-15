'use client';
import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Stack,
  Typography,
  InputAdornment,
  Alert,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const steps = [
  'Basic Information',
  'Participation Details',
  'Timeline & Dates',
  'Resources & Tests',
  'Prizes & Opportunities',
  'Review'
];

export default function CreateHackathonForm({ activeStep, setActiveStep, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    participationType: 'individual',
    groupSize: '',
    maxParticipants: '',
    registrationDeadline: '',
    startDate: '',
    endDate: '',
    timeline: [
      { date: '', description: '' }
    ],
    prizes: [
      { place: 'First Place', value: '' }
    ],
    opportunities: [
      { description: '' }
    ],
    resources: [],
    selectedResources: [],
    requirePreTest: false,
    selectedTests: [],
    customRequirements: '',
  });

  const [error, setError] = useState('');

  // Mock data - Replace with actual API calls
  const [availableResources, setAvailableResources] = useState([
    { id: 1, title: 'Introduction to React', type: 'course' },
    { id: 2, title: 'JavaScript Basics', type: 'course' },
    { id: 3, title: 'Git Tutorial', type: 'resource' },
    // Add more resources
  ]);

  const [availableTests, setAvailableTests] = useState([
    { id: 1, title: 'JavaScript Fundamentals Test' },
    { id: 2, title: 'React Basics Assessment' },
    // Add more tests
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle timeline entries
  const addTimelineEntry = () => {
    setFormData(prev => ({
      ...prev,
      timeline: [...prev.timeline, { date: '', description: '' }]
    }));
  };

  const removeTimelineEntry = (index) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.filter((_, i) => i !== index)
    }));
  };

  const updateTimelineEntry = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Handle prize entries
  const addPrize = () => {
    setFormData(prev => ({
      ...prev,
      prizes: [...prev.prizes, { place: '', value: '' }]
    }));
  };

  const removePrize = (index) => {
    setFormData(prev => ({
      ...prev,
      prizes: prev.prizes.filter((_, i) => i !== index)
    }));
  };

  const updatePrize = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      prizes: prev.prizes.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Handle opportunity entries
  const addOpportunity = () => {
    setFormData(prev => ({
      ...prev,
      opportunities: [...prev.opportunities, { description: '' }]
    }));
  };

  const removeOpportunity = (index) => {
    setFormData(prev => ({
      ...prev,
      opportunities: prev.opportunities.filter((_, i) => i !== index)
    }));
  };

  const handleResourceToggle = (resourceId) => {
    setFormData(prev => ({
      ...prev,
      selectedResources: prev.selectedResources.includes(resourceId)
        ? prev.selectedResources.filter(id => id !== resourceId)
        : [...prev.selectedResources, resourceId]
    }));
  };

  const handleTestToggle = (testId) => {
    setFormData(prev => ({
      ...prev,
      selectedTests: prev.selectedTests.includes(testId)
        ? prev.selectedTests.filter(id => id !== testId)
        : [...prev.selectedTests, testId]
    }));
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const validateStep = () => {
    setError('');
    switch (activeStep) {
      case 0: // Basic Information
        if (!formData.title.trim()) {
          setError('Please enter a hackathon title');
          return false;
        }
        if (!formData.description.trim()) {
          setError('Please provide a description');
          return false;
        }
        if (!formData.image.trim()) {
          setError('Please provide a cover image URL');
          return false;
        }
        break;

      case 1: // Participation Details
        if (formData.participationType === 'group' && !formData.groupSize) {
          setError('Please specify the maximum team size');
          return false;
        }
        if (!formData.maxParticipants) {
          setError(`Please specify the maximum number of ${
            formData.participationType === 'group' ? 'teams' : 'participants'
          }`);
          return false;
        }
        break;

      case 2: // Timeline & Dates
        if (!formData.registrationDeadline) {
          setError('Please set a registration deadline');
          return false;
        }
        if (!formData.startDate) {
          setError('Please set a start date');
          return false;
        }
        if (!formData.endDate) {
          setError('Please set an end date');
          return false;
        }
        // Validate dates are in correct order
        if (new Date(formData.registrationDeadline) > new Date(formData.startDate)) {
          setError('Registration deadline must be before the start date');
          return false;
        }
        if (new Date(formData.startDate) > new Date(formData.endDate)) {
          setError('Start date must be before the end date');
          return false;
        }
        // Validate timeline entries
        if (formData.timeline.some(event => !event.date || !event.description.trim())) {
          setError('Please complete all timeline events or remove empty ones');
          return false;
        }
        break;

      case 3: // New Resources & Tests step
        if (formData.requirePreTest && formData.selectedTests.length === 0) {
          setError('Please select at least one test if pre-test is required');
          return false;
        }
        break;

      case 4: // Prizes & Opportunities
        if (formData.prizes.length === 0) {
          setError('Please add at least one prize');
          return false;
        }
        if (formData.prizes.some(prize => !prize.place.trim() || !prize.value.trim())) {
          setError('Please complete all prize details');
          return false;
        }
        if (formData.opportunities.length === 0) {
          setError('Please add at least one opportunity');
          return false;
        }
        if (formData.opportunities.some(opp => !opp.description.trim())) {
          setError('Please complete all opportunity descriptions');
          return false;
        }
        break;

      case 5: // Review
        // No validation needed for review step
        return true;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      onSubmit(formData);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Stack spacing={3}>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <TextField
              required
              label="Hackathon Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              helperText="Choose a clear and engaging title"
            />
            <TextField
              required
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              helperText="Describe the hackathon's purpose, goals, and what participants can expect"
            />
            <TextField
              required
              label="Cover Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              fullWidth
              helperText="Provide a URL for an engaging cover image (recommended size: 1200x630px)"
            />
          </Stack>
        );

      case 1:
        return (
          <Stack spacing={3}>
            <FormControl component="fieldset">
              <FormLabel>Participation Type</FormLabel>
              <RadioGroup
                name="participationType"
                value={formData.participationType}
                onChange={handleChange}
              >
                <FormControlLabel 
                  value="individual" 
                  control={<Radio />} 
                  label="Individual Participants" 
                />
                <FormControlLabel 
                  value="group" 
                  control={<Radio />} 
                  label="Team Participation" 
                />
              </RadioGroup>
            </FormControl>

            {formData.participationType === 'group' && (
              <TextField
                required
                label="Maximum Team Size"
                name="groupSize"
                type="number"
                value={formData.groupSize}
                onChange={handleChange}
                fullWidth
              />
            )}

            <TextField
              required
              label={`Maximum ${formData.participationType === 'group' ? 'Teams' : 'Participants'}`}
              name="maxParticipants"
              type="number"
              value={formData.maxParticipants}
              onChange={handleChange}
              fullWidth
            />
          </Stack>
        );

      case 2:
        return (
          <Stack spacing={3}>
            <TextField
              required
              label="Registration Deadline"
              name="registrationDeadline"
              type="date"
              value={formData.registrationDeadline}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              required
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              required
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <Typography variant="h6">Timeline Events</Typography>
            {formData.timeline.map((event, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <TextField
                  label="Date"
                  type="date"
                  value={event.date}
                  onChange={(e) => updateTimelineEntry(index, 'date', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Event Description"
                  value={event.description}
                  onChange={(e) => updateTimelineEntry(index, 'description', e.target.value)}
                  fullWidth
                />
                <IconButton onClick={() => removeTimelineEntry(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button startIcon={<AddIcon />} onClick={addTimelineEntry}>
              Add Timeline Event
            </Button>
          </Stack>
        );

      case 3: // New Resources & Tests step
        return (
          <Stack spacing={3}>
            <Typography variant="h6" gutterBottom>
              Learning Resources
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Select relevant courses and resources for participants
            </Typography>
            
            <List>
              {availableResources.map((resource) => (
                <ListItem key={resource.id} divider>
                  <ListItemText 
                    primary={resource.title}
                    secondary={resource.type}
                  />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={() => handleResourceToggle(resource.id)}
                      checked={formData.selectedResources.includes(resource.id)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>

            <FormControlLabel
              control={
                <Switch
                  checked={formData.requirePreTest}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    requirePreTest: e.target.checked
                  }))}
                />
              }
              label="Require Pre-Test"
            />

            {formData.requirePreTest && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Select Required Tests
                </Typography>
                <List>
                  {availableTests.map((test) => (
                    <ListItem key={test.id} divider>
                      <ListItemText primary={test.title} />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge="end"
                          onChange={() => handleTestToggle(test.id)}
                          checked={formData.selectedTests.includes(test.id)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </>
            )}

            <TextField
              label="Additional Requirements"
              name="customRequirements"
              value={formData.customRequirements}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              helperText="Add any additional requirements or notes about resources"
            />
          </Stack>
        );

      case 4:
        return (
          <Stack spacing={3}>
            <Typography variant="h6">Prizes</Typography>
            {formData.prizes.map((prize, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  label="Place"
                  value={prize.place}
                  onChange={(e) => updatePrize(index, 'place', e.target.value)}
                />
                <TextField
                  label="Prize Value"
                  value={prize.value}
                  onChange={(e) => updatePrize(index, 'value', e.target.value)}
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
                <IconButton onClick={() => removePrize(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button startIcon={<AddIcon />} onClick={addPrize}>
              Add Prize
            </Button>

            <Typography variant="h6" sx={{ mt: 4 }}>Opportunities</Typography>
            {formData.opportunities.map((opp, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  label="Opportunity Description"
                  value={opp.description}
                  onChange={(e) => {
                    const newOpportunities = [...formData.opportunities];
                    newOpportunities[index].description = e.target.value;
                    setFormData(prev => ({ ...prev, opportunities: newOpportunities }));
                  }}
                  fullWidth
                />
                <IconButton onClick={() => removeOpportunity(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button startIcon={<AddIcon />} onClick={addOpportunity}>
              Add Opportunity
            </Button>
          </Stack>
        );

      case 5:
        return (
          <Stack spacing={3}>
            <Typography variant="h6">Review your hackathon details</Typography>
            <Box>
              <Typography variant="subtitle1">Title: {formData.title}</Typography>
              <Typography variant="body1">Description: {formData.description}</Typography>
              <Typography variant="body1">
                Participation: {formData.participationType === 'group' ? 
                  `Teams (max ${formData.groupSize} members per team)` : 
                  'Individual'}
              </Typography>
              <Typography variant="body1">
                Maximum {formData.participationType === 'group' ? 'Teams' : 'Participants'}: {formData.maxParticipants}
              </Typography>
              <Typography variant="body1">Timeline:</Typography>
              <ul>
                {formData.timeline.map((event, index) => (
                  <li key={index}>{event.date}: {event.description}</li>
                ))}
              </ul>
              <Typography variant="body1">Prizes:</Typography>
              <ul>
                {formData.prizes.map((prize, index) => (
                  <li key={index}>{prize.place}: ${prize.value}</li>
                ))}
              </ul>
            </Box>
          </Stack>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {renderStepContent()}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button 
          onClick={handleBack}
          sx={{ mr: 1 }}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button 
          variant="contained" 
          {...(activeStep === steps.length - 1 ? { type: 'submit' } : { onClick: handleNext })}
        >
          {activeStep === steps.length - 1 ? 'Create Hackathon' : 'Next'}
        </Button>
      </Box>
    </form>
  );
} 