const BaseController = require("../base.controller");

class CompanyController extends BaseController {
  constructor(service) {
    super(service);
    this.getCompanyChallenges = this.getCompanyChallenges.bind(this);
    this.getCompanyHackathons = this.getCompanyHackathons.bind(this);
    this.getCompanyCourses = this.getCompanyCourses.bind(this);
    this.getCompanyByEmail = this.getCompanyByEmail.bind(this);
    this.getCompanyByName = this.getCompanyByName.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.deactivateCompany = this.deactivateCompany.bind(this);
    this.getStats = this.getStats.bind(this);
  }

  getPath() {
    return "companies";
  }

  initializeRoutes() {
    super.initializeRoutes();

    this.router.get("/:id/challenges", (req, res) =>
      this.getCompanyChallenges(req, res)
    );
    this.router.get("/:id/hackathons", (req, res) =>
      this.getCompanyHackathons(req, res)
    );
    this.router.get("/:id/courses", (req, res) =>
      this.getCompanyCourses(req, res)
    );
    this.router.get("/email/:email", (req, res) =>
      this.getCompanyByEmail(req, res)
    );
    this.router.get("/name/:name", (req, res) =>
      this.getCompanyByName(req, res)
    );
    this.router.patch("/:id/profile", (req, res) =>
      this.updateProfile(req, res)
    );
    this.router.patch("/:id/deactivate", (req, res) =>
      this.deactivateCompany(req, res)
    );
    this.router.get("/:id/stats", (req, res) => this.getStats(req, res));
  }

  async getCompanyChallenges(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.findCompanyChallenges(id);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async getCompanyHackathons(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.findCompanyHackathons(id);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async getCompanyCourses(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.findCompanyCourses(id);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async getCompanyByEmail(req, res) {
    try {
      const { email } = req.params;
      const data = await this.service.findByEmail(email);
      if (!data) {
        return res
          .status(404)
          .json(this.responseType.error("Company not found"));
      }
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async getCompanyByName(req, res) {
    try {
      const { name } = req.params;
      const data = await this.service.findByName(name);
      if (!data) {
        return res
          .status(404)
          .json(this.responseType.error("Company not found"));
      }
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async updateProfile(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.updateCompanyProfile(id, req.body);
      if (!data) {
        return res
          .status(404)
          .json(this.responseType.error("Company not found"));
      }
      res.json(this.responseType.success(data, "Profile updated successfully"));
    } catch (error) {
      res.status(400).json(this.responseType.error(error.message));
    }
  }

  async deactivateCompany(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.deactivateCompany(id);
      if (!data) {
        return res
          .status(404)
          .json(this.responseType.error("Company not found"));
      }
      res.json(
        this.responseType.success(null, "Company deactivated successfully")
      );
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async getStats(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.getCompanyStats(id);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }
}

module.exports = CompanyController;
