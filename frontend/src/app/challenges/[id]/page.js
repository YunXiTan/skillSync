"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Grid,
  Link,
  useTheme,
  alpha,
} from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon,
  Description as DescriptionIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  EmojiEvents as EmojiEventsIcon,
  AttachFile as AttachFileIcon,
} from "@mui/icons-material";
import { useRouter, useParams } from "next/navigation";
import SubmitChallengeModal from "@/components/SubmitChallengeModal";
import { useAuth } from "@/contexts/AuthContext";
import APIService from "@/api/apiService";
import { API } from "@/api/endpoints";

export default function ChallengePage({
  hideSubmitButton = false,
  hideBackButton = false,
}) {
  const router = useRouter();
  const { id } = useParams();
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const { isStudent, user } = useAuth();

  // Only show submit button for students
  hideSubmitButton = hideSubmitButton || !isStudent;

  // Common styles for reuse
  const sectionStyles = {
    p: 3,
    borderRadius: 2,
    bgcolor: "white",
    border: "1px solid",
    borderColor: alpha(theme.palette.primary.main, 0.1),
  };

  const headerStyles = {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 3,
    color: "text.primary",
    fontWeight: "bold",
  };

  const cardStyles = {
    p: 2,
    bgcolor: "white",
    border: "1px solid",
    borderColor: alpha(theme.palette.primary.main, 0.1),
    borderRadius: 2,
    "&:hover": {
      borderColor: "primary.main",
      bgcolor: alpha(theme.palette.primary.main, 0.02),
    },
    transition: "all 0.2s",
  };

  // Mock data structure updated to match API response
  const [challenge, setChallenge] = useState({});

  useEffect(() => {
    const fetchChallenge = async () => {
      console.log(id);
      const response = await APIService.get(
        API.challenges.findById.replace(":id", id)
      );
      const data = await response.data.data;
      console.log(data);
      setChallenge(data);
    };
    fetchChallenge();
  }, [id]);

  return (
    <>
      {challenge && (
        <Box
          sx={{
            minHeight: "100vh",
            bgcolor: "grey.50",
            py: 4,
          }}
        >
          <Container maxWidth="lg">
            {/* Back Button - Only show if hideBackButton is false */}
            {!hideBackButton && (
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => router.back()}
                sx={{
                  mb: 4,
                  ...cardStyles,
                }}
              >
                Back to Challenges
              </Button>
            )}

            <Grid container spacing={3}>
              {/* Main Content */}
              <Grid item xs={12} md={8}>
                <Stack spacing={3}>
                  {/* Challenge Header */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 2,
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                    }}
                  >
                    <Typography variant="h3" gutterBottom fontWeight="bold">
                      {challenge.title}
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                      {challenge.description}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      useFlexGap
                    >
                      {challenge.field?.main && (
                        <Chip
                          label={challenge.field.main.name}
                          sx={{
                            bgcolor: alpha("#fff", 0.2),
                            color: "inherit",
                            "& .MuiChip-label": { fontWeight: "bold" },
                          }}
                        />
                      )}
                      {challenge.field?.sub?.[0] && (
                        <Chip
                          label={challenge.field.sub[0].name}
                          sx={{
                            bgcolor: alpha("#fff", 0.1),
                            color: "inherit",
                          }}
                        />
                      )}
                    </Stack>
                  </Paper>

                  {/* Instructions */}
                  <Paper elevation={0} sx={sectionStyles}>
                    <Typography variant="h5" sx={headerStyles}>
                      <AssignmentIcon color="primary" /> Instructions
                    </Typography>
                    <List sx={{ p: 0 }}>
                      {challenge.stepToStepInstructions?.map(
                        (instruction, index) => (
                          <ListItem
                            key={index}
                            sx={{
                              bgcolor:
                                index % 2 === 0
                                  ? alpha(theme.palette.primary.main, 0.03)
                                  : "transparent",
                              borderRadius: 2,
                              mb: 1,
                              p: 2,
                            }}
                          >
                            <ListItemIcon>
                              <Typography
                                variant="h6"
                                color="primary"
                                fontWeight="bold"
                              >
                                {index + 1}.
                              </Typography>
                            </ListItemIcon>
                            <ListItemText primary={instruction} />
                          </ListItem>
                        )
                      )}
                    </List>
                  </Paper>

                  {/* Learning Objectives */}
                  <Paper elevation={0} sx={sectionStyles}>
                    <Typography variant="h5" sx={headerStyles}>
                      <SchoolIcon color="primary" /> Learning Objectives
                    </Typography>
                    <Grid container spacing={2}>
                      {challenge.learningObjective?.map((objective, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Card elevation={0} sx={cardStyles}>
                            <CardContent
                              sx={{ p: 2, "&:last-child": { pb: 2 } }}
                            >
                              <Box sx={{ display: "flex", gap: 2 }}>
                                <CheckCircleIcon color="primary" />
                                <Typography>{objective}</Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>

                  {/* Resources */}
                  <Paper elevation={0} sx={sectionStyles}>
                    <Typography variant="h5" sx={headerStyles}>
                      <DescriptionIcon color="primary" /> Resources
                    </Typography>
                    <Grid container spacing={2}>
                      {challenge.additionalResources?.map((resource, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Link
                            href={resource.url}
                            target="_blank"
                            rel="noopener"
                            underline="none"
                          >
                            <Card elevation={0} sx={cardStyles}>
                              <CardContent
                                sx={{ p: 2, "&:last-child": { pb: 2 } }}
                              >
                                <Typography variant="subtitle1">
                                  {resource.title}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>

                  {/* Submission & Evaluation */}
                  <Paper elevation={0} sx={sectionStyles}>
                    <Grid container spacing={4}>
                      {/* Submission Guidelines */}
                      <Grid item xs={12} md={6}>
                        <Typography variant="h5" sx={headerStyles}>
                          <AssignmentIcon color="primary" /> Submission
                          Guidelines
                        </Typography>
                        <Stack spacing={2}>
                          {challenge.submissionGuidelines?.map(
                            (guideline, index) => (
                              <Card key={index} elevation={0} sx={cardStyles}>
                                <CardContent
                                  sx={{ p: 2, "&:last-child": { pb: 2 } }}
                                >
                                  <Box sx={{ display: "flex", gap: 2 }}>
                                    <CheckCircleIcon
                                      color="primary"
                                      sx={{ mt: 0.5 }}
                                    />
                                    <Typography>{guideline}</Typography>
                                  </Box>
                                </CardContent>
                              </Card>
                            )
                          )}
                        </Stack>
                      </Grid>

                      {/* Evaluation Criteria */}
                      <Grid item xs={12} md={6}>
                        <Typography variant="h5" sx={headerStyles}>
                          <EmojiEventsIcon color="primary" /> Evaluation
                          Criteria
                        </Typography>
                        <Stack spacing={2}>
                          {challenge.evaluationCriteria?.map(
                            (criteria, index) => (
                              <Card key={index} elevation={0} sx={cardStyles}>
                                <CardContent
                                  sx={{ p: 2, "&:last-child": { pb: 2 } }}
                                >
                                  <Box sx={{ display: "flex", gap: 2 }}>
                                    <StarIcon
                                      color="primary"
                                      sx={{ mt: 0.5 }}
                                    />
                                    <Typography>{criteria}</Typography>
                                  </Box>
                                </CardContent>
                              </Card>
                            )
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Paper>
                </Stack>
              </Grid>

              {/* Sidebar */}
              <Grid item xs={12} md={4}>
                <Stack spacing={3} sx={{ position: "sticky", top: 24 }}>
                  {/* Challenge Info */}
                  <Paper elevation={0} sx={sectionStyles}>
                    <Stack spacing={3}>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Difficulty
                        </Typography>
                        <Chip
                          label={challenge.difficulty}
                          color={
                            challenge.difficulty === "Easy"
                              ? "success"
                              : challenge.difficulty === "Medium"
                              ? "warning"
                              : "error"
                          }
                          sx={{ fontWeight: "bold" }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Estimated Time
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <AccessTimeIcon color="action" />
                          <Typography>
                            {challenge.timeEstimate} minutes
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Required Skills
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {challenge?.tags?.map((tag, index) => (
                            <Chip
                              key={index}
                              label={tag.name}
                              size="small"
                              sx={{
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: "primary.main",
                                fontWeight: "medium",
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Stack>
                  </Paper>

                  {/* Files */}
                  <Paper elevation={0} sx={sectionStyles}>
                    <Typography variant="h6" sx={headerStyles}>
                      <AttachFileIcon /> Challenge Files
                    </Typography>
                    <List disablePadding>
                      {challenge.challengeFiles?.map((file, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            px: 0,
                            borderBottom:
                              index !== challenge.challengeFiles.length - 1
                                ? 1
                                : 0,
                            borderColor: "grey.200",
                          }}
                        >
                          <ListItemIcon>
                            <AttachFileIcon color="action" />
                          </ListItemIcon>
                          <ListItemText
                            primary={file.name}
                            secondary={`${(file.size / 1024 / 1024).toFixed(
                              2
                            )} MB`}
                          />
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              borderRadius: 2,
                              minWidth: 100,
                            }}
                          >
                            Download
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </Paper>

                  {/* Submit Section - Only show if hideSubmitButton is false */}
                  {!hideSubmitButton && (
                    <Paper elevation={0} sx={sectionStyles}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                        gutterBottom
                      >
                        Make sure you've reviewed all requirements
                      </Typography>
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={() => setOpenSubmitModal(true)}
                        sx={{
                          py: 2,
                          borderRadius: 2,
                          fontWeight: "bold",
                        }}
                      >
                        Submit Challenge
                      </Button>
                    </Paper>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Container>

          {/* Submit Modal - Only render if hideSubmitButton is false */}
          {!hideSubmitButton && (
            <SubmitChallengeModal
              open={openSubmitModal}
              onClose={() => setOpenSubmitModal(false)}
              challengeId={id}
              studentId={user.id}
              submissionGuidelines={challenge.submissionGuidelines}
            />
          )}
        </Box>
      )}
    </>
  );
}
