const BaseService = require("../base.service");

class RankingService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findAll(filter = {}, options = {}) {
    return await super.findAll(filter, {
      ...options,
      sort: { rankName: 1 }
    });
  }
}

module.exports = RankingService;