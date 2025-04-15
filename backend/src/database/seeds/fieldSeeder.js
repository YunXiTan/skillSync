const { Field, SubField } = require("../../models");

const mainFields = [
  {
    name: "Technology",
    description:
      "Computer science, software development, and IT related fields",
    subfields: [
      "Web Development",
      "Mobile Development",
      "Cloud Computing",
      "Data Science",
      "Cybersecurity",
    ],
  },
  {
    name: "Business",
    description: "Business administration and management fields",
    subfields: ["Strategy", "Operations", "Management", "Entrepreneurship"],
  },
  {
    name: "Finance",
    description: "Financial markets, banking, and investment fields",
    subfields: ["Investment", "FinTech", "Risk Management", "Trading"],
  },
  {
    name: "Design",
    description: "Digital and physical design disciplines",
    subfields: ["UI/UX", "Graphic Design", "Product Design", "Brand Design"],
  },
  {
    name: "Marketing",
    description: "Marketing, advertising, and promotional fields",
    subfields: [
      "Digital Marketing",
      "Content Marketing",
      "Social Media",
      "SEO",
    ],
  },
];

async function seedFields() {
  try {
    // Clear existing fields and subfields
    await Field.deleteMany({});
    await SubField.deleteMany({});

    // Create main fields and their subfields
    for (const field of mainFields) {
      // Create main field
      const mainField = await Field.create({
        name: field.name,
        description: field.description,
      });

      // Create subfields for this main field
      for (const subFieldName of field.subfields) {
        await SubField.create({
          name: subFieldName,
          description: `Subfield of ${field.name}`,
          field: mainField._id,
        });
      }
    }

    console.log("✅ Fields and subfields seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding fields:", error);
    throw error;
  }
}

module.exports = seedFields;
