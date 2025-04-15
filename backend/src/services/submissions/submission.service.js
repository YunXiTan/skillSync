const BaseService = require("../base.service");
const { Submission, StudentChallenge } = require("../../models");

class SubmissionService extends BaseService {
  constructor() {
    super(Submission);
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

  async submitChallenge(challengeId, studentId, uploadedFiles, notes) {
    const existingSubmission = await StudentChallenge.findOne({
      challenge: challengeId,
      student: studentId,
      deleted_at: null,
    });

    if (existingSubmission) {
      throw new Error("Student has already submitted this challenge");
    }

    const studentChallenge = new StudentChallenge({
      student: studentId,
      challenge: challengeId,
    });

    await studentChallenge.save();

    const submission = new Submission({
      studentChallenge: studentChallenge._id,
      submittedFiles: uploadedFiles,
      notes: notes,
      status: "Pending",
    });

    await submission.save();

    studentChallenge.submissions = [submission._id];
    await studentChallenge.save();

    return studentChallenge;
  }
}

module.exports = SubmissionService;