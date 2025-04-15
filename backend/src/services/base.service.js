class BaseService {
  constructor(model) {
    this.model = model;
  }

  async findAll(filter = {}, options = {}) {
    const {
      populate = [],
      sort = { created_at: -1 },
      page = 1,
      limit = 999,
    } = options;

    const skip = (page - 1) * limit;
    const query = { ...filter, deleted_at: null };

    const [data, total] = await Promise.all([
      this.model
        .find(query)
        .populate(populate)
        .sort(sort)
        .skip(skip)
        .limit(limit),
      this.model.countDocuments(query),
    ]);

    return { data, total, page, limit };
  }

  async findById(id, populate = []) {
    return await this.model
      .findOne({ _id: id, deleted_at: null })
      .populate(populate);
  }

  async create(data) {
    const document = new this.model(data);
    return await document.save();
  }

  async update(id, data) {
    return await this.model.findOneAndUpdate(
      { _id: id, deleted_at: null },
      data,
      { new: true }
    );
  }

  async softDelete(id) {
    return await this.model.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { deleted_at: new Date() },
      { new: true }
    );
  }

  async restore(id) {
    return await this.model.findOneAndUpdate(
      { _id: id },
      { deleted_at: null },
      { new: true }
    );
  }
}

module.exports = BaseService;
