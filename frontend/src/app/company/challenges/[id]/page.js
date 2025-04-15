'use client';
import React, { useState } from 'react';
import ChallengePage from '@/app/challenges/[id]/page';
import {
  Container,
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  TextField,
} from '@mui/material';
import Assignment from '@mui/icons-material/Assignment';
import AttachFile from '@mui/icons-material/AttachFile';
import { useRouter, useParams } from 'next/navigation';
import { format } from 'date-fns';

export default function CompanyChallengePage() {
  const router = useRouter();
  const { id } = useParams();
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Mock challenge data - this should come from your API
  const challenge = {
    evaluationCriteria: [
      'Code quality and organization',
      'API documentation',
      'Error handling',
      'Security implementation'
    ]
  };

  // Mock submissions data - replace with actual API call
  const submissions = [
    {
      id: 1,
      userId: "user1",
      userName: "John Doe",
      submittedAt: "2024-03-15T10:00:00Z",
      status: "PENDING",
      files: [
        { name: "solution.zip", url: "#" }
      ]
    },
    // ... more submissions
  ];

  const handleReviewSubmission = (submission) => {
    setSelectedSubmission(submission);
    setOpenReviewModal(true);
  };

  const handleSubmitReview = async (submissionId, review) => {
    try {
      const response = await fetch(`/api/submissions/${submissionId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) throw new Error('Failed to submit review');
      setOpenReviewModal(false);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <>
      <ChallengePage 
        hideSubmitButton 
        hideBackButton 
      />

      <Container maxWidth="lg" sx={{ pb: 4 }}>
        <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            mb: 3 
          }}>
            <Assignment color="primary" /> Submissions
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Participant</TableCell>
                  <TableCell>Submitted</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Files</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>{submission.userName}</TableCell>
                    <TableCell>
                      {formatDate(submission.submittedAt)}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={submission.status}
                        color={
                          submission.status === 'PASSED' ? 'success' :
                          submission.status === 'FAILED' ? 'error' :
                          'warning'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        {submission.files.map((file, index) => (
                          <Button
                            key={index}
                            size="small"
                            startIcon={<AttachFile />}
                            href={file.url}
                            target="_blank"
                          >
                            {file.name}
                          </Button>
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleReviewSubmission(submission)}
                      >
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Review Modal */}
        <Dialog 
          open={openReviewModal} 
          onClose={() => setOpenReviewModal(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Review Submission</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Overall Rating
                </Typography>
                <Rating 
                  name="rating"
                  defaultValue={0}
                  precision={0.5}
                  size="large"
                />
              </Box>

              {challenge.evaluationCriteria.map((criteria, index) => (
                <Box key={index}>
                  <Typography variant="subtitle2" gutterBottom>
                    {criteria}
                  </Typography>
                  <Rating 
                    name={`criteria-${index}`}
                    defaultValue={0}
                    precision={0.5}
                  />
                </Box>
              ))}

              <TextField
                label="Feedback"
                multiline
                rows={4}
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenReviewModal(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleSubmitReview(selectedSubmission?.id, { status: 'FAILED' })}
            >
              Mark as Failed
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleSubmitReview(selectedSubmission?.id, { status: 'PASSED' })}
            >
              Mark as Passed
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
