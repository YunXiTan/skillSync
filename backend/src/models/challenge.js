const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    timeEstimate: { type: Number, required: true }, // in minutes
    points: { type: Number, default: 100 },
    learningObjective: [{ type: String }],
    stepToStepInstructions: [{ type: String }],
    challengeFiles: [
      {
        filename: { type: String, required: true },
        originalName: { type: String, required: true },
        path: { type: String, required: true },
        size: { type: Number, required: true },
        mimetype: { type: String, required: true },
      },
    ],
    submissionGuidelines: [{ type: String }],
    evaluationCriteria: [{ type: String }],
    additionalResources: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    field: {
      main: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Field",
        required: true,
      },
      sub: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubField" }],
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    hackathon: { type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" },
    studentChallenges: [
      { type: mongoose.Schema.Types.ObjectId, ref: "StudentChallenge" },
    ],
    deleted_at: Date,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;
