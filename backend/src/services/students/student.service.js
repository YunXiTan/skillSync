const BaseService = require("../base.service");

class StudentService extends BaseService {
  constructor(model) {
    super(model);
  }

  // Course-related methods
  async enrollInCourse(studentId, courseId) {
    return await this.model
      .findByIdAndUpdate(
        studentId,
        {
          $addToSet: { studentCourses: courseId },
          $set: { updated_at: new Date() },
        },
        { new: true }
      )
      .populate("studentCourses");
  }

  async unenrollFromCourse(studentId, courseId) {
    return await this.model
      .findByIdAndUpdate(
        studentId,
        {
          $pull: { studentCourses: courseId },
          $set: { updated_at: new Date() },
        },
        { new: true }
      )
      .populate("studentCourses");
  }

  // Hackathon-related methods
  async registerForHackathon(studentId, hackathonId) {
    return await this.model
      .findByIdAndUpdate(
        studentId,
        {
          $addToSet: { studentHackathons: hackathonId },
          $set: { updated_at: new Date() },
        },
        { new: true }
      )
      .populate("studentHackathons");
  }

  async unregisterFromHackathon(studentId, hackathonId) {
    return await this.model
      .findByIdAndUpdate(
        studentId,
        {
          $pull: { studentHackathons: hackathonId },
          $set: { updated_at: new Date() },
        },
        { new: true }
      )
      .populate("studentHackathons");
  }

  // Challenge-related methods
  async registerForChallenge(studentId, challengeId) {
    return await this.model
      .findByIdAndUpdate(
        studentId,
        {
          $addToSet: { studentChallenges: challengeId },
          $set: { updated_at: new Date() },
        },
        { new: true }
      )
      .populate("studentChallenges");
  }

  async unregisterFromChallenge(studentId, challengeId) {
    return await this.model
      .findByIdAndUpdate(
        studentId,
        {
          $pull: { studentChallenges: challengeId },
          $set: { updated_at: new Date() },
        },
        { new: true }
      )
      .populate("studentChallenges");
  }

  // Override base methods to include new relations
  async findAll(filter = {}, options = {}) {
    return await super.findAll(filter, {
      ...options,
      populate: [
        "field.main",
        "field.sub",
        "ranking",
        "tags",
        "studentCourses",
        "studentHackathons",
        "studentChallenges",
      ],
    });
  }

  async findById(id) {
    return await super.findById(id, [
      "field.main",
      "field.sub",
      "ranking",
      "tags",
      "studentCourses",
      "studentHackathons",
      "studentChallenges",
    ]);
  }
}

module.exports = StudentService;
