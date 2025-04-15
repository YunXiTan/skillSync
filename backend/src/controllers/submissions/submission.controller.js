const BaseController = require("../base.controller");
const createUploader = require("../../middleware/fileUpload");

class SubmissionController extends BaseController {
  constructor(service) {
    super(service);
    this.getAllSubmissions = this.getAllSubmissions.bind(this);
    this.getSubmissionById = this.getSubmissionById.bind(this);
    this.updateSubmissionStatus = this.updateSubmissionStatus.bind(this);
    this.submitChallenge = this.submitChallenge.bind(this);
  }

  getPath() {
    return "submissions";
  }

  initializeRoutes() {
    super.initializeRoutes();

    // Submission routes
    this.router.get("/all", (req, res) => this.getAllSubmissions(req, res));
    this.router.get("/:submissionId", (req, res) =>
      this.getSubmissionById(req, res)
    );
    this.router.patch("/:submissionId/status", (req, res) =>
      this.updateSubmissionStatus(req, res)
    );
    this.router.post(
      "/challenge/:challengeId",
      createUploader("uploads/challenges/submissions").array("files", 5),
      (req, res) => this.submitChallenge(req, res)
    );
  }

  async getAllSubmissions(req, res) {
    try {
      const data = await this.service.getAllSubmissions();
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  }

  async getSubmissionById(req, res) {
    try {
      const { submissionId } = req.params;
      const data = await this.service.getSubmissionById(submissionId);
      res.json(this.responseType.success(data));
    } catch (error) {
      res.status(404).json(this.responseType.error(error.message));
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

  async submitChallenge(req, res) {
    try {
      const { challengeId } = req.params;
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
        challengeId,
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
}

module.exports = SubmissionController;
