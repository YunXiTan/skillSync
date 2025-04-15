'use client';
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Stack,
  Chip,
  Box,
  Button,
  CardActions,
} from '@mui/material';
import{ useRouter } from 'next/navigation';

export default function HackathonCard({ hackathon, isOngoing }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/hackathon/${hackathon.id}`);
  };

  return (
    <Box onClick={handleCardClick} sx={{ cursor: 'pointer' }}>
      <Card sx={{ height: '100%' }}>
        <CardMedia
          component="img"
          height="200"
          image={hackathon.image}
          alt={hackathon.title}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {hackathon.title}
          </Typography>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            {hackathon.company}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {hackathon.description}
          </Typography>
          
          {/* Tags */}
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {hackathon.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Stack>

          {/* Prizes */}
          <Typography variant="subtitle2" gutterBottom>
            Prizes:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {hackathon.prizes.map((prize) => (
              <Chip 
                key={prize}
                label={prize}
                size="small"
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>

          {/* Deadline or Winners */}
          {isOngoing ? (
            <Typography variant="body2" color="text.secondary">
              Deadline: {hackathon.deadline}
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Winners: {hackathon.winners.join(', ')}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}