"use client";
import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Tabs,
  Tab,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ComputerIcon from "@mui/icons-material/Computer";
import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BrushIcon from "@mui/icons-material/Brush";
import CampaignIcon from "@mui/icons-material/Campaign";

// Move categoryConfig inside the component
const CATEGORY_CONFIG = {
  Technology: {
    icon: ComputerIcon,
    subCategories: [
      "Web Development",
      "Mobile Development",
      "Cloud Computing",
      "Data Science",
      "Cybersecurity",
    ],
    skills: [
      "JavaScript",
      "Python",
      "React",
      "Node.js",
      "AWS",
      "Machine Learning",
    ],
  },
  Business: {
    icon: BusinessIcon,
    subCategories: ["Strategy", "Operations", "Management", "Entrepreneurship"],
    skills: [
      "Business Analysis",
      "Project Management",
      "Strategic Planning",
      "Leadership",
    ],
  },
  Finance: {
    icon: AccountBalanceIcon,
    subCategories: ["Investment", "FinTech", "Risk Management", "Trading"],
    skills: [
      "Financial Analysis",
      "Risk Assessment",
      "Blockchain",
      "Trading Strategies",
    ],
  },
  Design: {
    icon: BrushIcon,
    subCategories: [
      "UI/UX",
      "Graphic Design",
      "Product Design",
      "Brand Design",
    ],
    skills: ["UI Design", "User Research", "Wireframing", "Prototyping"],
  },
  Marketing: {
    icon: CampaignIcon,
    subCategories: [
      "Digital Marketing",
      "Content Marketing",
      "Social Media",
      "SEO",
    ],
    skills: [
      "Social Media Marketing",
      "Content Strategy",
      "Analytics",
      "SEO Optimization",
    ],
  },
};

export default function FilterSection({
  filters,
  onFilterChange,
  selectedCategory,
  onCategoryChange,
  showDifficulty = true,
  totalResults,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (field) => (event) => {
    onFilterChange({
      ...filters,
      [field]: event.target.value,
      ...(field === "category" && { subCategory: "", skill: "" }),
    });
  };

  return (
    <Stack spacing={4}>
      {/* Category Navigation */}
      <Box>
        <Tabs
          value={selectedCategory}
          onChange={(e, newValue) => {
            onCategoryChange(newValue);
            onFilterChange({
              ...filters,
              subCategory: "",
              skill: "",
            });
          }}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTab-root": {
              minHeight: 72,
              fontSize: "1rem",
            },
          }}
        >
          {Object.entries(CATEGORY_CONFIG).map(([category, { icon: Icon }]) => (
            <Tab
              key={category}
              value={category}
              label={category}
              icon={<Icon />}
              iconPosition="top"
            />
          ))}
        </Tabs>
      </Box>

      {/* Search and Filters */}
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={2}
        sx={{ width: "100%" }}
      >
        <TextField
          placeholder="Search challenges..."
          value={filters.searchQuery}
          onChange={(e) =>
            onFilterChange({ ...filters, searchQuery: e.target.value })
          }
          sx={{ flex: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl sx={{ flex: 1, minWidth: 120 }}>
          <InputLabel>Sub-Category</InputLabel>
          <Select
            value={filters.subCategory}
            label="Sub-Category"
            onChange={handleChange("subCategory")}
            disabled={!selectedCategory}
          >
            <MenuItem value="">All</MenuItem>
            {selectedCategory &&
              CATEGORY_CONFIG[selectedCategory].subCategories.map((subCat) => (
                <MenuItem key={subCat} value={subCat}>
                  {subCat}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl sx={{ flex: 1, minWidth: 120 }}>
          <InputLabel>Skill</InputLabel>
          <Select
            value={filters.skill}
            label="Skill"
            onChange={handleChange("skill")}
            disabled={!selectedCategory}
          >
            <MenuItem value="">All</MenuItem>
            {selectedCategory &&
              CATEGORY_CONFIG[selectedCategory].skills.map((skill) => (
                <MenuItem key={skill} value={skill}>
                  {skill}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        {showDifficulty && (
          <FormControl sx={{ flex: 1, minWidth: 120 }}>
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={filters.difficulty}
              label="Difficulty"
              onChange={handleChange("difficulty")}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Easy">Easy</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Hard">Hard</MenuItem>
            </Select>
          </FormControl>
        )}
      </Stack>

      {/* Results Count */}
      {typeof totalResults !== "undefined" && (
        <Typography variant="subtitle2" color="text.secondary">
          Showing {totalResults} challenges
        </Typography>
      )}
    </Stack>
  );
}

// Export the category config if needed elsewhere
export { CATEGORY_CONFIG };
