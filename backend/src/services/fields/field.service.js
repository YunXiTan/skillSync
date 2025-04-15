const BaseService = require("../base.service");
const { Student, Tag, SubField, StudentField } = require("../../models");

class FieldService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findStudents(fieldId) {
    return await StudentField.find({
      field: fieldId,
      deleted_at: null,
    }).populate("student");
  }

  async findTags(fieldId) {
    return await Tag.find({
      field: fieldId,
      deleted_at: null,
    });
  }

  async findMainField(fieldId) {
    const subfield = await SubField.findOne({ _id: fieldId }).populate("field");
    return subfield ? subfield.field : null;
  }

  async findSubFields(fieldId) {
    return await SubField.find({
      field: fieldId,
      deleted_at: null,
    });
  }

  async assignStudentToField(studentId, fieldId, subFieldIds = []) {
    const existingAssignment = await StudentField.findOne({
      student: studentId,
      field: fieldId,
      deleted_at: null,
    });

    if (existingAssignment) {
      existingAssignment.subFields = [
        ...new Set([...existingAssignment.subFields, ...subFieldIds]),
      ];
      return await existingAssignment.save();
    }

    return await StudentField.create({
      student: studentId,
      field: fieldId,
      subFields: subFieldIds,
    });
  }

  async getStudentFields(studentId) {
    return await StudentField.find({
      student: studentId,
      deleted_at: null,
    })
      .populate("field")
      .populate("subFields");
  }

  async getFieldHierarchy(fieldId) {
    const field = await this.model.findById(fieldId);
    const subFields = await SubField.find({
      field: fieldId,
      deleted_at: null,
    });

    return {
      ...field.toObject(),
      subFields: subFields,
    };
  }

  async findAllSubFields(fieldId) {
    const subfields = await SubField.find({
      field: fieldId,
      deleted_at: null,
    }).populate("field");

    if (!subfields.length) {
      throw new Error("No subfields found for this field");
    }

    return subfields;
  }
}

module.exports = FieldService;
