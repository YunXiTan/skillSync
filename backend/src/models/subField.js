const mongoose = require("mongoose");

const subFieldSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    field: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Field",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

subFieldSchema.add({ deleted_at: Date });

const SubField = mongoose.model("SubField", subFieldSchema);

module.exports = SubField;
