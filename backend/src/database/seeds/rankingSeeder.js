const { Ranking } = require("../../models");

const rankings = [
  {
    rankName: "Bronze",
    description:
      "Start your journey with introductory challenges and fundamental skills development.",
    promoteRule:
      "Complete 5 easy challenges and earn 500 points to advance to Silver",
  },
  {
    rankName: "Silver",
    description:
      "Take on more complex tasks and practical applications as you advance.",
    promoteRule:
      "Complete 3 medium challenges, 1 hackathon, and earn 1000 points to advance to Gold",
  },
  {
    rankName: "Gold",
    description:
      "Master advanced challenges and connect directly with industry opportunities.",
    promoteRule:
      "Maintain high performance and mentor other students to retain Gold status",
  },
];

async function seedRankings() {
  try {
    // Clear existing rankings
    await Ranking.deleteMany({});

    // Create rankings
    await Ranking.insertMany(rankings);

    console.log("✅ Rankings seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding rankings:", error);
    throw error;
  }
}

module.exports = seedRankings;
