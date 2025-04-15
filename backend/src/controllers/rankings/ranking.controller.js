const BaseController = require("../base.controller");

class RankingController extends BaseController {
  constructor(service) {
    super(service);
  }

  getPath() {
    return "rankings";
  }

  initializeRoutes() {
    super.initializeRoutes();
  }
}

module.exports = RankingController;