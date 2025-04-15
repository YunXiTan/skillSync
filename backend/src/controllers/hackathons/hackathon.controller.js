const BaseController = require("../base.controller");

class HackathonController extends BaseController {
  constructor(service) {
    super(service);
    this.getByCompanyId = this.getByCompanyId.bind(this);
    this.getParticipants = this.getParticipants.bind(this);
    this.registerStudent = this.registerStudent.bind(this);
    this.unregisterStudent = this.unregisterStudent.bind(this);
    this.getChallenges = this.getChallenges.bind(this);
  }

  getPath() {
    return "hackathons";
  }

  initializeRoutes() {
    super.initializeRoutes();

    this.router.get("/company/:companyId", (req, res) =>
      this.getByCompanyId(req, res)
    );
    this.router.get("/:id/participants", (req, res) =>
      this.getParticipants(req, res)
    );
    this.router.post("/:id/register/:studentId", (req, res) =>
      this.registerStudent(req, res)
    );
    this.router.delete("/:id/register/:studentId", (req, res) =>
      this.unregisterStudent(req, res)
    );
    this.router.get("/:id/challenges", (req, res) =>
      this.getChallenges(req, res)
    );
  }

  async getByCompanyId(req, res) {
    try {
      const { companyId } = req.params;
      const data = await this.service.findByCompany(companyId);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async getParticipants(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.findParticipants(id);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async registerStudent(req, res) {
    try {
      const { id, studentId } = req.params;
      const data = await this.service.registerStudent(id, studentId);
      res.json(
        this.responseType.success(data, "Student registered successfully")
      );
    } catch (error) {
      res.status(400).json(this.responseType.error(error.message));
    }
  }

  async unregisterStudent(req, res) {
    try {
      const { id, studentId } = req.params;
      const data = await this.service.unregisterStudent(id, studentId);
      res.json(
        this.responseType.success(data, "Student unregistered successfully")
      );
    } catch (error) {
      res.status(400).json(this.responseType.error(error.message));
    }
  }

  async getChallenges(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.findChallenges(id);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }
}

module.exports = HackathonController;
