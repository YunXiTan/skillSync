const { Student, Field, SubField, Tag, Ranking } = require("../../models");
const bcrypt = require("bcryptjs");

const students = [
  {
    name: "John Smith",
    email: "john.smith@student.com",
    password: "password123",
    phone: "+1-555-0101",
    field: {
      main: null, // Will be populated with Technology
      sub: [], // Will be populated with Web Development and Data Science
    },
    tags: [], // Will be populated with ["JavaScript", "Python", "React"]
    rank: null, // Will be populated with Bronze rank
  },
  {
    name: "Emma Wilson",
    email: "emma.wilson@student.com",
    password: "password123",
    phone: "+1-555-0102",
    field: {
      main: null, // Will be populated with Design
      sub: [], // Will be populated with UI/UX and Product Design
    },
    tags: [], // Will be populated with ["UI Design", "User Research"]
    rank: null,
  },
  {
    name: "Michael Chen",
    email: "michael.chen@student.com",
    password: "password123",
    phone: "+1-555-0103",
    field: {
      main: null, // Will be populated with Finance
      sub: [], // Will be populated with FinTech and Trading
    },
    tags: [], // Will be populated with ["Financial Analysis", "Blockchain"]
    rank: null,
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@student.com",
    password: "password123",
    phone: "+1-555-0104",
    field: {
      main: null, // Will be populated with Business
      sub: [], // Will be populated with Strategy and Management
    },
    tags: [], // Will be populated with ["Strategic Planning", "Leadership"]
    rank: null,
  },
];

async function seedStudents() {
  try {
    // Clear existing students
    await Student.deleteMany({});

    // Hash passwords before creating students
    const hashedStudents = await Promise.all(
      students.map(async (student) => ({
        ...student,
        password: await bcrypt.hash(student.password, 10),
      }))
    );

    // Get Bronze rank
    const bronzeRank = await Ranking.findOne({ rankName: "Bronze" });
    if (!bronzeRank) {
      throw new Error(
        "Bronze rank not found. Please ensure rankings are seeded first."
      );
    }

    for (const studentData of hashedStudents) {
      // Find appropriate field based on student profile
      let fieldName = "Technology";
      let subFieldNames = ["Web Development", "Data Science"];
      let tagNames = ["JavaScript", "Python", "React"];

      if (studentData.name.includes("Emma")) {
        fieldName = "Design";
        subFieldNames = ["UI/UX", "Product Design"];
        tagNames = ["UI Design", "User Research"];
      } else if (studentData.name.includes("Michael")) {
        fieldName = "Finance";
        subFieldNames = ["FinTech", "Trading"];
        tagNames = ["Financial Analysis", "Blockchain"];
      } else if (studentData.name.includes("Sarah")) {
        fieldName = "Business";
        subFieldNames = ["Strategy", "Management"];
        tagNames = ["Strategic Planning", "Leadership"];
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

      // Create student with populated references
      await Student.create({
        ...studentData,
        field: {
          main: field._id,
          sub: subFields.map((sf) => sf._id),
        },
        tags: tags.map((tag) => tag._id),
        rank: bronzeRank._id, // Assign Bronze rank to new students
      });
    }

    console.log("✅ Students seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding students:", error);
    throw error;
  }
}

module.exports =  seedStudents ;
