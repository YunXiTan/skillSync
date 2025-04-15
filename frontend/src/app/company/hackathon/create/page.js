'use client';
import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
} from '@mui/material';
import CreateHackathonForm from '@/components/hackathon/CreateHackathonForm';
import { useRouter } from 'next/navigation';
import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PreviewIcon from '@mui/icons-material/Preview';
import SchoolIcon from '@mui/icons-material/School';

const steps = [
  {
    label: 'Basic Information',
    icon: InfoIcon,
  },
  {
    label: 'Participation Details',
    icon: GroupsIcon,
  },
  {
    label: 'Timeline & Dates',
    icon: EventIcon,
  },
  {
    label: 'Resources & Tests',
    icon: SchoolIcon,
  },
  {
    label: 'Prizes & Opportunities',
    icon: EmojiEventsIcon,
  },
  {
    label: 'Review',
    icon: PreviewIcon,
  }
];

export default function CreateHackathonPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const handleSubmit = async (formData) => {
    try {
      console.log('Creating hackathon:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/hackathon');
    } catch (error) {
      console.error('Error creating hackathon:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Create a New Hackathon
        </Typography>
        
        <Stepper 
          activeStep={activeStep} 
          sx={{ 
            my: 4,
            '& .MuiStepLabel-root': {
              '& .MuiStepLabel-iconContainer': {
                '& svg': {
                  fontSize: '2rem',
                },
              },
              '& .MuiStepLabel-labelContainer': {
                '& .MuiStepLabel-label': {
                  mt: 1,
                },
              },
            },
            '& .Mui-active': {
              '& .MuiStepLabel-iconContainer': {
                '& svg': {
                  color: 'primary.main',
                },
              },
              '& .MuiStepLabel-label': {
                color: 'primary.main',
              },
            },
            '& .Mui-completed': {
              '& .MuiStepLabel-iconContainer': {
                '& svg': {
                  color: 'success.main',
                },
              },
              '& .MuiStepLabel-label': {
                color: 'text.primary',
              },
            },
            '& .MuiStepConnector-line': {
              minHeight: '1px',
            },
          }}
          alternativeLabel
        >
          {steps.map((step, index) => (
            <Step key={step.label} completed={undefined}>
              <StepLabel 
                StepIconComponent={step.icon}
                sx={{
                  '& .MuiStepLabel-iconContainer svg': {
                    color: activeStep === index 
                      ? 'primary.main' 
                      : activeStep > index 
                        ? 'success.main' 
                        : 'text.disabled',
                  },
                }}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4 }}>
          <CreateHackathonForm 
            activeStep={activeStep} 
            setActiveStep={setActiveStep} 
            onSubmit={handleSubmit}
            totalSteps={steps.length}
          />
        </Box>
      </Paper>
    </Container>
  );
} 