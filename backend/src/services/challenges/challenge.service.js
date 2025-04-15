const BaseService = require("../base.service");
const Student = require("../../models/student");
const Submission = require("../../models/submission");

class ChallengeService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findByCompany(companyId) {
    return await this.findAll(
      { company: companyId, deleted_at: null },
      {
        populate: [
          { path: "field.main" },
          { path: "field.sub" },
          { path: "tags" },
          { path: "company" },
        ],
      }
    );
  }

  async findByHackathon(hackathonId) {
    return await this.findAll(
      { hackathon: hackathonId, deleted_at: null },
      {
        populate: [
          { path: "field.main" },
          { path: "field.sub" },
          { path: "tags" },
          { path: "company" },
        ],
      }
    );
  }

  async findStudentSubmissions(challengeId) {
    const students = await Student.find({
      studentChallenges: challengeId,
      deleted_at: null,
    })
      .select("-password")
      .populate({
        path: "submissions",
        match: { challenge: challengeId, deleted_at: null },
        populate: {
          path: "reviewer",
          select: "name email",
        },
      });

    return students;
  }

  async submitChallenge(challengeId, studentId, uploadedFiles, notes) {
    const student = await Student.findById(studentId);

    if (student.studentChallenges.includes(challengeId)) {
      throw new Error("Student has already registered for this challenge");
    }

    // Create submission
    const submission = new Submission({
      student: studentId,
      challenge: challengeId,
      submittedFiles: uploadedFiles,
      notes: notes,
      status: "Pending",
    });

    await submission.save();

    // Update student record
    await Student.findByIdAndUpdate(studentId, {
      $addToSet: {
        studentChallenges: challengeId,
        submissions: submission._id,
      },
      $set: { updated_at: new Date() },
    });

    return submission;
  }

  async updateSubmissionStatus(submissionId, reviewerId, feedback) {
    const submission = await Submission.findOneAndUpdate(
      { _id: submissionId, deleted_at: null },
      {
        feedback,
        reviewer: reviewerId,
        reviewedAt: new Date(),
      },
      { new: true }
    ).populate([
      {
        path: "reviewer",
        select: "name email",
      },
    ]);

    if (!submission) {
      throw new Error("Submission not found");
    }

    return submission;
  }

  async findAll(filter = {}, options = {}) {
    return await super.findAll(
      { ...filter, deleted_at: null },
      {
        populate: [
          { path: "field.main" },
          { path: "field.sub" },
          { path: "tags" },
          { path: "company" },
          { path: "hackathon" },
        ],
        ...options,
      }
    );
  }

  async findById(id) {
    return await super.findById(id, [
      { path: "field.main" },
      { path: "field.sub" },
      { path: "tags" },
      { path: "company" },
      { path: "hackathon" },
    ]);
  }

  async create(data) {
    try {
      // Validate files if present
      if (data.challengeFiles) {
        const totalSize = data.challengeFiles.reduce(
          (sum, file) => sum + file.size,
          0
        );
        if (totalSize > 25 * 1024 * 1024) {
          // 25MB total limit
          throw new Error("Total file size exceeds 25MB limit");
        }
      }

      return await super.create(data);
    } catch (error) {
      // Clean up files if challenge creation fails
      if (data.challengeFiles) {
        await Promise.all(
          data.challengeFiles.map((file) =>
            fs.unlink(file.path).catch(() => {})
          )
        );
      }
      throw error;
    }
  }

  async delete(id) {
    const challenge = await this.findById(id);
    if (challenge?.challengeFiles?.length) {
      await Promise.all(
        challenge.challengeFiles.map((file) =>
          fs.unlink(file.path).catch(() => {})
        )
      );
    }
    return await super.delete(id);
  }

  async getAllSubmissions() {
    return await Submission.find({ deleted_at: null })
      .populate([
        {
          path: "studentChallenge",
          populate: [
            {
              path: "student",
              select: "-password",
            },
            {
              path: "challenge",
              select: "title description",
            },
          ],
        },
        {
          path: "reviewer",
          select: "name email",
        },
      ])
      .sort({ created_at: -1 });
  }

  async getSubmissionById(submissionId) {
    const submission = await Submission.findOne({
      _id: submissionId,
      deleted_at: null,
    }).populate([
      {
        path: "studentChallenge",
        populate: [
          {
            path: "student",
            select: "-password",
          },
          {
            path: "challenge",
            select: "title description evaluationCriteria",
          },
        ],
      },
      {
        path: "reviewer",
        select: "name email",
      },
    ]);

    if (!submission) {
      throw new Error("Submission not found");
    }

    return submission;
  }
}

module.exports = ChallengeService;
