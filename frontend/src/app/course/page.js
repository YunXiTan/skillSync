'use client';
import { 
Container, 
Typography, 
Grid, 
Card, 
CardContent, 
Button, 
Box, 
TextField,
InputAdornment,
Stack,
Tabs,
Tab,
FormControl,
InputLabel,
Select,
MenuItem,
CardActions,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import StarIcon from '@mui/icons-material/Star';
import ComputerIcon from '@mui/icons-material/Computer';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BrushIcon from '@mui/icons-material/Brush';
import CampaignIcon from '@mui/icons-material/Campaign';
import SchoolIcon from '@mui/icons-material/School';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

const categoryConfig = {
Technology: {
icon: ComputerIcon,
subCategories: ['Web Development', 'Mobile Development', 'Data Science', 'Cloud Computing'],
skills: ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Machine Learning'],
},
Business: {
icon: BusinessIcon,
subCategories: ['Strategy', 'Management', 'Operations', 'Leadership'],
skills: ['Strategic Planning', 'Project Management', 'Business Analysis', 'Team Leadership'],
},
Finance: {
icon: AccountBalanceIcon,
subCategories: ['Investment', 'FinTech', 'Banking', 'Trading'],
skills: ['Financial Analysis', 'Blockchain', 'Risk Assessment', 'Trading'],
},
Design: {
icon: BrushIcon,
subCategories: ['UI/UX', 'Graphic Design', 'Web Design', 'Product Design'],
skills: ['User Research', 'Wireframing', 'Typography', 'Visual Design'],
},
Marketing: {
icon: CampaignIcon,
subCategories: ['Digital Marketing', 'Content Marketing', 'Social Media', 'SEO'],
skills: ['Content Strategy', 'SEO', 'Social Media Marketing', 'Analytics'],
}
};

const mockCourses = {
Technology: [
{
    id: 1,
    title: 'Full Stack Web Development',
    subCategory: 'Web Development',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    description: 'Master modern web development with MERN stack. Build real-world projects from scratch to deployment.',
    rating: 4.8,
    enrolledCount:156,
},
{
    id: 2,
    title: 'Python for Data Science',
    subCategory: 'Data Science',
    skills: ['Python', 'Data Analysis', 'Machine Learning'],
    description: 'Learn Python programming for data analysis, visualization, and machine learning.',
    rating: 4.7,
    enrolledCount:80,
},
{
    id: 3,
    title: 'Mobile App Development',
    subCategory: 'Mobile Development',
    skills: ['React Native', 'JavaScript', 'Mobile Design'],
    description: 'Create cross-platform mobile applications using React Native framework.',
    rating: 4.6,
    enrolledCount:100,
},
],
Business: [
{
    id: 4,
    title: 'Business Strategy Fundamentals',
    subCategory: 'Strategy',
    skills: ['Strategic Planning', 'Business Analysis', 'Decision Making'],
    description: 'Learn core business strategy concepts and frameworks for effective decision making.',
    rating: 4.5,
    enrolledCount:90,
},
{
    id: 5,
    title: 'Project Management Essentials',
    subCategory: 'Management',
    skills: ['Project Planning', 'Team Leadership', 'Risk Management'],
    description: 'Master the fundamentals of project management and team leadership.',
    rating: 4.9,
    enrolledCount:150,
},
],
Finance: [
{
    id: 6,
    title: 'Investment Banking Basics',
    subCategory: 'Investment',
    skills: ['Financial Analysis', 'Valuation', 'Modeling'],
    description: 'Introduction to investment banking concepts and financial analysis.',
    rating: 4.7,
    enrolledCount:120,
},
{
    id: 7,
    title: 'Blockchain Development',
    subCategory: 'FinTech',
    skills: ['Blockchain', 'Smart Contracts', 'DeFi'],
    description: 'Learn blockchain technology and smart contract development.',
    rating: 4.8,
    enrolledCount:56,
},
],
Design: [
{
    id: 8,
    title: 'UI/UX Design Principles',
    subCategory: 'UI/UX',
    skills: ['User Research', 'Wireframing', 'Prototyping'],
    description: 'Master the principles of user interface and user experience design.',
    rating: 4.9,
    enrolledCount:30,
},
{
    id: 9,
    title: 'Graphic Design Fundamentals',
    subCategory: 'Graphic Design',
    skills: ['Typography', 'Color Theory', 'Layout Design'],
    description: 'Learn the core principles of graphic design and visual communication.',
    rating: 4.6,
    enrolledCount:120,
},
],
Marketing: [
{
    id: 10,
    title: 'Digital Marketing Strategy',
    subCategory: 'Digital Marketing',
    skills: ['SEO', 'Content Marketing', 'Analytics'],
    description: 'Develop comprehensive digital marketing strategies for business growth.',
    rating: 4.7,
    enrolledCount:121,
},
{
    id: 11,
    title: 'Social Media Marketing',
    subCategory: 'Social Media',
    skills: ['Social Strategy', 'Content Creation', 'Community Management'],
    description: 'Master social media marketing strategies and community engagement.',
    rating: 4.8,
    enrolledCount:50,
},
],
};

export default function CoursesPage() {
const router = useRouter();
const [selectedCategory, setSelectedCategory] = useState('Technology');
const [filters, setFilters] = useState({
subCategory: 'All',
skill: 'All',
});
const [searchQuery, setSearchQuery] = useState('');
const [showFilters, setShowFilters] = useState(false);

const currentConfig = categoryConfig[selectedCategory];

const FilterSection = () => (
<Box 
    sx={{ 
    p: 2, 
    bgcolor: 'background.paper',
    borderRadius: 1,
    mt: 2,
    display: showFilters ? 'block' : 'none'
    }}
>
    <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
        <FormControl fullWidth size="small">
        <InputLabel>Sub-Category</InputLabel>
        <Select
            value={filters.subCategory}
            label="Sub-Category"
            onChange={(e) => setFilters(prev => ({ ...prev, subCategory: e.target.value }))}
        >
            <MenuItem value="All">All Sub-Categories</MenuItem>
            {currentConfig.subCategories.map(option => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
        </Select>
        </FormControl>
    </Grid>
    <Grid item xs={12} md={6}>
        <FormControl fullWidth size="small">
        <InputLabel>Skill</InputLabel>
        <Select
            value={filters.skill}
            label="Skill"
            onChange={(e) => setFilters(prev => ({ ...prev, skill: e.target.value }))}
        >
            <MenuItem value="All">All Skills</MenuItem>
            {currentConfig.skills.map(option => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
        </Select>
        </FormControl>
    </Grid>
    </Grid>
</Box>
);

const filteredCourses = useMemo(() => {
return mockCourses[selectedCategory].filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubCategory = filters.subCategory === 'All' || course.subCategory === filters.subCategory;
    const matchesSkill = filters.skill === 'All' || course.skills.includes(filters.skill);

    return matchesSearch && matchesSubCategory && matchesSkill;
});
}, [selectedCategory, searchQuery, filters]);

return (
<Container maxWidth="lg" sx={{ py: 4 }}>
    <Stack spacing={4}>
    {/* Header */}
    <Box>
        <Typography variant="h4" gutterBottom>
        Courses
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
        Explore our comprehensive collection of courses
        </Typography>
    </Box>

    {/* Category Navigation */}
    <Tabs
        value={selectedCategory}
        onChange={(e, newValue) => {
        setSelectedCategory(newValue);
        setFilters({
            subCategory: 'All',
            skill: 'All',
        });
        }}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
        borderBottom: 1,
        borderColor: 'divider',
        '& .MuiTab-root': {
            minHeight: 72,
            fontSize: '1rem',
        }
        }}
    >
        {Object.entries(categoryConfig).map(([category, { icon: Icon }]) => (
        <Tab
            key={category}
            value={category}
            label={category}
            icon={<Icon />}
            iconPosition="top"
        />
        ))}
    </Tabs>

    {/* Search and Filters */}
    <Box>
        <Stack direction="row" spacing={2}>
        <TextField
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            size="small"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <SearchIcon />
                </InputAdornment>
            ),
            }}
        />
        <Button 
            variant="outlined"
            onClick={() => setShowFilters(!showFilters)}
            startIcon={<FilterListIcon />}
        >
            Filters
        </Button>
        </Stack>
        <FilterSection />
    </Box>

    {/* Results count */}
    <Box>
        <Typography variant="subtitle2" color="text.secondary">
        Showing {filteredCourses.length} courses
        </Typography>
    </Box>

    {/* Courses Grid */}
    <Grid container spacing={3}>
        {filteredCourses.map((course) => (
        <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card 
            elevation={0}
            sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease-in-out',
                },
                }}
            onClick={() => router.push(`/course/${course.id}`)}
            >
            <CardContent>
                <Typography 
                variant="h6" 
                gutterBottom
                sx={{ fontWeight: 'bold' }}
                >
                {course.title}
                </Typography>

                <Button 
                variant="outlined" 
                size="small" 
                sx={{ 
                    mb: 2,
                    textTransform: 'none',
                    borderColor: 'orange',
                    color: 'orange'
                }}
                >
                {course.subCategory}
                </Button>

                <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 2 }}
                >
                {course.description}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <StarIcon sx={{ color: 'grey' }} />
                        <Typography variant="body2" color="text.secondary">
                            {course.rating}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <SchoolIcon sx={{ color: 'grey' }} />
                        <Typography variant="body2" color="text.secondary">
                            {course.enrolledCount} enrolled
                        </Typography>
                    </Box>
                </Stack>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {course.skills.map((skill) => (
                    <Button 
                    key={skill}
                    variant="outlined" 
                    size="small" 
                    sx={{ 
                        textTransform: 'none',
                        borderColor: 'orange',
                        color: 'orange'
                    }}
                    >
                    {skill}
                    </Button>
                ))}
                </Box>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                variant="contained" 
                startIcon={<SchoolIcon />}
                fullWidth
                onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/course/${course.id}`);
                }}
                sx={{
                    bgcolor: 'orange',
                    '&:hover': {
                    bgcolor: 'darkorange',
                    }
                }}
                >
                View Course
                </Button>
            </CardActions>
            </Card>
        </Grid>
        ))}
    </Grid>
    </Stack>
</Container>
);
}