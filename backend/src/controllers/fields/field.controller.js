const BaseController = require("../base.controller");
const ResponseType = require("../../types/responseType");

class FieldController extends BaseController {
  constructor(service) {
    super(service);
    this.initializeRoutes = this.initializeRoutes.bind(this);

    this.assignStudent = this.assignStudent.bind(this);
    this.getStudentFields = this.getStudentFields.bind(this);
    this.getAllSubFields = this.getAllSubFields.bind(this);
  }

  getPath() {
    return "fields";
  }

  initializeRoutes() {
    super.initializeRoutes();

    this.router.post("/:id/assign/:studentId", (req, res) =>
      this.assignStudent(req, res)
    );
    this.router.get("/student/:studentId", (req, res) =>
      this.getStudentFields(req, res)
    );
    this.router.get("/:id/subfields", (req, res) =>
      this.getAllSubFields(req, res)
    );
  }

  async assignStudent(req, res) {
    try {
      const { id: fieldId, studentId } = req.params;
      const { subFieldIds } = req.body;
      const data = await this.service.assignStudentToField(
        studentId,
        fieldId,
        subFieldIds
      );
      res.json(ResponseType.success(data, "Student assigned successfully"));
    } catch (error) {
      res.status(500).json(ResponseType.error(error.message));
    }
  }

  async getStudentFields(req, res) {
    try {
      const { studentId } = req.params;
      const data = await this.service.getStudentFields(studentId);
      res.json(ResponseType.success(data));
    } catch (error) {
      res.status(500).json(ResponseType.error(error.message));
    }
  }

  async getAllSubFields(req, res) {
    try {
      const { id: fieldId } = req.params;
      const data = await this.service.findAllSubFields(fieldId);
      res.json(ResponseType.success(data));
    } catch (error) {
      res.status(500).json(ResponseType.error(error.message));
    }
  }
}

module.exports = FieldController;
