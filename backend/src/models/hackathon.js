const mongoose = require("mongoose");

const hackathonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    reward: { type: String },
    dueDate: { type: Date },
    maxParticipants: { type: Number },
    registrationStartDate: { type: Date },
    registrationEndDate: { type: Date },
    timeline: { type: String },
    coverUrl: { type: String },
    field: {
      main: { type: mongoose.Schema.Types.ObjectId, ref: "Field" },
      sub: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubField" }],
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    createdDate: { type: Date, default: Date.now },
    uploadedFile: { type: String },
    studentHackathons: [
      { type: mongoose.Schema.Types.ObjectId, ref: "StudentHackathon" },
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

const Hackathon = mongoose.model("Hackathon", hackathonSchema);

module.exports = Hackathon;
