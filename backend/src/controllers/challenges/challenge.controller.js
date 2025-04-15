const BaseController = require("../base.controller");
const createUploader = require("../../middleware/fileUpload");
const fs = require("fs").promises;

class ChallengeController extends BaseController {
  constructor(service) {
    super(service);
    this.getByCompanyId = this.getByCompanyId.bind(this);
    this.getByHackathonId = this.getByHackathonId.bind(this);
    this.getStudentSubmissions = this.getStudentSubmissions.bind(this);
    this.submitChallenge = this.submitChallenge.bind(this);
    this.updateSubmissionStatus = this.updateSubmissionStatus.bind(this);
    this.create = this.create.bind(this);
  }

  getPath() {
    return "challenges";
  }

  initializeRoutes() {
    super.initializeRoutes();

    // File upload routes
    this.router.post(
      "/",
      createUploader("uploads/challenges/files").array("files", 5),
      (req, res) => this.create(req, res)
    );

    // Challenge submission route
    this.router.post(
      "/:id/submit",
      createUploader("uploads/challenges/submissions").array("files", 5),
      (req, res) => this.submitChallenge(req, res)
    );

    // Other routes
    this.router.get("/company/:companyId", (req, res) =>
      this.getByCompanyId(req, res)
    );
    this.router.get("/hackathon/:hackathonId", (req, res) =>
      this.getByHackathonId(req, res)
    );
    this.router.get("/:id/submissions", (req, res) =>
      this.getStudentSubmissions(req, res)
    );
    this.router.patch("/submission/:submissionId/status", (req, res) =>
      this.updateSubmissionStatus(req, res)
    );
  }

  async create(req, res) {
    try {
      console.log("Raw request body:", req.body);
      console.log("Files received:", req.files);

      const challengeData = JSON.parse(req.body.data);
      console.log("Parsed challenge data:", challengeData);

      if (!challengeData.field?.main) {
        throw new Error("Main field is required");
      }

      // Ensure challengeFiles is always an array
      const challengeFiles = req.files
        ? Array.from(req.files).map((file) => ({
            filename: file.filename,
            originalName: file.originalname,
            path: file.path,
            size: file.size,
            mimetype: file.mimetype,
          }))
        : [];

      // Create challenge with files
      const data = await this.service.create({
        ...challengeData,
        challengeFiles,
      });

      res
        .status(201)
        .json(
          this.responseType.success(data, "Challenge created successfully")
        );
    } catch (error) {
      console.error("Error in challenge creation:", error);
      // Clean up uploaded files if there's an error
      if (req.files) {
        await Promise.all(
          Array.from(req.files).map((file) =>
            fs.unlink(file.path).catch(() => {})
          )
        );
      }
      res.status(400).json(this.responseType.error(error.message));
    }
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

  async getByHackathonId(req, res) {
    try {
      const { hackathonId } = req.params;
      const data = await this.service.findByHackathon(hackathonId);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async getStudentSubmissions(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.findStudentSubmissions(id);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async submitChallenge(req, res) {
    try {
      const { id } = req.params;
      const { studentId, notes } = req.body;

      const submittedFiles =
        req.files?.map((file) => ({
          filename: file.filename,
          originalName: file.originalname,
          path: file.path,
          size: file.size,
          mimetype: file.mimetype,
        })) || [];

      const data = await this.service.submitChallenge(
        id,
        studentId,
        submittedFiles,
        notes
      );

      res
        .status(201)
        .json(
          this.responseType.success(data, "Challenge submitted successfully")
        );
    } catch (error) {
      if (req.files) {
        await Promise.all(
          req.files.map((file) => fs.unlink(file.path).catch(() => {}))
        );
      }
      res.status(400).json(this.responseType.error(error.message));
    }
  }

  async updateSubmissionStatus(req, res) {
    try {
      const { submissionId } = req.params;
      const { feedback } = req.body;
      const reviewerId = req.user?.id;

      const data = await this.service.updateSubmissionStatus(
        submissionId,
        reviewerId,
        feedback
      );

      res.json(
        this.responseType.success(
          data,
          "Submission status updated successfully"
        )
      );
    } catch (error) {
      res.status(400).json(this.responseType.error(error.message));
    }
  }
}

module.exports = ChallengeController;
