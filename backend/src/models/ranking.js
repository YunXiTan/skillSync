const mongoose = require("mongoose");

const rankingSchema = new mongoose.Schema(
  {
    rankName: { type: String, unique: true, required: true },
    description: { type: String },
    promoteRule: { type: String },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Add deleted_at field for soft deletes
rankingSchema.add({ deleted_at: Date });

const Ranking = mongoose.model("Ranking", rankingSchema);

module.exports = Ranking;
