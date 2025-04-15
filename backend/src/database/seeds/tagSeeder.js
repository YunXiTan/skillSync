const { Tag, Field } = require("../../models");

// First, we'll create a mapping of fields and their associated skills
const fieldSkillsMap = {
  Technology: [
    "Python",
    "Java",
    "C++",
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Node.js",
    "Data Structures and Algorithms",
    "SQL",
    "MongoDB",
    "Cybersecurity",
    "Machine Learning (ML)",
    "Software Development",
    "Version Control (Git)",
    "AWS",
    "Data Visualization",
  ],
  Business: [
    "Project Management",
    "Strategic Planning",
    "Market Research",
    "Business Communication",
    "Leadership",
    "Business Analysis",
    "Process Improvement",
    "Customer Relationship Management (CRM)",
    "Entrepreneurship",
  ],
  Finance: [
    "Financial Reporting",
    "Budget Management",
    "Auditing",
    "Taxation",
    "Financial Analysis",
    "Regulatory Compliance",
    "Financial Forecasting",
    "Financial Modeling",
    "Risk Assessment",
    "Blockchain",
  ],
  Engineering: [
    "Computer-Aided Design (CAD)",
    "Structural Analysis",
    "Circuit Design",
    "Mechanical Design",
    "Robotics",
    "MATLAB/Simulink",
    "Quality Assurance",
  ],
};

const seedTags = async () => {
  try {
    // Clear existing tags
    await Tag.deleteMany({});

    // Get all fields from the database
    const fields = await Field.find({ mainField: null }); // Only get main fields

    // Create tags for each field
    for (const field of fields) {
      const fieldSkills = fieldSkillsMap[field.name] || [];

      // Create tags with reference to their field
      const tagPromises = fieldSkills.map((skillName) => {
        return Tag.create({
          name: skillName,
          field: field._id,
        });
      });

      await Promise.all(tagPromises);
    }

    console.log("Tags seeded successfully");
  } catch (error) {
    console.error("Error seeding tags:", error);
    throw error;
  }
};

module.exports = seedTags;
