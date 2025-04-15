const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    studentChallenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentChallenge",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    submittedFiles: [
      {
        filename: String,
        originalName: String,
        path: String,
        size: Number,
        mimetype: String,
      },
    ],
    notes: String,
    feedback: String,
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewedAt: { type: Date },
    submittedAt: { type: Date, default: Date.now },
    deleted_at: Date,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
