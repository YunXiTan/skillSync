"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Chip,
  Autocomplete,
  InputAdornment,
  Alert,
  List,
  ListItem,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/FileUpload";
import ApiService from "@/api/apiService";
import { API } from "@/api/endpoints";

const steps = [
  "Basic Information",
  "Challenge Details",
  "Instructions & Resources",
  "Evaluation Criteria",
  "Review",
];

export default function CreateChallengePage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    subCategory: "",
    difficulty: "",
    timeEstimate: "",
    points: 100,
    skills: [],
    objectives: [""],
    instructions: [""],
    resources: [{ title: "", url: "" }],
    submissionGuidelines: [""],
    evaluationCriteria: [""],
    files: [],
  });
  const [fields, setFields] = useState([]);
  const [subFields, setSubFields] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const fieldsResponse = await ApiService.get(API.fields.findAll);
        const fieldsData = fieldsResponse.data.data.data || [];
        setFields(Array.isArray(fieldsData) ? fieldsData : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching fields:", error);
        setFields([]);
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  const fetchFieldDependencies = async (fieldId) => {
    try {
      const subFieldsResponse = await ApiService.get(
        API.fields.findAllSub.replace(":id", fieldId)
      );
      const subFieldsData = subFieldsResponse.data.data || [];

      setSubFields(subFieldsData);

      const tagsResponse = await ApiService.get(
        API.tags.findByField.replace(":fieldId", fieldId)
      );
      const tagsData = tagsResponse.data.data.data || [];
      console.log(tagsData);
      setTags(tagsData);
    } catch (error) {
      console.error("Error fetching field dependencies:", error);
    }
  };

  const handleFieldChange = async (value) => {
    handleChange("category", value);
    handleChange("subCategory", "");
    handleChange("skills", []);

    if (value) {
      await fetchFieldDependencies(value);
    } else {
      setSubFields([]);
      setTags([]);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0:
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.description.trim())
          newErrors.description = "Description is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.subCategory)
          newErrors.subCategory = "Sub-category is required";
        break;

      case 1:
        if (!formData.difficulty)
          newErrors.difficulty = "Difficulty is required";
        if (!formData.timeEstimate.trim())
          newErrors.timeEstimate = "Time estimate is required";
        if (formData.skills.length === 0)
          newErrors.skills = "At least one skill is required";
        break;

      case 2:
        if (formData.objectives.some((obj) => !obj.trim())) {
          newErrors.objectives = "All objectives must be filled";
        }
        if (formData.instructions.some((inst) => !inst.trim())) {
          newErrors.instructions = "All instructions must be filled";
        }
        break;

      case 3:
        if (formData.submissionGuidelines.some((guide) => !guide.trim())) {
          newErrors.submissionGuidelines =
            "All submission guidelines must be filled";
        }
        if (formData.evaluationCriteria.some((criteria) => !criteria.trim())) {
          newErrors.evaluationCriteria =
            "All evaluation criteria must be filled";
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    if (validateStep(activeStep)) {
      try {
        const submitFormData = new FormData();

        formData.files?.forEach((file) => {
          console.log("Adding file:", file.name);
          submitFormData.append("files", file);
        });

        const challengeData = {
          title: formData.title,
          description: formData.description,
          field: {
            main: formData.category,
            sub: [formData.subCategory],
          },
          difficulty: formData.difficulty.toLowerCase(),
          timeEstimate: parseInt(formData.timeEstimate),
          learningObjective: formData.objectives,
          stepToStepInstructions: formData.instructions,
          additionalResources: formData.resources,
          submissionGuidelines: formData.submissionGuidelines,
          evaluationCriteria: formData.evaluationCriteria,
          tags: formData.skills.map((tag) => tag._id),
        };

        console.log("Challenge data before stringify:", challengeData);

        submitFormData.append("data", challengeData);

        const response = await ApiService.post(
          API.challenges.create,
          challengeData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Response:", response);

        // if (response.data.success) {
        //   router.push("/company/challenges");
        // } else {
        //   throw new Error(
        //     response.data.message || "Failed to create challenge"
        //   );
        // }
      } catch (error) {
        console.error("Error creating challenge:", error);
      }
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field, defaultValue) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], defaultValue],
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Stack spacing={3}>
            <TextField
              label="Challenge Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              multiline
              rows={4}
              fullWidth
              required
            />

            <FormControl fullWidth required>
              <InputLabel>Field</InputLabel>
              <Select
                value={formData.category}
                label="Field"
                onChange={(e) => handleFieldChange(e.target.value)}
              >
                {Array.isArray(fields) &&
                  fields.map((field) => (
                    <MenuItem key={field._id} value={field._id}>
                      {field.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {formData.category && (
              <FormControl fullWidth required>
                <InputLabel>Sub-Field</InputLabel>
                <Select
                  value={formData.subCategory}
                  label="Sub-Field"
                  onChange={(e) => handleChange("subCategory", e.target.value)}
                >
                  {Array.isArray(subFields) &&
                    subFields.map((subField) => (
                      <MenuItem key={subField._id} value={subField._id}>
                        {subField.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
          </Stack>
        );

      case 1:
        return (
          <Stack spacing={3}>
            <FormControl fullWidth required>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={formData.difficulty}
                label="Difficulty"
                onChange={(e) => handleChange("difficulty", e.target.value)}
              >
                {["Easy", "Medium", "Hard"].map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Time Estimate"
              value={formData.timeEstimate}
              onChange={(e) => handleChange("timeEstimate", e.target.value)}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTimeIcon />
                  </InputAdornment>
                ),
              }}
            />

            {formData.category && (
              <Autocomplete
                multiple
                options={tags ?? []}
                value={formData.skills}
                onChange={(_, newValue) => handleChange("skills", newValue)}
                getOptionLabel={(option) => option.name || option}
                renderInput={(params) => (
                  <TextField {...params} label="Required Skills" required />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    const tagProps = getTagProps({ index });
                    const { key, ...chipProps } = tagProps;
                    return (
                      <Chip
                        key={key}
                        label={option.name || option}
                        {...chipProps}
                      />
                    );
                  })
                }
              />
            )}
          </Stack>
        );

      case 2:
        return (
          <Stack spacing={3}>
            {/* Learning Objectives */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Learning Objectives
              </Typography>
              {formData.objectives.map((objective, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    value={objective}
                    onChange={(e) =>
                      handleArrayChange("objectives", index, e.target.value)
                    }
                    fullWidth
                    required
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeArrayItem("objectives", index)}
                    disabled={formData.objectives.length === 1}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
              <Button onClick={() => addArrayItem("objectives", "")}>
                Add Objective
              </Button>
            </Box>

            {/* Challenge Files */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Challenge Files
              </Typography>
              <FileUpload
                title="Upload Challenge Files"
                description="Upload any necessary files for the challenge (max 5 files, 5MB each)"
                acceptedFileTypes=".pdf,.doc,.docx,.txt,.zip,.rar"
                maxFiles={5}
                maxFileSize={5}
                files={formData.files}
                onFilesChange={(files) => handleChange("files", files)}
              />
            </Box>

            {/* Instructions */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Step-by-Step Instructions
              </Typography>
              {formData.instructions.map((instruction, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    value={instruction}
                    onChange={(e) =>
                      handleArrayChange("instructions", index, e.target.value)
                    }
                    fullWidth
                    required
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeArrayItem("instructions", index)}
                    disabled={formData.instructions.length === 1}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
              <Button onClick={() => addArrayItem("instructions", "")}>
                Add Instruction
              </Button>
            </Box>

            {/* Resources */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Additional Resources
              </Typography>
              {formData.resources.map((resource, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    label="Title"
                    value={resource.title}
                    onChange={(e) =>
                      handleArrayChange("resources", index, {
                        ...resource,
                        title: e.target.value,
                      })
                    }
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="URL"
                    value={resource.url}
                    onChange={(e) =>
                      handleArrayChange("resources", index, {
                        ...resource,
                        url: e.target.value,
                      })
                    }
                    sx={{ flex: 2 }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeArrayItem("resources", index)}
                    disabled={formData.resources.length === 1}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
              <Button
                onClick={() =>
                  addArrayItem("resources", { title: "", url: "" })
                }
              >
                Add Resource
              </Button>
            </Box>
          </Stack>
        );

      case 3:
        return (
          <Stack spacing={3}>
            {/* Submission Guidelines */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Submission Guidelines
              </Typography>
              {formData.submissionGuidelines.map((guideline, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    value={guideline}
                    onChange={(e) =>
                      handleArrayChange(
                        "submissionGuidelines",
                        index,
                        e.target.value
                      )
                    }
                    fullWidth
                    required
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() =>
                      removeArrayItem("submissionGuidelines", index)
                    }
                    disabled={formData.submissionGuidelines.length === 1}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
              <Button onClick={() => addArrayItem("submissionGuidelines", "")}>
                Add Guideline
              </Button>
            </Box>

            {/* Evaluation Criteria */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Evaluation Criteria
              </Typography>
              {formData.evaluationCriteria.map((criteria, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    value={criteria}
                    onChange={(e) =>
                      handleArrayChange(
                        "evaluationCriteria",
                        index,
                        e.target.value
                      )
                    }
                    fullWidth
                    required
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeArrayItem("evaluationCriteria", index)}
                    disabled={formData.evaluationCriteria.length === 1}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
              <Button onClick={() => addArrayItem("evaluationCriteria", "")}>
                Add Criteria
              </Button>
            </Box>
          </Stack>
        );

      case 4:
        return (
          <Stack spacing={3}>
            <Typography variant="h6" gutterBottom>
              Review your challenge
            </Typography>

            {/* Basic Information */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Basic Information
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Title
                  </Typography>
                  <Typography>{formData.title}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography>{formData.description}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Category
                  </Typography>
                  <Typography>
                    {formData.category} → {formData.subCategory}
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            {/* Challenge Details */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Challenge Details
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Difficulty
                  </Typography>
                  <Typography>{formData.difficulty}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Time Estimate
                  </Typography>
                  <Typography>{formData.timeEstimate}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Required Skills
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}
                  >
                    {formData.skills.map((skill, index) => (
                      <Chip key={index} label={skill.name} size="small" />
                    ))}
                  </Box>
                </Box>
              </Stack>
            </Paper>

            {/* Instructions & Resources */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Instructions & Resources
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Learning Objectives
                  </Typography>
                  <List dense>
                    {formData.objectives.map((objective, index) => (
                      <ListItem key={index}>
                        <Typography>• {objective}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Instructions
                  </Typography>
                  <List dense>
                    {formData.instructions.map((instruction, index) => (
                      <ListItem key={index}>
                        <Typography>• {instruction}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Resources
                  </Typography>
                  <List dense>
                    {formData.resources.map((resource, index) => (
                      <ListItem key={index}>
                        <Typography>
                          • {resource.title}:{" "}
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {resource.url}
                          </a>
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Uploaded Files
                  </Typography>
                  <List dense>
                    {formData.files.map((file, index) => (
                      <ListItem key={index}>
                        <Typography>
                          • {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                          MB)
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Stack>
            </Paper>

            {/* Evaluation */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Evaluation
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Submission Guidelines
                  </Typography>
                  <List dense>
                    {formData.submissionGuidelines.map((guideline, index) => (
                      <ListItem key={index}>
                        <Typography>• {guideline}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Evaluation Criteria
                  </Typography>
                  <List dense>
                    {formData.evaluationCriteria.map((criteria, index) => (
                      <ListItem key={index}>
                        <Typography>• {criteria}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Stack>
            </Paper>
          </Stack>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{ mb: 4 }}
      >
        Back
      </Button>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Create New Challenge
        </Typography>

        <Stepper activeStep={activeStep} sx={{ my: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4 }}>
          {Object.keys(errors).length > 0 && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Please fix the following errors:
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}
          {renderStepContent()}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={
              activeStep === steps.length - 1 ? handleSubmit : handleNext
            }
          >
            {activeStep === steps.length - 1 ? "Create Challenge" : "Next"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
