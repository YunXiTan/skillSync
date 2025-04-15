const BaseService = require("../base.service");
const {
  StudentTag,
  CompanyTag,
  HackathonTag,
  ChallengeTag,
} = require("../../models");

class TagService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findByField(fieldId) {
    return await this.findAll({ field: fieldId });
  }

  async findByStudent(studentId) {
    const studentTags = await StudentTag.find({
      student: studentId,
      deleted_at: null,
    }).populate("tag");
    return studentTags.map((st) => st.tag);
  }

  async findByCompany(companyId) {
    const companyTags = await CompanyTag.find({
      company: companyId,
      deleted_at: null,
    }).populate("tag");
    return companyTags.map((ct) => ct.tag);
  }

  async findByHackathon(hackathonId) {
    const hackathonTags = await HackathonTag.find({
      hackathon: hackathonId,
      deleted_at: null,
    }).populate("tag");
    return hackathonTags.map((ht) => ht.tag);
  }

  async findByChallenge(challengeId) {
    const challengeTags = await ChallengeTag.find({
      challenge: challengeId,
      deleted_at: null,
    }).populate("tag");
    return challengeTags.map((ct) => ct.tag);
  }
}

module.exports = TagService;
