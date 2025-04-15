const { Company, Field, SubField, Tag } = require("../../models");
const bcrypt = require("bcryptjs");

const companies = [
  {
    name: "TechCorp Solutions",
    phone: "+1-555-0123",
    email: "contact@techcorp.com",
    companyName: "TechCorp Solutions Inc.",
    password: "techcorp123",
    field: {
      main: null, // Will be populated with Technology
      sub: [], // Will be populated with Web Development and Cloud Computing
    },
    tags: [], // Will be populated with ["JavaScript", "Node.js", "AWS"]
  },
  {
    name: "FinTech Innovations",
    phone: "+1-555-0124",
    email: "contact@fintechinno.com",
    companyName: "FinTech Innovations Ltd.",
    password: "fintech123",
    field: {
      main: null, // Will be populated with Finance
      sub: [], // Will be populated with FinTech
    },
    tags: [], // Will be populated with ["Blockchain", "Financial Analysis"]
  },
  {
    name: "Design Masters",
    phone: "+1-555-0125",
    email: "contact@designmasters.com",
    companyName: "Design Masters Studio",
    password: "design123",
    field: {
      main: null, // Will be populated with Design
      sub: [], // Will be populated with UI/UX and Brand Design
    },
    tags: [], // Will be populated with relevant design tags
  },
  {
    name: "Business Analytics Pro",
    phone: "+1-555-0126",
    email: "contact@businesspro.com",
    companyName: "Business Analytics Professional",
    password: "business123",
    field: {
      main: null, // Will be populated with Business
      sub: [], // Will be populated with Strategy and Management
    },
    tags: [], // Will be populated with ["Business Analysis", "Strategic Planning"]
  }
];

async function seedCompanies() {
  try {
    // Clear existing companies
    await Company.deleteMany({});

    // Hash passwords before creating companies
    const hashedCompanies = await Promise.all(
      companies.map(async (company) => ({
        ...company,
        password: await bcrypt.hash(company.password, 10)
      }))
    );

    for (const companyData of hashedCompanies) {
      // Find appropriate field based on company name
      let fieldName = "Technology";
      let subFieldNames = ["Web Development", "Cloud Computing"];
      let tagNames = ["JavaScript", "Node.js", "AWS"];

      if (companyData.name.includes("FinTech")) {
        fieldName = "Finance";
        subFieldNames = ["FinTech"];
        tagNames = ["Blockchain", "Financial Analysis"];
      } else if (companyData.name.includes("Design")) {
        fieldName = "Design";
        subFieldNames = ["UI/UX", "Brand Design"];
        tagNames = ["UI/UX", "Graphic Design"];
      } else if (companyData.name.includes("Business")) {
        fieldName = "Business";
        subFieldNames = ["Strategy", "Management"];
        tagNames = ["Business Analysis", "Strategic Planning"];
      }

      // Find main field
      const field = await Field.findOne({ name: fieldName });

      // Find subfields
      const subFields = await SubField.find({
        name: { $in: subFieldNames },
        field: field._id,
      });

      // Find relevant tags
      const tags = await Tag.find({
        name: { $in: tagNames },
      });

      // Create company with populated references
      await Company.create({
        ...companyData,
        field: {
          main: field._id,
          sub: subFields.map(sf => sf._id),
        },
        tags: tags.map(tag => tag._id),
      });
    }

    console.log("✅ Companies seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding companies:", error);
    throw error;
  }
}

module.exports = seedCompanies;
