const BaseController = require("../base.controller");

class StudentController extends BaseController {
  constructor(service) {
    super(service);
    this.getByField = this.getByField.bind(this);
    this.getByRank = this.getByRank.bind(this);
    this.enrollCourse = this.enrollCourse.bind(this);
    this.unenrollCourse = this.unenrollCourse.bind(this);
    this.registerHackathon = this.registerHackathon.bind(this);
    this.unregisterHackathon = this.unregisterHackathon.bind(this);
    this.registerChallenge = this.registerChallenge.bind(this);
    this.unregisterChallenge = this.unregisterChallenge.bind(this);
  }

  getPath() {
    return "students";
  }

  initializeRoutes() {
    super.initializeRoutes();

    // Course routes
    this.router.post("/:id/courses/:courseId/enroll", (req, res) =>
      this.enrollCourse(req, res)
    );
    this.router.delete("/:id/courses/:courseId/unenroll", (req, res) =>
      this.unenrollCourse(req, res)
    );

    // Hackathon routes
    this.router.post("/:id/hackathons/:hackathonId/register", (req, res) =>
      this.registerHackathon(req, res)
    );
    this.router.delete("/:id/hackathons/:hackathonId/unregister", (req, res) =>
      this.unregisterHackathon(req, res)
    );

    // Challenge routes
    this.router.post("/:id/challenges/:challengeId/register", (req, res) =>
      this.registerChallenge(req, res)
    );
    this.router.delete("/:id/challenges/:challengeId/unregister", (req, res) =>
      this.unregisterChallenge(req, res)
    );

    // Existing routes
    this.router.get("/field/:fieldId", (req, res) => this.getByField(req, res));
    this.router.get("/rank/:rankId", (req, res) => this.getByRank(req, res));
  }

  // Course handlers
  async enrollCourse(req, res) {
    try {
      const { id: studentId, courseId } = req.params;
      const data = await this.service.enrollInCourse(studentId, courseId);
      res.json(
        this.responseType.success(data, "Successfully enrolled in course")
      );
    } catch (error) {
      res.status(400).json(this.responseType.error(error.message));
    }
  }

  async unenrollCourse(req, res) {
    try {
      const { id: studentId, courseId } = req.params;
      const data = await this.service.unenrollFromCourse(studentId, courseId);
      res.json(
        this.responseType.success(data, "Successfully unenrolled from course")
      );
    } catch (error) {
      res.status(400).json(this.responseType.error(error.message));
    }
  }

  // Hackathon handlers
  async registerHackathon(req, res) {
    try {
      const { id: studentId, hackathonId } = req.params;
      const data = await this.service.registerForHackathon(
        studentId,
        hackathonId
      );
      res.json(
        this.responseType.success(data, "Successfully registered for hackathon")
      );
    } catch (error) {
      res.status(400).json(this.responseType.error(error.message));
    }
  }

  async unregisterHackathon(req, res) {
    try {
      const { id: studentId, hackathonId } = req.params;
      const data = await this.service.unregisterFromHackathon(
        studentId,
        hackathonId
      );
      res.json(
        this.responseType.success(
          data,
          "Successfully unregistered from hackathon"
        )
      );
    } catch (error) {
      res.status(400).json(this.responseType.error(error.message));
    }
  }

  // Challenge handlers
  async registerChallenge(req, res) {
    try {
      const { id: studentId, challengeId } = req.params;
      const data = await this.service.registerForChallenge(
        studentId,
        challengeId
      );
      res.json(
        this.responseType.success(data, "Successfully registered for challenge")
      );
    } catch (error) {
      res.status(400).json(this.responseType.error(error.message));
    }
  }

  async unregisterChallenge(req, res) {
    try {
      const { id: studentId, challengeId } = req.params;
      const data = await this.service.unregisterFromChallenge(
        studentId,
        challengeId
      );
      res.json(
        this.responseType.success(
          data,
          "Successfully unregistered from challenge"
        )
      );
    } catch (error) {
      res.status(400).json(this.responseType.error(error.message));
    }
  }

  // Existing methods remain unchanged
  async getByField(req, res) {
    try {
      const { fieldId } = req.params;
      const data = await this.service.findByField(fieldId);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async getByRank(req, res) {
    try {
      const { rankId } = req.params;
      const data = await this.service.findByRank(rankId);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }
}

module.exports = StudentController;
