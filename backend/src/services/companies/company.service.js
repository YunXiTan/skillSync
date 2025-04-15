const BaseService = require("../base.service");
const Challenge = require("../../models/challenge");
const Hackathon = require("../../models/hackathon");
const Course = require("../../models/course");

class CompanyService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findCompanyChallenges(companyId) {
    return await Challenge.find({
      company: companyId,
      deleted_at: null,
    }).populate("tags");
  }

  async findCompanyHackathons(companyId) {
    return await Hackathon.find({
      company: companyId,
      deleted_at: null,
    }).populate("tags");
  }

  async findCompanyCourses(companyId) {
    return await Course.find({
      company: companyId,
      deleted_at: null,
    }).populate("tags");
  }

  async findAll(filter = {}, options = {}) {
    return await super.findAll(filter, {
      ...options,
      populate: [
        { path: "field.main" },
        { path: "field.sub" },
        { path: "tags" }
      ],
    });
  }

  async findById(id) {
    return await super.findById(id, [
      { path: "field.main" },
      { path: "field.sub" },
      { path: "tags" }
    ]);
  }

  async findByEmail(email) {
    return await this.model.findOne({ 
      email: email,
      deleted_at: null 
    });
  }

  async findByName(name) {
    return await this.model.findOne({ 
      name: new RegExp(name, 'i'),
      deleted_at: null 
    });
  }

  async updateCompanyProfile(companyId, updateData) {
    return await this.model.findByIdAndUpdate(
      companyId,
      updateData,
      { new: true, runValidators: true }
    ).populate(['field.main', 'field.sub', 'tags']);
  }

  async deactivateCompany(companyId) {
    return await this.model.findByIdAndUpdate(
      companyId,
      { 
        deleted_at: new Date()
      },
      { new: true }
    );
  }

  async getCompanyStats(companyId) {
    const [challenges, hackathons, courses] = await Promise.all([
      Challenge.countDocuments({ company: companyId, deleted_at: null }),
      Hackathon.countDocuments({ company: companyId, deleted_at: null }),
      Course.countDocuments({ company: companyId, deleted_at: null })
    ]);

    return {
      totalChallenges: challenges,
      totalHackathons: hackathons,
      totalCourses: courses
    };
  }
}

module.exports = CompanyService;