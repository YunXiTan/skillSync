const express = require("express");
const ResponseType = require("../types/responseType");
class BaseController {
  constructor(service) {
    this.service = service;
    this.responseType = ResponseType;
    this.router = express.Router();
    this.path = this.getPath();

    this.initializeRoutes();
  }
  getService() {
    return this.service;
  }
  getPath() {
    // Override in child classes
    return "";
  }

  initializeRoutes() {
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);

    // Now set up routes
    this.router.get("/", this.getAll);
    this.router.get("/:id", this.getById);
    this.router.post("/", this.create);
    this.router.patch("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }

  getRouter() {
    return this.router;
  }

  getAll = async (req, res) => {
    try {
      const { page, limit, sort, ...filter } = req.query;
      const options = { page, limit, sort };

      const { data, total } = await this.service.findAll(filter, options);
      const response = this.responseType.paginate(data, page, limit, total);

      res.json(this.responseType.success(response));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  };

  getById = async (req, res) => {
    try {
      const document = await this.service.findById(req.params.id);
      if (!document) {
        return res
          .status(404)
          .json(this.responseType.error("Document not found", 404));
      }
      res.json(this.responseType.success(document));
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  };

  create = async (req, res) => {
    try {
      const document = await this.service.create(req.body);
      res
        .status(201)
        .json(
          this.responseType.success(document, "Document created successfully")
        );
    } catch (error) {
      res.status(400).json(this.responseType.error(error.message));
    }
  };

  update = async (req, res) => {
    try {
      const document = await this.service.update(req.params.id, req.body);
      if (!document) {
        return res
          .status(404)
          .json(this.responseType.error("Document not found", 404));
      }
      res.json(
        this.responseType.success(document, "Document updated successfully")
      );
    } catch (error) {
      res.status(400).json(this.responseType.error(error.message));
    }
  };

  delete = async (req, res) => {
    try {
      const document = await this.service.softDelete(req.params.id);
      if (!document) {
        return res
          .status(404)
          .json(this.responseType.error("Document not found", 404));
      }
      res.json(
        this.responseType.success(null, "Document deleted successfully")
      );
    } catch (error) {
      res.status(500).json(this.responseType.error(error.message));
    }
  };
}

module.exports = BaseController;
