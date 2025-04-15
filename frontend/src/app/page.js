"use client";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import ApiService from "@/api/apiService";
import { API } from "@/api/endpoints";


export default function Home() {
  const theme = useTheme();
  const [apiResponse, setApiResponse] = useState(null);

  const testBackendConnection = async () => {
    try {
      const response = await ApiService.get(API.tags.findAll);
      const data = await response.json();
      console.log(data);
      setApiResponse(data);
    } catch (error) {
      setApiResponse({ error: "Failed to connect to backend" });
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ minHeight: "100vh", py: 4 }}>
        {/* Add Backend Test Section */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Backend Connection Test
          </Typography>
          <Stack direction="column" spacing={2}>
            <Button variant="contained" onClick={testBackendConnection}>
              Test Backend Connection
            </Button>
            {apiResponse && (
              <Typography variant="body1">
                Response: {JSON.stringify(apiResponse)}
              </Typography>
            )}
          </Stack>
        </Paper>

        {/* Theme Color Showcase */}
        <Typography variant="h3" gutterBottom>
          Theme Colors
        </Typography>

        {/* Primary Colors */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Primary Colors
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary">
              Primary
            </Button>
            <Button variant="outlined" color="primary">
              Primary Outlined
            </Button>
            <Button variant="text" color="primary">
              Primary Text
            </Button>
          </Stack>
        </Paper>

        {/* Secondary Colors */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Secondary Colors
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="secondary">
              Secondary
            </Button>
            <Button variant="outlined" color="secondary">
              Secondary Outlined
            </Button>
            <Button variant="text" color="secondary">
              Secondary Text
            </Button>
          </Stack>
        </Paper>

        {/* Status Colors */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Status Colors
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="success">
              Success
            </Button>
            <Button variant="contained" color="error">
              Error
            </Button>
            <Button variant="contained" color="warning">
              Warning
            </Button>
            <Button variant="contained" color="info">
              Info
            </Button>
          </Stack>
        </Paper>

        {/* Typography */}
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Typography
          </Typography>
          <Typography variant="h1">h1. Heading</Typography>
          <Typography variant="h2">h2. Heading</Typography>
          <Typography variant="h3">h3. Heading</Typography>
          <Typography variant="h4">h4. Heading</Typography>
          <Typography variant="h5">h5. Heading</Typography>
          <Typography variant="h6">h6. Heading</Typography>
          <Typography variant="subtitle1">
            subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
          <Typography variant="subtitle2">
            subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
          <Typography variant="body1">
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
          <Typography variant="body2">
            body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
