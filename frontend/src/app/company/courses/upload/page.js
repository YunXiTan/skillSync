//draf
'use client';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Autocomplete,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function UploadCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploadError, setUploadError] = useState('');

  const studyFields = [
    'Computer Science',
    'Information Technology',
    'Data Science',
    'Software Engineering',
    'Web Development',
    'Cybersecurity',
    'Digital Marketing',
    'Business Analytics',
    'UI/UX Design'
  ];

  const skillOptions = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'Java',
    'SQL',
    'MongoDB',
    'AWS',
    'Docker',
    'Git',
    'UI Design',
    'UX Research',
    'Digital Marketing',
    'SEO',
    'Content Strategy',
    'Data Analysis'
  ];

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'video/mp4',
    'video/webm',
    'image/jpeg',
    'image/png',
    'application/zip',
    'text/plain'
  ];

  const maxFileSize = 50 * 1024 * 1024; // 50MB

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    setUploadError('');

    const validFiles = newFiles.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        setUploadError('Some files were not added. Invalid file type.');
        return false;
      }
      if (file.size > maxFileSize) {
        setUploadError('Some files were not added. Files must be less than 50MB.');
        return false;
      }
      return true;
    });

    setFiles(prevFiles => [...prevFiles, ...validFiles]);
  };

  const handleRemoveFile = (indexToRemove) => {
    setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Just log the form data for now
    console.log({
      title,
      description,
      studyField: selectedField,
      skills: selectedSkills,
      files: files.map(f => ({ name: f.name, size: f.size, type: f.type }))
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={0} sx={{ border: '1px solid #e0e0e0', p: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Upload New Course
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          Create a new course to share your expertise with students
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Course Title"
              variant="outlined"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              helperText="Enter a clear and concise title for your course"
            />

            <TextField
              label="Course Description"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              helperText="Provide a detailed description of what students will learn"
            />

            <FormControl fullWidth required>
              <InputLabel>Study Field</InputLabel>
              <Select
                value={selectedField}
                label="Study Field"
                onChange={(e) => setSelectedField(e.target.value)}
              >
                {studyFields.map((field) => (
                  <MenuItem key={field} value={field}>
                    {field}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Autocomplete
              multiple
              options={skillOptions}
              value={selectedSkills}
              onChange={(event, newValue) => setSelectedSkills(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Skills"
                  helperText="Select relevant skills that students will learn"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const tagProps = getTagProps({ index });
                  const { key, ...otherProps } = tagProps;
                  return (
                    <Chip
                      key={key}
                      label={option}
                      {...otherProps}
                      sx={{
                        backgroundColor: '#e3f2fd',
                        '& .MuiChip-deleteIcon': {
                          color: '#1976d2',
                        },
                      }}
                    />
                  );
                })
              }
            />

            <Box sx={{ 
              border: '2px dashed #e0e0e0',
              borderRadius: 1,
              p: 3,
              textAlign: 'center',
              bgcolor: '#fafafa',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: '#f5f5f5'
              }
            }}>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="course-files"
                accept={allowedTypes.join(',')}
              />
              <label htmlFor="course-files">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CloudUploadIcon sx={{ fontSize: 48, color: '#1976d2', mb: 2 }} />
                  <Typography variant="body1" gutterBottom>
                    Upload Course Materials
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    Drag and drop your files here, or click to browse
                  </Typography>
                  <Button variant="outlined" component="span">
                    Browse Files
                  </Button>
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
                    Supported formats: PDF, DOC, DOCX, PPT, PPTX, MP4, WEBM, JPG, PNG, ZIP, TXT (Max 50MB)
                  </Typography>
                </Box>
              </label>
            </Box>

            {files.length > 0 && (
              <List sx={{ mt: 2, bgcolor: '#fafafa', borderRadius: 1 }}>
                {files.map((file, index) => (
                  <ListItem key={index} sx={{ borderBottom: '1px solid #eee' }}>
                    <InsertDriveFileIcon sx={{ mr: 2, color: '#1976d2' }} />
                    <ListItemText 
                      primary={file.name}
                      secondary={formatFileSize(file.size)}
                    />
                    <ListItemSecondaryAction>
                      <IconButton 
                        edge="end" 
                        onClick={() => handleRemoveFile(index)}
                        sx={{ color: '#d32f2f' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}

            {uploadError && (
              <Typography color="error">
                {uploadError}
              </Typography>
            )}

            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              fullWidth
              sx={{ mt: 3 }}
              disabled={files.length === 0}
            >
              Upload Course
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
} 