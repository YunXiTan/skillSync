const { Challenge, Field, SubField, Tag, Company } = require("../../models");

const challenges = [
  // Technology - Web Development Challenges
  {
    title: "Build a REST API",
    description:
      "Create a RESTful API with Node.js and Express, including authentication and database integration.",
    difficulty: "medium",
    timeEstimate: 120,
    points: 100,
    learningObjective: [
      "Understand RESTful API principles",
      "Implement authentication middleware",
      "Create database models and controllers",
    ],
    stepToStepInstructions: [
      "Set up a Node.js project with Express",
      "Implement user authentication",
      "Create CRUD endpoints",
      "Add input validation",
      "Implement error handling",
    ],
    additionalResources: [
      { title: "Express Documentation", url: "https://expressjs.com" },
      { title: "MongoDB Atlas", url: "https://www.mongodb.com/cloud/atlas" },
    ],
    submissionGuidelines: [
      "Submit GitHub repository link",
      "Include README with setup instructions",
      "Deploy to a cloud platform",
    ],
    evaluationCriteria: [
      "Code quality and organization",
      "API documentation",
      "Error handling",
      "Security implementation",
    ],
    field: {
      main: null, // Will be populated with Technology
      sub: [], // Will be populated with Web Development
    },
    tags: [], // Will be populated with ["Node.js", "JavaScript", "MongoDB"]
    completedBy: 156,
  },

  // Technology - Data Science Challenge
  {
    title: "Machine Learning Image Classifier",
    description:
      "Build an image classification model using TensorFlow and deploy it as a web service.",
    difficulty: "hard",
    timeEstimate: 180,
    points: 150,
    learningObjective: [
      "Understand neural network architectures",
      "Implement data preprocessing pipelines",
      "Train and optimize ML models",
      "Deploy models to production",
    ],
    stepToStepInstructions: [
      "Set up development environment",
      "Prepare and preprocess dataset",
      "Design CNN architecture",
      "Train and validate model",
      "Create API for model serving",
    ],
    additionalResources: [
      { title: "TensorFlow Documentation", url: "https://www.tensorflow.org" },
      {
        title: "ML Model Deployment Guide",
        url: "https://www.tensorflow.org/guide/saved_model",
      },
    ],
    submissionGuidelines: [
      "Submit trained model files",
      "Include training notebooks",
      "Provide API documentation",
      "Include performance metrics",
    ],
    evaluationCriteria: [
      "Model accuracy",
      "Code organization",
      "Documentation quality",
      "API design",
    ],
    field: {
      main: null, // Will be populated with Technology
      sub: [], // Will be populated with Data Science
    },
    tags: [], // Will be populated with ["Python", "Machine Learning (ML)", "Data Visualization"]
    completedBy: 89,
  },

  // Finance - FinTech Challenge
  {
    title: "Blockchain Smart Contract Development",
    description:
      "Create and deploy smart contracts for decentralized finance applications.",
    difficulty: "hard",
    timeEstimate: 240,
    points: 200,
    learningObjective: [
      "Understand blockchain fundamentals",
      "Master smart contract development",
      "Implement secure transactions",
      "Test and deploy contracts",
    ],
    stepToStepInstructions: [
      "Set up development environment",
      "Design smart contract architecture",
      "Implement contract logic",
      "Write test cases",
      "Deploy to test network",
    ],
    additionalResources: [
      { title: "Solidity Documentation", url: "https://docs.soliditylang.org" },
      { title: "Web3.js Guide", url: "https://web3js.readthedocs.io" },
    ],
    submissionGuidelines: [
      "Submit contract source code",
      "Include test suite",
      "Provide deployment instructions",
      "Document contract interfaces",
    ],
    evaluationCriteria: [
      "Contract security",
      "Gas optimization",
      "Code quality",
      "Test coverage",
    ],
    field: {
      main: null, // Will be populated with Finance
      sub: [], // Will be populated with FinTech
    },
    tags: [], // Will be populated with ["Blockchain", "Financial Analysis", "Risk Assessment"]
    completedBy: 45,
  },
];

async function seedChallenges() {
  try {
    // Clear existing challenges
    await Challenge.deleteMany({});

    for (const challengeData of challenges) {
      // Find appropriate field based on challenge
      let fieldName = "Technology";
      let subFieldName = "Web Development";
      let tagNames = ["Node.js", "JavaScript", "MongoDB"];

      if (challengeData.title.includes("Machine Learning")) {
        subFieldName = "Data Science";
        tagNames = ["Python", "Machine Learning (ML)", "Data Visualization"];
      } else if (challengeData.title.includes("Blockchain")) {
        fieldName = "Finance";
        subFieldName = "FinTech";
        tagNames = ["Blockchain", "Financial Analysis", "Risk Assessment"];
      }

      // Find main field
      const field = await Field.findOne({ name: fieldName });

      // Find subfield
      const subField = await SubField.findOne({
        name: subFieldName,
        field: field._id,
      });

      // Find relevant tags
      const tags = await Tag.find({
        name: { $in: tagNames },
      });

      // Create challenge with populated references
      await Challenge.create({
        ...challengeData,
        field: {
          main: field._id,
          sub: [subField._id],
        },
        tags: tags.map((tag) => tag._id),
      });
    }

    console.log("✅ Challenges seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding challenges:", error);
    throw error;
  }
}

module.exports = seedChallenges;
