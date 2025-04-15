'use client';
import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  LinearProgress,
  Stack,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import FileIcon from '@mui/icons-material/InsertDriveFile';

export default function FileUpload({
  title = 'Upload Files',
  description = 'Drag and drop files here or click to select files',
  acceptedFileTypes = '*',
  maxFiles = 5,
  maxFileSize = 5,
  files: initialFiles = [],
  onFilesChange = () => {},
}) {
  const filesRef = React.useRef(initialFiles);
  const [files, setFiles] = useState(initialFiles);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  useEffect(() => {
    if (JSON.stringify(filesRef.current) !== JSON.stringify(initialFiles)) {
      filesRef.current = initialFiles;
      setFiles(initialFiles);
      
      const newProgress = {};
      initialFiles.forEach(file => {
        newProgress[file.name] = 100;
      });
      setUploadProgress(newProgress);
    }
  }, [initialFiles]);

  const validateFile = useCallback((file) => {
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size should be less than ${maxFileSize}MB`;
    }

    if (acceptedFileTypes !== '*') {
      const fileName = file.name.toLowerCase();
      const fileExtension = '.' + fileName.split('.').pop();
      const acceptedTypes = acceptedFileTypes.split(',').map(type => type.trim().toLowerCase());
      
      if (!acceptedTypes.some(type => fileExtension === type)) {
        return `File type not accepted. Please upload ${acceptedFileTypes}`;
      }
    }

    return null;
  }, [maxFileSize, acceptedFileTypes]);

  const simulateUpload = useCallback((fileName) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        setUploadProgress(prev => ({
          ...prev,
          [fileName]: progress
        }));
      }
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleFiles = useCallback((newFiles) => {
    const fileArray = Array.from(newFiles);
    
    if (files.length + fileArray.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const validFiles = fileArray.filter(file => {
      const error = validateFile(file);
      if (error) {
        alert(error);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);

      const newProgress = { ...uploadProgress };
      validFiles.forEach(file => {
        newProgress[file.name] = 0;
        simulateUpload(file.name);
      });
      setUploadProgress(newProgress);
    }
  }, [files, maxFiles, validateFile, simulateUpload, onFilesChange, uploadProgress]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleFileSelect = useCallback((e) => {
    handleFiles(e.target.files);
  }, [handleFiles]);

  const handleRemoveFile = useCallback((fileToRemove) => {
    setFiles(prevFiles => {
      const updatedFiles = prevFiles.filter(file => file !== fileToRemove);
      onFilesChange(updatedFiles);
      return updatedFiles;
    });
    setUploadProgress(prev => {
      const { [fileToRemove.name]: removed, ...rest } = prev;
      return rest;
    });
  }, [onFilesChange]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box>
      <Paper
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
        }}
        onDrop={handleDrop}
        sx={{
          p: 3,
          border: '2px dashed',
          borderColor: isDragging ? 'primary.main' : 'grey.300',
          bgcolor: isDragging ? 'action.hover' : 'background.paper',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onClick={() => document.getElementById('file-input').click()}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept={acceptedFileTypes}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <Stack spacing={1} alignItems="center">
          <CloudUploadIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {description}
          </Typography>
          <Button variant="outlined" size="small">
            Select Files
          </Button>
        </Stack>
      </Paper>

      {files.length > 0 && (
        <List>
          {files.map((file, index) => (
            <ListItem
              key={`${file.name}-${index}`}
              sx={{ position: 'relative', mb: 1 }}
            >
              <FileIcon sx={{ mr: 2 }} />
              <ListItemText
                primary={file.name}
                secondary={formatFileSize(file.size)}
              />
              <ListItemSecondaryAction>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    {uploadProgress[file.name] || 0}%
                  </Typography>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveFile(file)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </ListItemSecondaryAction>
              <LinearProgress
                variant="determinate"
                value={uploadProgress[file.name] || 0}
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
} 