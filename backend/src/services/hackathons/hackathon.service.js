const BaseService = require("../base.service");
const Student = require("../../models/student");

class HackathonService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findByCompany(companyId) {
    return await this.findAll({ company: companyId });
  }

  async findParticipants(hackathonId) {
    const students = await Student.find({
      studentHackathons: hackathonId,
      deleted_at: null,
    }).select("-password");

    return students;
  }

  async registerStudent(hackathonId, studentId) {
    // Check if maximum participants limit is reached
    const hackathon = await this.findById(hackathonId);
    const currentParticipants = await Student.countDocuments({
      studentHackathons: hackathonId,
      deleted_at: null,
    });

    if (
      hackathon.maxParticipants &&
      currentParticipants >= hackathon.maxParticipants
    ) {
      throw new Error("Maximum participants limit reached");
    }

    return await Student.findByIdAndUpdate(
      studentId,
      {
        $addToSet: { studentHackathons: hackathonId },
        $set: { updated_at: new Date() },
      },
      { new: true }
    ).populate("studentHackathons");
  }

  async unregisterStudent(hackathonId, studentId) {
    return await Student.findByIdAndUpdate(
      studentId,
      {
        $pull: { studentHackathons: hackathonId },
        $set: { updated_at: new Date() },
      },
      { new: true }
    ).populate("studentHackathons");
  }

  async findChallenges(hackathonId) {
    return await Challenge.find({
      hackathon: hackathonId,
      deleted_at: null,
    }).populate(["company", "tags"]);
  }

  async findAll(filter = {}, options = {}) {
    return await super.findAll(filter, {
      ...options,
      populate: ["company", "tags"],
    });
  }

  async findById(id) {
    return await super.findById(id, ["company", "tags"]);
  }
}

module.exports = HackathonService;
