"use client";
import React from "react";
import { useState, useMemo, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import CodeIcon from "@mui/icons-material/Code";
import { useRouter } from "next/navigation";
import FilterSection from "@/components/FilterSection";
import ApiService from "@/api/apiService";
import { API } from "@/api/endpoints";

const getDifficultyColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "success";
    case "medium":
      return "warning";
    case "hard":
      return "error";
    default:
      return "default";
  }
};

export default function ChallengesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("Technology");
  const [filters, setFilters] = useState({
    searchQuery: "",
    subCategory: "",
    skill: "",
    difficulty: "",
  });

  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await ApiService.get(API.challenges.findAll);
        console.log(response.data.data.data);
        setChallenges(response.data.data.data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };
    fetchChallenges();
  }, []);
  const filteredChallenges = useMemo(() => {
    return challenges.filter((challenge) => {
      // Filter by search query (title or description)
      if (
        filters.searchQuery &&
        !challenge.title
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) &&
        !challenge.description
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Filter by subcategory
      if (
        filters.subCategory &&
        challenge?.field?.sub[0]?.name !== filters.subCategory
      ) {
        return false;
      }

      // Filter by difficulty
      if (
        filters.difficulty &&
        challenge.difficulty.toLowerCase() !== filters.difficulty.toLowerCase()
      ) {
        return false;
      }

      // Filter by skill/tag
      if (
        filters.skill &&
        !challenge.tags.some(
          (tag) => tag.name.toLowerCase() === filters.skill.toLowerCase()
        )
      ) {
        return false;
      }

      return true;
    });
  }, [challenges, filters]);

  const handleChallengeClick = (challengeId) => {
    router.push(`/challenges/${challengeId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <FilterSection
        filters={filters}
        onFilterChange={setFilters}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        totalResults={filteredChallenges.length}
      />

      {/* Challenges Grid */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {filteredChallenges &&
          filteredChallenges.map((challenge) => (
            <Grid item xs={12} sm={6} md={4} key={challenge._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-4px)",
                    transition: "all 0.3s ease-in-out",
                  },
                }}
                onClick={() => handleChallengeClick(challenge._id)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={challenge.difficulty}
                      color={getDifficultyColor(challenge.difficulty)}
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={(e) => e.stopPropagation()}
                    />

                    <Chip
                      label={challenge.field.sub[0]?.name}
                      variant="outlined"
                      size="small"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Box>

                  <Typography variant="h6" gutterBottom>
                    {challenge.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {challenge.description}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <AccessTimeIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {challenge.timeEstimate}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <StarIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {challenge.points} pts
                      </Typography>
                    </Box>
                  </Stack>

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {challenge.tags &&
                        challenge.tags.map((tag) => (
                          <Chip
                            key={tag._id}
                            label={tag.name}
                            size="small"
                            variant="outlined"
                            onClick={(e) => e.stopPropagation()}
                          />
                        ))}
                    </Box>
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    startIcon={<CodeIcon />}
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChallengeClick(challenge._id);
                    }}
                  >
                    View Challenge
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
