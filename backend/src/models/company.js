const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, unique: true, required: true },
    companyName: { type: String, required: true },
    password: { type: String, required: true },
    field: {
      main: { type: mongoose.Schema.Types.ObjectId, ref: "Field" },
      sub: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubField" }],
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    deleted_at: Date,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
