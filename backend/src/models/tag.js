const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    field: { type: mongoose.Schema.Types.ObjectId, ref: "Field" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

tagSchema.add({ deleted_at: Date });

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
