const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

fieldSchema.add({ deleted_at: Date });

const Field = mongoose.model("Field", fieldSchema);

module.exports = Field;
