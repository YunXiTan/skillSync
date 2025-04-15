const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    field: {
      main: { type: mongoose.Schema.Types.ObjectId, ref: "Field" },
      sub: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubField" }],
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    studentCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "StudentCourse" }],
    deleted_at: Date,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
