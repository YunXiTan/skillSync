class ResponseType {
  static success(data) {
    return {
      success: true,
      data,
    };
  }

  static error(message, code = 500, errors = null) {
    return {
      success: false,
      message,
      code,
      errors,
    };
  }

  static paginate(data, page, limit, total) {
    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

module.exports = ResponseType;
